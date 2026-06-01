# Conversion rules — Nelson's Path

The business outcome is a **booked discovery call**. Every page drives toward the quiz or the call.

## CTA placement (every page)

- **Above the fold:** primary CTA in the hero (`Take the Agent Fit Quiz` and/or `Book a Discovery Call`).
- **Mid-page:** a contextual CTA after a key section (e.g. "See the full process", "How we keep it private").
- **Bottom:** the shared `CtaBand` (dark contrast band) with quiz + book-call.
- **Header:** persistent `Take Quiz` (ghost) + `Book Call` (primary). Mobile menu mirrors them.
- **Footer:** full nav including Contact, Pricing, Disclaimer.

Primary path: `Home → Quiz → Results → Book Discovery Call`.
Secondary path: `Home → Privacy/Security or Pricing → Book Discovery Call`.

## The Agent Fit Quiz (the core conversion feature)

- Premium consultation intake, not a BuzzFeed quiz. 13 single-select questions, ~2 minutes.
- **Everyone is a good fit.** Scoring (`lib/quiz/scoring.ts`):
  - Displayed score is **floored at 68** and mapped to bands: 68–79 Strong → Essentials, 80–91 Excellent → Concierge, 92–100 Exceptional → Estate.
  - Tier is chosen from dimensional rules first (very-high privacy/support/complexity → Estate; medium integrations / high admin / proactive support → Concierge; otherwise Essentials), then the band/score range is aligned to the tier so copy never contradicts the number.
  - **Low AI comfort never lowers fit** — it raises `supportNeed` (white-glove), per directive.
- Result screen: radial score gauge, band, recommended tier card, 3 personalized reasons (top dimensions), first-3 use cases (from "what to own first"), a 3-step "what we'd build first" roadmap, `Book your discovery call` (carries `?tier=&score=`), `Email me my results` placeholder, retake, and an advisory disclaimer.
- Result context is saved to `sessionStorage` and **prefills the contact form's tier**.

## Pricing = consultative

No checkout, **no numbers** (per client choice). Tiers list inclusions; pricing is confirmed on the call. "Starting at" framing avoided in favor of "confirmed in your discovery call."

## Analytics hooks (`lib/analytics.ts`)

`trackEvent(name, payload)` logs in dev, no-ops in prod unless `NEXT_PUBLIC_ANALYTICS_URL` is set. Events wired: `quiz_started`, `quiz_completed`, `tier_recommended`, `book_call_clicked`, `contact_form_submitted`.

## Lead capture

`POST /api/lead` (placeholder) validates name+email, logs server-side, returns `{ ok }`. No secrets, no storage. TODO: connect CRM/email/scheduler and embed a real booking calendar on `/contact`.
