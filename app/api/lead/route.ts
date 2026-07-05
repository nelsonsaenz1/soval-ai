import { NextResponse } from "next/server";

/**
 * Lead capture endpoint.
 *
 * Validates name + email, logs server-side, and (when Resend is configured)
 * emails a branded notification to the owner plus a confirmation to the lead.
 * Email is best-effort: it never blocks or fails the response. Enable it with
 * (see .env.example): RESEND_API_KEY, LEAD_NOTIFY_EMAIL, LEAD_FROM_EMAIL.
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

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://soval-ai.vercel.app";

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

  await notify(lead).catch((err) => {
    console.error("[lead] email notification failed", err);
  });

  return NextResponse.json({ ok: true });
}

async function notify(lead: LeadFields) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const notifyTo = process.env.LEAD_NOTIFY_EMAIL;
  if (!apiKey || !from || !notifyTo) return; // Not configured — logging only.

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
        `<tr><td style="padding:6px 14px 6px 0;color:#5b6b72;vertical-align:top;white-space:nowrap;"><strong>${esc(k)}</strong></td><td style="padding:6px 0;color:#1a1a1a;">${esc(v)}</td></tr>`,
    )
    .join("");

  const ownerBody = `
    <h1 style="${H1}">New consult request</h1>
    <p style="${P}">Someone reached out through the site. Their details:</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;line-height:1.5;">${rows}</table>
    <p style="margin:22px 0 0;"><a href="mailto:${esc(lead.email)}" style="${BTN}">Reply to ${esc(lead.name.split(" ")[0] || "them")}</a></p>`;

  const leadBody = `
    <h1 style="${H1}">Thanks, ${esc(lead.name.split(" ")[0] || "there")}.</h1>
    <p style="${P}">We have your details and will follow up shortly to confirm your $79 AI Clarity Consult and a time that works.</p>
    <p style="${P}">You will get a one-page AI Leverage Map within 24 hours of the call, with the highest-leverage place AI can give you time back.</p>
    <p style="margin:24px 0 0;"><a href="${SITE}/book" style="${BTN}">Pick your time</a></p>
    <p style="margin:22px 0 0;color:#5b6b72;">— The Soval AI team</p>`;

  // 1) Notify the owner.
  await send({
    from,
    to: notifyTo,
    reply_to: lead.email,
    subject: `New consult request from ${lead.name}`,
    html: shell(`New consult request from ${lead.name}`, ownerBody),
  });

  // 2) Confirm to the lead (best-effort).
  await send({
    from,
    to: lead.email,
    subject: "Thanks — we got your request",
    html: shell("We got your request and will follow up shortly.", leadBody),
  }).catch(() => {
    // A confirmation failure (e.g. unverified domain) must not surface to the user.
  });
}

// --- Email template (MetaOrtho-style: warm cream, teal-navy ink, ocean accent) ---

const H1 =
  "font-family:Georgia,'Times New Roman',serif;color:#0a2633;font-size:22px;line-height:1.25;margin:0 0 10px;font-weight:400;";
const P = "margin:0 0 14px;color:#333;font-size:15px;line-height:1.6;";
const BTN =
  "display:inline-block;background:#2a6f97;color:#ffffff;text-decoration:none;font-weight:600;padding:11px 22px;border-radius:9999px;font-size:14px;";

function shell(preheader: string, bodyHtml: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fbf8f5;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fbf8f5;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:14px;overflow:hidden;">
      <tr><td style="padding:28px 34px 0 34px;">
        <img src="${SITE}/logo-dark.png" alt="Soval AI" width="168" style="display:block;border:0;height:auto;width:168px;" />
      </td></tr>
      <tr><td style="padding:18px 34px 0 34px;"><div style="height:3px;width:44px;background:#2a6f97;border-radius:2px;font-size:0;line-height:0;">&nbsp;</div></td></tr>
      <tr><td style="padding:20px 34px 30px 34px;">${bodyHtml}</td></tr>
      <tr><td style="padding:22px 34px;background:#fbf8f5;border-top:1px solid rgba(0,0,0,0.07);color:#5b6b72;font-size:12px;line-height:1.6;">
        <strong style="color:#0a2633;">Soval AI</strong> — Personal AI assistants + small-business automation.<br/>
        AI outputs can be imperfect; you remain responsible for reviewing anything produced. Example outcomes are illustrative.
      </td></tr>
    </table>
  </td></tr>
</table></body></html>`;
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
