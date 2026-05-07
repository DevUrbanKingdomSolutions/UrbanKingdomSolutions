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
    return await listUserAccounts(admin, callerRole);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "User access request failed." }), {
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

  const { data: authUsers, error: usersError } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  if (usersError) throw usersError;
  const authById = new Map((authUsers.users || []).map((user: any) => [user.id, user]));

  const users = (roles || []).map((role: any) => {
    const authUser = authById.get(role.user_id);
    return {
      userId: role.user_id,
      email: authUser?.email || "",
      role: role.role,
      clientId: role.client_id || "",
      clientName: clientNames.get(role.client_id) || "",
      workerId: role.worker_id || "",
      promoterId: role.promoter_id || "",
      createdAt: authUser?.created_at || "",
      lastSignInAt: authUser?.last_sign_in_at || ""
    };
  });

  return new Response(JSON.stringify({ users }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });
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
