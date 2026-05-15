import { createClient } from "npm:@supabase/supabase-js@2";
import nodemailer from "npm:nodemailer@6.9.16";

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
      .select("role")
      .eq("user_id", callerData.user.id)
      .maybeSingle();
    if (roleError) throw roleError;

    const body = await request.json();
    const scope = String(body.scope || "admin").toLowerCase();
    const to = String(body.to || callerData.user.email || "").trim();
    const host = String(body.host || "").trim();
    const port = Number(body.port || 587);
    const username = String(body.username || "").trim();
    const secretRef = String(body.secretRef || "").trim();

    if (scope === "admin" && callerRole?.role !== "ADMIN") {
      throw new Error("Only ADMIN can send admin SMTP tests.");
    }
    if (scope === "client") {
      if (!["ACCOUNT", "CLIENT"].includes(callerRole?.role)) throw new Error("Only ACCOUNT or CLIENT can send client SMTP tests.");
      await verifyClientSmtpRoute(admin, callerData.user.id, secretRef);
    }
    if (!["admin", "client"].includes(scope)) throw new Error("Unsupported SMTP test scope.");

    const password = await smtpPasswordForRoute(admin, secretRef);
    const fromEmail = String(body.fromEmail || "").trim();
    const fromName = String(body.fromName || "Production Crew").trim();
    const replyTo = String(body.replyTo || to).trim();
    const secureMode = String(body.secure || "").toLowerCase();

    if (!to || !host || !port || !username || !secretRef || !fromEmail) {
      throw new Error("Missing SMTP test settings.");
    }
    if (!password) throw new Error(`No SMTP route found for ${secretRef}.`);

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: secureMode === "ssl" || port === 465,
      auth: {
        user: username,
        pass: password
      },
      requireTLS: secureMode === "tls"
    });

    const result = await transporter.sendMail({
      to,
      from: `${fromName} <${fromEmail}>`,
      replyTo,
      subject: "Production Crew SMTP test",
      text: "Your Production Crew SMTP settings are working.",
      html: "<p>Your Production Crew SMTP settings are working.</p>"
    });

    return new Response(JSON.stringify({ status: "sent", messageId: result.messageId || "" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: errorMessage(error, "SMTP test failed.") }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

async function verifyClientSmtpRoute(admin: any, userId: string, routeId: string) {
  if (!routeId) throw new Error("Missing SMTP route.");
  const { data, error } = await admin
    .from("client_reps")
    .select("id")
    .eq("auth_user_id", userId)
    .eq("smtp_secret_ref", routeId)
    .maybeSingle();
  if (error) throw error;
  if (!data?.id) throw new Error("This SMTP route is not assigned to your client profile.");
}

async function smtpPasswordForRoute(admin: any, routeId: string) {
  const secretPassword = Deno.env.get(routeId) || "";
  if (secretPassword) return secretPassword;
  const { data, error } = await admin
    .from("smtp_routes")
    .select("encrypted_password")
    .eq("id", routeId)
    .maybeSingle();
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
  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: base64Decode(ivText) },
    key,
    base64Decode(encryptedText)
  );
  return new TextDecoder().decode(decrypted);
}

function base64Decode(value: string) {
  return Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
}
