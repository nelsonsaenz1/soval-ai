# Conversion rules — [NAME TBD]

The business outcome is a booked **$79 AI Clarity Consult**. Every page drives toward the consult or the quiz.

## CTA placement (every page)

- **Above the fold:** primary CTA in the hero (`Book the $79 consult`) plus a secondary (`See services` or `Take the quiz`).
- **Mid-page:** the shared `MidCta` card ("Not sure what you need? Start with the $79 consult.").
- **Bottom:** the shared `CtaBand` (dark mesh band): "You do not need to become an AI expert. You need a system that gives you time back."
- **Header:** persistent `Book $79 consult` (primary) + `Take the quiz` (ghost). Mobile menu mirrors both.
- **Footer:** full nav (Services group, Company group, Get started group), `Book the $79 consult`, and the advisory disclaimer.

Primary path: `Home → Quiz → Result → Book the $79 consult`.
Secondary path: `Home → a Service page or Pricing → Book the $79 consult`.

## The Agent Fit Quiz (`/quiz`, core conversion feature)

- Premium intake, not a BuzzFeed quiz. **8 single-select questions + an email step**, ~2 minutes. Single-select auto-advances; keyboard-navigable `radiogroup`.
- **Everyone gets an honest recommendation** — one of five bands (`lib/quiz.ts`, `scoreQuiz`): Personal Assistant Sprint, Workflow Audit First, Automation Build Candidate, Operating System Retainer, or **DIY / not worth paying for yet**. Scoring is deterministic and every band is reachable.
- DIY is the honest "don't pay yet" outcome — the consult can also result in a no-build recommendation. Never inflate fit.
- Result screen: band label + headline, 3 personalized reasons, the recommended `ServiceCard`, `Book your $79 consult` (carries `?band=&service=`), an "Email me my results" placeholder, and a retake. Context is saved to `sessionStorage.quizResult` and prefills the `/book` form's focus + a "based on your quiz" banner.

## Pricing = productized, real numbers (`/pricing`, `lib/services.ts`)

Real prices, must match exactly: `$79` consult · `$299/$799` personal sprint · `$249/$749` workflow audit · `From $1,500` automation build · `$299/mo` & `$999/mo` retainers. You pay tools directly, **no software markup**, no referral fees. The $79 is credited toward any package booked within 14 days. Final scope confirmed before any build.

## Analytics hooks (`lib/analytics.ts`)

`trackEvent(name, payload)` logs in dev, no-ops in prod unless `NEXT_PUBLIC_ANALYTICS_URL` is set. Events: `consult_clicked`, `path_chosen`, `service_viewed`, `quiz_started`, `quiz_completed`, `band_recommended`, `lead_submitted`.

## Lead capture

`POST /api/lead` (placeholder) validates name+email, logs server-side, returns `{ ok }`. No secrets, no storage. The `/book` intake form fields: name, email, focus (personal/business/both), bottleneck, tools, urgency, notes — plus quiz band/service when present. TODO: connect CRM/email/scheduler, embed a real booking calendar (`BRAND.schedulerEmbedUrl`), and collect the $79 payment.

## Microcopy and tone

Premium, calm, practical, honest, slightly direct. Preserve a human voice. Approved phrases: "Give your time back.", "Built around your real workflow.", "No software markup.", "You own what we build.", "Simple enough to use every week.", "We will tell you when not to automate.", "The goal is not more AI. The goal is less busywork." Avoid hype ("revolutionary", "game-changing", "10x your life", "AI magic", "fully autonomous business", "guaranteed ROI", "replace your team", "set it and forget it") and any fake testimonials, logos, case studies, or unverifiable claims — use "example outcomes" / "illustrative" only.
