import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");

    if (!supabaseUrl || !serviceRoleKey || !token) {
      throw new Error("Supabase function is missing required configuration.");
    }

    const admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false }
    });

    const { data: callerData, error: callerError } = await admin.auth.getUser(token);
    if (callerError || !callerData.user) throw new Error("Login required.");

    const { data: callerRole, error: roleError } = await admin
      .from("user_roles")
      .select("role, client_id")
      .eq("user_id", callerData.user.id)
      .maybeSingle();
    if (roleError) throw roleError;

    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const role = String(body.role || "");
    const profileType = String(body.profileType || "");
    if (!email) throw new Error("Email is required.");
    if (profileType === "client") {
      if (callerRole?.role !== "ADMIN") throw new Error("Only ADMIN users can send client login setup.");
      if (role !== "CLIENT") throw new Error("Client setup must use the CLIENT role.");
    } else {
      if (callerRole?.role !== "CLIENT") throw new Error("Only CLIENT users can send crew and production office login setup.");
      if (!["PROMOTER_PRODUCTION_OFFICE", "CREW"].includes(role)) {
        throw new Error("Only crew and production office roles can be invited here.");
      }
    }
    const targetClientId = profileType === "client" ? body.clientId : callerRole.client_id;
    if (!targetClientId) throw new Error("Client account connection is required.");

    const requestOrigin = request.headers.get("Origin") || "";
    const configuredSiteUrl = Deno.env.get("PUBLIC_SITE_URL") || Deno.env.get("SITE_URL") || "";
    const redirectTo = configuredSiteUrl || (requestOrigin.startsWith("https://") ? requestOrigin : "");
    const { data: inviteData, error: inviteError } = await admin.auth.admin.inviteUserByEmail(
      email,
      redirectTo ? { redirectTo } : undefined
    );
    if (inviteError) throw inviteError;

    const userId = inviteData.user?.id;
    if (!userId) throw new Error("Supabase did not return a user ID.");

    const { error: upsertError } = await admin.from("user_roles").upsert({
      user_id: userId,
      role,
      client_id: targetClientId,
      worker_id: profileType === "worker" ? body.workerId || null : null,
      promoter_id: profileType === "promoter" ? body.promoterId || null : null,
      updated_at: new Date().toISOString()
    });
    if (upsertError) throw upsertError;

    return new Response(JSON.stringify({ userId, status: "sent" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Login setup failed." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
