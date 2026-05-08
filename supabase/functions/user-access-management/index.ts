import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!supabaseUrl || !serviceRoleKey || !token) throw new Error("User access function is missing required configuration.");

    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const { data: callerData, error: callerError } = await admin.auth.getUser(token);
    if (callerError || !callerData.user) throw new Error("Login required.");

    const { data: callerRole, error: roleError } = await admin
      .from("user_roles")
      .select("role, client_id, promoter_id")
      .eq("user_id", callerData.user.id)
      .maybeSingle();
    if (roleError) throw roleError;

    const body = await request.json();
    const action = String(body.action || "list");
    if (action === "delete") {
      return await deleteUserAccount(admin, callerData.user.id, callerRole, String(body.userId || ""));
    }
    if (action === "update") {
      return await updateUserAccess(admin, callerData.user.id, callerRole, body);
    }
    return await listUserAccounts(admin, callerRole);
  } catch (error) {
    return new Response(JSON.stringify({ error: errorMessage(error, "User access request failed.") }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

async function listUserAccounts(admin: any, callerRole: any) {
  if (!["ADMIN", "CLIENT", "PROMOTER", "PROMOTER_PRODUCTION_OFFICE"].includes(callerRole?.role)) {
    throw new Error("This role cannot view user accounts.");
  }

  let query = admin
    .from("user_roles")
    .select("user_id,role,client_id,worker_id,promoter_id,updated_at");
  if (callerRole.role === "CLIENT") query = query.eq("client_id", callerRole.client_id);
  if (["PROMOTER", "PROMOTER_PRODUCTION_OFFICE"].includes(callerRole.role)) {
    query = query.eq("client_id", callerRole.client_id).in("role", ["PROMOTER", "PROMOTER_PRODUCTION_OFFICE"]);
  }

  const { data: roles, error: rolesError } = await query.order("updated_at", { ascending: false });
  if (rolesError) throw rolesError;

  const { data: clients, error: clientsError } = await admin.from("clients").select("id,name");
  if (clientsError) throw clientsError;
  const clientNames = new Map((clients || []).map((client: any) => [client.id, client.name]));

  const { data: clientReps, error: repsError } = await admin
    .from("client_reps")
    .select("id,client_id,auth_user_id,email,name,access_levels");
  if (repsError) throw repsError;
  const repsByUserId = new Map((clientReps || []).filter((rep: any) => rep.auth_user_id).map((rep: any) => [rep.auth_user_id, rep]));

  const { data: authUsers, error: usersError } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (usersError) throw usersError;
  const authById = new Map((authUsers.users || []).map((user: any) => [user.id, user]));

  const users = (roles || []).map((role: any) => {
    const authUser = authById.get(role.user_id) as any;
    const clientRep = repsByUserId.get(role.user_id) as any;
    return {
      userId: role.user_id,
      email: authUser?.email || "",
      role: role.role,
      clientId: role.client_id || "",
      clientName: clientNames.get(role.client_id) || "",
      workerId: role.worker_id || "",
      promoterId: role.promoter_id || "",
      profileId: clientRep?.id || "",
      profileName: clientRep?.name || "",
      accessLevels: clientRep?.access_levels || [],
      createdAt: authUser?.created_at || "",
      lastSignInAt: authUser?.last_sign_in_at || ""
    };
  });

  return new Response(JSON.stringify({ users }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

async function updateUserAccess(admin: any, callerUserId: string, callerRole: any, body: any) {
  if (callerRole?.role !== "ADMIN") throw new Error("Only ADMIN can manage login access.");
  const userId = String(body.userId || "");
  if (!userId) throw new Error("User ID is required.");
  if (userId === callerUserId) throw new Error("ADMIN cannot change their own login access here.");

  const allowedRoles = new Set(["CLIENT", "PROMOTER", "PRODUCTION", "CREW"]);
  const role = String(body.role || "").trim().toUpperCase();
  if (!allowedRoles.has(role)) throw new Error("Choose a valid Supabase security level.");

  let accessLevels = Array.isArray(body.accessLevels)
    ? body.accessLevels.map((level: unknown) => String(level || "").trim()).filter(Boolean)
    : [];
  if (role === "CLIENT") accessLevels = ensureClientRepAccessLevels(accessLevels);

  const payload = {
    user_id: userId,
    role,
    client_id: body.clientId || null,
    worker_id: role === "CREW" ? body.workerId || null : null,
    promoter_id: role === "PROMOTER" ? body.promoterId || null : null,
    updated_at: new Date().toISOString()
  };
  const roleUpdate = await admin.from("user_roles").upsert(payload, { onConflict: "user_id" });
  if (roleUpdate.error) throw roleUpdate.error;

  if (role === "CLIENT") {
    let repQuery = admin
      .from("client_reps")
      .update({ access_levels: accessLevels, auth_user_id: userId, updated_at: new Date().toISOString() });
    repQuery = body.profileId ? repQuery.eq("id", body.profileId) : repQuery.eq("auth_user_id", userId);
    const repUpdate = await repQuery;
    if (repUpdate.error) throw repUpdate.error;
  }

  return new Response(JSON.stringify({ status: "updated", role, accessLevels }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}

function baseRoleForSiteAccess(level: string) {
  const value = String(level || "").trim().toUpperCase();
  if (value.startsWith("CLIENT")) return "CLIENT";
  if (value.startsWith("PROMOTER")) return "PROMOTER";
  if (value.startsWith("PRODUCTION")) return "PRODUCTION";
  if (value === "CREW" || value === "RUNNER" || value === "CREW/RUNNER") return "CREW";
  return value;
}

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function ensureClientRepAccessLevels(levels: string[]) {
  const clean = Array.from(new Set((levels || []).map((level) => String(level || "").trim()).filter(Boolean)));
  return clean.some((level) => baseRoleForSiteAccess(level) === "CLIENT") ? clean : ["CLIENT_REP", ...clean];
}

async function deleteUserAccount(admin: any, callerUserId: string, callerRole: any, userId: string) {
  if (callerRole?.role !== "ADMIN") throw new Error("Only ADMIN can delete login accounts.");
  if (!userId) throw new Error("User ID is required.");
  if (userId === callerUserId) throw new Error("ADMIN cannot delete their own login here.");

  const { data: targetRole, error: targetError } = await admin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .maybeSingle();
  if (targetError) throw targetError;
  if (targetRole?.role === "ADMIN") throw new Error("ADMIN accounts cannot be deleted here.");

  const roleDelete = await admin.from("user_roles").delete().eq("user_id", userId);
  if (roleDelete.error) throw roleDelete.error;
  const authDelete = await admin.auth.admin.deleteUser(userId);
  if (authDelete.error) throw authDelete.error;

  return new Response(JSON.stringify({ status: "deleted" }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
}
