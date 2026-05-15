import { createClient } from "npm:@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer@6.9.16";

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
    if (!supabaseUrl || !serviceRoleKey || !token) throw new Error("Event access function is missing required configuration.");

    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const { data: callerData, error: callerError } = await admin.auth.getUser(token);
    if (callerError || !callerData.user) throw new Error("Login required.");

    const { data: callerRole, error: roleError } = await admin
      .from("user_roles")
      .select("role, client_id, promoter_id")
      .eq("user_id", callerData.user.id)
      .maybeSingle();
    if (roleError) throw roleError;
    if (!["ACCOUNT", "CLIENT", "PROMOTER_PRODUCTION_OFFICE"].includes(callerRole?.role)) {
      throw new Error("Only Account, Client, or Production Office can create event access links.");
    }
    if (!callerRole) throw new Error("Login role is required.");

    const body = await request.json();
    const eventId = String(body.eventId || "").trim();
    const promoterId = String(body.promoterId || "").trim();
    const clientId = body.clientId || callerRole.client_id || null;
    if (!eventId || !clientId) throw new Error("Event and client connection are required.");
    if (callerRole.role === "PROMOTER_PRODUCTION_OFFICE" && promoterId !== callerRole.promoter_id) {
      throw new Error("Production Office can only create links for their own events.");
    }

    const accessToken = crypto.randomUUID() + crypto.randomUUID();
    const tokenHash = await sha256(accessToken);
    const expiresAt = body.expiresAt ? new Date(`${body.expiresAt}T23:59:59Z`).toISOString() : null;
    const snapshot = body.snapshot || {};
    const recipientEmail = String(body.recipientEmail || "").trim().toLowerCase();
    const recipientName = String(body.recipientName || "Production team").trim();

    const { data: inserted, error: insertError } = await admin
      .from("event_access_links")
      .insert({
        token_hash: tokenHash,
        client_id: clientId,
        event_id: eventId,
        promoter_id: promoterId || null,
        created_by: callerData.user.id,
        recipient_email: recipientEmail || null,
        recipient_name: recipientName,
        notes: String(body.notes || ""),
        snapshot,
        expires_at: expiresAt,
        status: "Active",
        updated_at: new Date().toISOString()
      })
      .select("id")
      .single();
    if (insertError) throw insertError;

    if (recipientEmail) {
      const requestOrigin = request.headers.get("Origin") || "";
      const configuredSiteUrl = Deno.env.get("PUBLIC_SITE_URL") || Deno.env.get("SITE_URL") || "";
      const siteUrl = configuredSiteUrl || (requestOrigin.startsWith("https://") ? requestOrigin : "");
      const publicUrl = `${siteUrl || requestOrigin}/#public-event?token=${encodeURIComponent(accessToken)}`;
      await sendEventAccessEmail(admin, body.emailRoute, recipientEmail, recipientName, publicUrl, snapshot);
    }

    return new Response(JSON.stringify({ linkId: inserted.id, token: accessToken, status: "created" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: errorMessage(error, "Event access link failed.") }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

async function sendEventAccessEmail(admin: any, route: any, to: string, name: string, publicUrl: string, snapshot: any) {
  if (!route) throw new Error("SMTP routing settings are required.");
  const host = String(route.host || "").trim();
  const port = Number(route.port || 587);
  const username = String(route.username || "").trim();
  const secretRef = String(route.secretRef || "").trim();
  const password = await smtpPasswordForRoute(admin, secretRef);
  const fromEmail = String(route.fromEmail || "").trim();
  const fromName = String(route.fromName || "Production Office").trim();
  const replyTo = String(route.replyTo || fromEmail).trim();
  const secureMode = String(route.secure || "").toLowerCase();

  if (!host || !port || !username || !secretRef || !fromEmail) throw new Error("Missing SMTP routing settings.");
  if (!password) throw new Error(`No SMTP route found for ${secretRef}.`);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: secureMode === "ssl" || port === 465,
    auth: { user: username, pass: password },
    requireTLS: secureMode === "tls"
  });

  const eventName = snapshot?.event?.name || "Production event";
  await transporter.sendMail({
    to,
    from: `${fromName} <${fromEmail}>`,
    replyTo,
    subject: `Production event access: ${eventName}`,
    text: `${name || "Production team"}, use this secure link to view the event board: ${publicUrl}`,
    html: `<p>${name || "Production team"},</p><p>You have been given access to the production event board for <strong>${eventName}</strong>.</p><p><a href="${publicUrl}">Open event board</a></p>`
  });
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function smtpPasswordForRoute(admin: any, routeId: string) {
  const secretPassword = Deno.env.get(routeId) || "";
  if (secretPassword) return secretPassword;
  const { data, error } = await admin.from("smtp_routes").select("encrypted_password").eq("id", routeId).maybeSingle();
  if (error) throw error;
  if (!data?.encrypted_password) return "";
  return decryptText(String(data.encrypted_password), Deno.env.get("SMTP_ENCRYPTION_KEY") || "");
}

async function decryptionCryptoKey(secret: string) {
  if (!secret) throw new Error("SMTP encryption key is not configured.");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  return crypto.subtle.importKey("raw", digest, "AES-GCM", false, ["decrypt"]);
}

async function decryptText(value: string, secret: string) {
  const [ivText, encryptedText] = value.split(":");
  if (!ivText || !encryptedText) throw new Error("SMTP route is not readable.");
  const key = await decryptionCryptoKey(secret);
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv: base64Decode(ivText) }, key, base64Decode(encryptedText));
  return new TextDecoder().decode(decrypted);
}

function base64Decode(value: string) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}
