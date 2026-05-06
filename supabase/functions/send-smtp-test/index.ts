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
    if (callerRole?.role !== "ADMIN") throw new Error("Only ADMIN can send SMTP tests.");

    const body = await request.json();
    const to = String(body.to || callerData.user.email || "").trim();
    const host = String(body.host || "").trim();
    const port = Number(body.port || 587);
    const username = String(body.username || "").trim();
    const secretRef = String(body.secretRef || "").trim();
    const password = Deno.env.get(secretRef) || "";
    const fromEmail = String(body.fromEmail || "").trim();
    const fromName = String(body.fromName || "Production Crew").trim();
    const replyTo = String(body.replyTo || to).trim();
    const secureMode = String(body.secure || "").toLowerCase();

    if (!to || !host || !port || !username || !secretRef || !fromEmail) {
      throw new Error("Missing SMTP test settings.");
    }
    if (!password) {
      throw new Error(`No Supabase secret found for ${secretRef}.`);
    }

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
    return new Response(JSON.stringify({ error: error.message || "SMTP test failed." }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
});
