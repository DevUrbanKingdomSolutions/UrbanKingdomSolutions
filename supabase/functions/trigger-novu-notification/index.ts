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
    const novuSecret = Deno.env.get("NOVU_SECRET_KEY") || "";
    const token = (request.headers.get("Authorization") || "").replace("Bearer ", "");
    if (!supabaseUrl || !serviceRoleKey || !token) throw new Error("Novu function is missing Supabase configuration.");
    if (!novuSecret) throw new Error("NOVU_SECRET_KEY is not configured.");

    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const { data: callerData, error: callerError } = await admin.auth.getUser(token);
    if (callerError || !callerData.user) throw new Error("Login required.");

    const { data: callerRole, error: roleError } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", callerData.user.id)
      .maybeSingle();
    if (roleError) throw roleError;
    if (!["ADMIN", "ACCOUNT", "ACCOUNTING", "CLIENT", "PROMOTER", "PROMOTER_PRODUCTION_OFFICE", "CREW", "PRODUCTION"].includes(callerRole?.role)) {
      throw new Error("This login cannot trigger notifications.");
    }

    const body = await request.json();
    const workflowId = String(body.workflowId || body.name || "").trim();
    const to = body.to || {};
    if (!workflowId) throw new Error("Novu workflow ID is required.");
    if (!to?.subscriberId && !to?.email) throw new Error("Novu subscriber is required.");

    const response = await fetch("https://api.novu.co/v1/events/trigger", {
      method: "POST",
      headers: {
        "Authorization": novuSecret.startsWith("ApiKey ") ? novuSecret : `ApiKey ${novuSecret}`,
        "Content-Type": "application/json",
        ...(body.transactionId ? { "idempotency-key": String(body.transactionId) } : {})
      },
      body: JSON.stringify({
        name: workflowId,
        to,
        payload: body.payload || {},
        transactionId: body.transactionId || undefined
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data?.message || data?.error || "Novu trigger failed.");

    return new Response(JSON.stringify({ status: "queued", novu: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: errorMessage(error, "Novu notification failed.") }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}
