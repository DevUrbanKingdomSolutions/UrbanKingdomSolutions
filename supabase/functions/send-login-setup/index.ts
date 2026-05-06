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
    if (callerRole?.role !== "CLIENT") {
      throw new Error("Only CLIENT users can send login setup.");
    }

    const body = await request.json();
    const email = String(body.email || "").trim().toLowerCase();
    const role = String(body.role || "");
    if (!email) throw new Error("Email is required.");
    if (!["PROMOTER_PRODUCTION_OFFICE", "CREW"].includes(role)) {
      throw new Error("Only crew and production office roles can be invited here.");
    }

    const { data: inviteData, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email);
    if (inviteError) throw inviteError;

    const userId = inviteData.user?.id;
    if (!userId) throw new Error("Supabase did not return a user ID.");

    const { error: upsertError } = await admin.from("user_roles").upsert({
      user_id: userId,
      role,
      client_id: body.clientId || callerRole.client_id,
      worker_id: body.workerId || null,
      promoter_id: body.promoterId || null,
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
