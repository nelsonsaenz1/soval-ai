/**
 * Lightweight, future-ready event tracking.
 *
 * Today: logs in development, no-ops in production unless an analytics endpoint
 * is configured via NEXT_PUBLIC_ANALYTICS_URL. Swap the transport below for your
 * real provider (PostHog, Segment, GA4, etc.) without touching call sites.
 */

export type TrackEventName =
  | "consult_clicked"
  | "path_chosen"
  | "service_viewed"
  | "quiz_started"
  | "quiz_completed"
  | "band_recommended"
  | "lead_submitted";

export type TrackPayload = Record<string, string | number | boolean | null>;

export function trackEvent(name: TrackEventName, payload: TrackPayload = {}) {
  const enrichedPayload = { ...payload, ts: Date.now() };

  if (process.env.NODE_ENV !== "production") {
    console.info(`[analytics] ${name}`, enrichedPayload);
  }

  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_URL;
  if (!endpoint || typeof navigator === "undefined") return;

  try {
    const body = JSON.stringify({ name, payload: enrichedPayload });
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon(endpoint, body);
    } else {
      void fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      });
    }
  } catch {
    // Analytics must never break the page.
  }
}
