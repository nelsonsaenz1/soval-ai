import { NextResponse } from "next/server";

/**
 * Lead capture endpoint (v1 placeholder).
 *
 * Today it validates shape and logs server-side. No secrets, no storage.
 * TODO: forward to your CRM / email / scheduler (e.g. create a contact,
 * send a notification, and return a booking link). Do not hard-code keys —
 * read them from environment variables when you wire this up.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  if (!name || !email) {
    return NextResponse.json(
      { ok: false, error: "Name and email are required." },
      { status: 422 },
    );
  }

  console.info("[lead] new discovery-call request", {
    name,
    email,
    tier: body.tier ?? null,
    contactMethod: body.contactMethod ?? null,
    fromQuiz: Boolean(body.quizScore),
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
