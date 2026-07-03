import { NextResponse } from "next/server";

/**
 * Lead capture endpoint.
 *
 * Validates name + email, logs server-side, and (when Resend is configured)
 * emails a notification to the owner plus an optional confirmation to the lead.
 * Email is best-effort: it never blocks or fails the response. Set these env
 * vars to enable it (see .env.example):
 *   RESEND_API_KEY, LEAD_NOTIFY_EMAIL, LEAD_FROM_EMAIL
 */

type LeadFields = {
  name: string;
  email: string;
  source: string;
  focus: string;
  band: string;
  service: string;
  bottleneck: string;
  tools: string;
  urgency: string;
  notes: string;
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const lead: LeadFields = {
    name: str(body.name),
    email: str(body.email),
    source: str(body.source),
    focus: str(body.focus),
    band: str(body.band),
    service: str(body.service),
    bottleneck: str(body.bottleneck),
    tools: str(body.tools),
    urgency: str(body.urgency),
    notes: str(body.notes),
  };

  if (!lead.name || !lead.email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 422 },
    );
  }

  console.info("[lead] new consult request", {
    ...lead,
    receivedAt: new Date().toISOString(),
  });

  // Fire-and-forget notification; never let email failures break the response.
  await notify(lead).catch((err) => {
    console.error("[lead] email notification failed", err);
  });

  return NextResponse.json({ ok: true });
}

async function notify(lead: LeadFields) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const notifyTo = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !from || !notifyTo) return; // Not configured yet — logging only.

  const send = (payload: Record<string, unknown>) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

  const rows = (
    [
      ["Name", lead.name],
      ["Email", lead.email],
      ["Focus", lead.focus],
      ["Source", lead.source],
      ["Quiz band", lead.band],
      ["Recommended", lead.service],
      ["Bottleneck", lead.bottleneck],
      ["Tools", lead.tools],
      ["Urgency", lead.urgency],
      ["Notes", lead.notes],
    ] as const
  )
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#555"><strong>${esc(k)}</strong></td><td style="padding:4px 0">${esc(v)}</td></tr>`,
    )
    .join("");

  // 1) Notify the owner.
  await send({
    from,
    to: notifyTo,
    reply_to: lead.email,
    subject: `New consult request from ${lead.name}`,
    html: `<h2 style="font-family:Georgia,serif">New consult request</h2><table style="font-family:system-ui,sans-serif;font-size:14px">${rows}</table>`,
  });

  // 2) Confirm to the lead (best-effort).
  await send({
    from,
    to: lead.email,
    subject: "Thanks — we got your request",
    html: `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#111">
      <p>Hi ${esc(lead.name.split(" ")[0] || "there")},</p>
      <p>Thanks for reaching out. We have your details and will follow up shortly to confirm your $79 AI Clarity Consult and a time.</p>
      <p>You will get a one-page AI Leverage Map within 24 hours of the call.</p>
      <p style="color:#555">— Soval AI</p>
    </div>`,
  }).catch(() => {
    // A confirmation failure (e.g. unverified domain) must not surface to the user.
  });
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
