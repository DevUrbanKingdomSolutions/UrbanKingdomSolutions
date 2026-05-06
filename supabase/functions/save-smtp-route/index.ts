import { createClient } from "npm:@supabase/supabase-js@2";

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
    const encryptionKey = Deno.env.get("SMTP_ENCRYPTION_KEY") || "";
    const authHeader = request.headers.get("Authorization") || "";
    const token = authHeader.replace("Bearer ", "");
    if (!supabaseUrl || !serviceRoleKey || !token || !encryptionKey) {
      throw new Error("SMTP route function is missing required configuration.");
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
    const scope = String(body.scope || "");
    const profileId = String(body.profileId || callerData.user.id).trim();
    const clientId = body.clientId || callerRole?.client_id || null;
    const password = String(body.password || "").trim();
    const routeId = String(body.routeId || routeIdFor(scope, callerData.user.id, clientId, profileId)).trim();

    if (scope === "admin" && callerRole?.role !== "ADMIN") {
      throw new Error("Only ADMIN can save admin SMTP settings.");
    }
    if (scope === "client_rep") {
      if (callerRole?.role !== "CLIENT") throw new Error("Only CLIENT can save client SMTP settings.");
      if (!clientId || clientId !== callerRole.client_id) throw new Error("Client SMTP settings must stay inside your client account.");
    }
    if (!["admin", "client_rep"].includes(scope)) throw new Error("Unsupported SMTP route scope.");

    const encryptedPassword = password ? await encryptText(password, encryptionKey) : undefined;
    const record = {
      id: routeId,
      scope,
      owner_user_id: callerData.user.id,
      client_id: clientId,
      profile_id: profileId,
      provider: String(body.provider || ""),
      from_name: String(body.fromName || ""),
      from_email: String(body.fromEmail || ""),
      reply_to: String(body.replyTo || ""),
      host: String(body.host || ""),
      port: String(body.port || ""),
      username: String(body.username || ""),
      secure_mode: String(body.secure || ""),
      updated_at: new Date().toISOString()
    };

    if (encryptedPassword) {
      Object.assign(record, { encrypted_password: encryptedPassword });
    }

    const { error: upsertError } = await admin
      .from("smtp_routes")
      .upsert(record, { onConflict: "id" });
    if (upsertError) throw upsertError;

    return new Response(JSON.stringify({ routeId, status: "saved" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "SMTP route save failed." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

function routeIdFor(scope: string, userId: string, clientId: string | null, profileId: string) {
  if (scope === "admin") return `admin:${userId}`;
  return `client_rep:${clientId || "none"}:${profileId || userId}`;
}

async function encryptionCryptoKey(secret: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  return crypto.subtle.importKey("raw", digest, "AES-GCM", false, ["encrypt"]);
}

async function encryptText(value: string, secret: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await encryptionCryptoKey(secret);
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(value));
  return `${base64Encode(iv)}:${base64Encode(new Uint8Array(encrypted))}`;
}

function base64Encode(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}
