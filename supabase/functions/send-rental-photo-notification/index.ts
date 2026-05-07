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
    if (!supabaseUrl || !serviceRoleKey || !token) throw new Error("Rental photo notification function is missing required configuration.");

    const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false } });
    const { data: callerData, error: callerError } = await admin.auth.getUser(token);
    if (callerError || !callerData.user) throw new Error("Login required.");

    const { data: callerRole, error: roleError } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", callerData.user.id)
      .maybeSingle();
    if (roleError) throw roleError;
    if (!["CLIENT", "PROMOTER", "PROMOTER_PRODUCTION_OFFICE", "CREW"].includes(callerRole?.role)) {
      throw new Error("This access view cannot send rental photo notifications.");
    }

    const body = await request.json();
    const route = body.emailRoute || {};
    const to = String(body.to || callerData.user.email || "").trim();
    const type = String(body.type || "start_reminder").trim();
    const workerName = String(body.workerName || "Crew member").trim();
    const eventName = String(body.eventName || "Assigned event").trim();
    const vehiclePageUrl = String(body.vehiclePageUrl || "").trim();

    if (!to) throw new Error("No recipient email was provided.");
    await sendRentalPhotoEmail(admin, route, to, type, workerName, eventName, vehiclePageUrl);

    return new Response(JSON.stringify({ status: "sent" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Rental photo notification failed." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

async function sendRentalPhotoEmail(admin: any, route: any, to: string, type: string, workerName: string, eventName: string, vehiclePageUrl: string) {
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

  const isUrgent = type === "urgent_start_missing";
  const subject = isUrgent
    ? `URGENT: rental vehicle photos needed for ${eventName}`
    : `Rental vehicle photos needed for ${eventName}`;
  const actionText = isUrgent
    ? "Your rental vehicle start photos and license plate number are still missing. Please submit them immediately."
    : "Please submit the rental vehicle start photos and license plate number within 15 minutes of Call Time.";
  const warningText = isUrgent
    ? "This urgent reminder may be used as a written warning if the required rental vehicle check is not completed."
    : "You will receive an urgent reminder if the photos and plate number are still missing after 15 minutes.";
  const linkText = vehiclePageUrl ? `\n\nOpen the Vehicles page: ${vehiclePageUrl}` : "";
  const linkHtml = vehiclePageUrl ? `<p><a href="${vehiclePageUrl}">Open the Vehicles page</a></p>` : "";

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: secureMode === "ssl" || port === 465,
    auth: { user: username, pass: password },
    requireTLS: secureMode === "tls"
  });

  const result = await transporter.sendMail({
    to,
    from: `${fromName} <${fromEmail}>`,
    replyTo,
    subject,
    text: `${workerName},\n\n${actionText}\n\nEvent: ${eventName}\n\n${warningText}${linkText}`,
    html: `<p>${workerName},</p><p>${actionText}</p><p><strong>Event:</strong> ${escapeHtml(eventName)}</p><p>${warningText}</p>${linkHtml}`
  });

  if (!result.accepted?.length) throw new Error(`SMTP did not accept the rental photo email for ${to}.`);
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

function escapeHtml(value: string) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
