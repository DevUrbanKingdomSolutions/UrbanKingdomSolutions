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
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Public event access is missing required configuration.");

    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const body = await request.json();
    const action = String(body.action || "get");
    const token = String(body.token || "");
    if (!token) throw new Error("Event access token is required.");

    const link = await activeLinkForToken(admin, token);
    let snapshot = link.snapshot || {};

    if (action === "runnerStatus") {
      const workerId = String(body.workerId || "");
      const status = String(body.status || "");
      if (!["Available", "On a Run", "At Production Office"].includes(status)) throw new Error("Unsupported runner status.");
      snapshot = {
        ...snapshot,
        crew: (snapshot.crew || []).map((worker: any) => worker.id === workerId ? { ...worker, runnerStatus: status } : worker)
      };
      const { error: updateError } = await admin
        .from("event_access_links")
        .update({ snapshot, updated_at: new Date().toISOString(), last_opened_at: new Date().toISOString() })
        .eq("id", link.id);
      if (updateError) throw updateError;
    } else {
      await admin.from("event_access_links").update({ last_opened_at: new Date().toISOString() }).eq("id", link.id);
    }

    return new Response(JSON.stringify(snapshot), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Public event access failed." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

async function activeLinkForToken(admin: any, token: string) {
  const tokenHash = await sha256(token);
  const { data, error } = await admin
    .from("event_access_links")
    .select("id,snapshot,status,expires_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("This event link is not valid.");
  if (data.status !== "Active") throw new Error("This event link is no longer active.");
  if (data.expires_at && new Date(data.expires_at) < new Date()) throw new Error("This event link has expired.");
  return data;
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
