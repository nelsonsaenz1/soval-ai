@AGENTS.md

# Nelson's Path — premium marketing site + Agent Fit Quiz

Done-for-you personal AI agent buildout + concierge service for affluent, non-technical households. This is the v1 marketing site. The business outcome is a **booked discovery call**; the hero feature is the **Agent Fit Quiz**.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** · **Tailwind CSS v4** (CSS-first `@theme`, no `tailwind.config`).
- Font: **Geist** (via `next/font`). No other UI libs — primitives are hand-rolled. Transitions are CSS (framer-motion was evaluated and removed in favor of a robust CSS approach).
- Import alias: `@/*` → repo root. No `src/` dir.

## Commands

```bash
npm run dev     # dev server (localhost:3000)
npm run build   # production build + type check  ✅ passing
npm run lint    # eslint (flat config)            ✅ clean
```

Preview is configured in `.claude/launch.json` (server name `web`).

## Architecture

```
app/
  layout.tsx            # header + footer shell, metadata, skip link
  page.tsx              # home (8 sections per directive)
  how-it-works/         agent-capabilities/   privacy-security/
  pricing/              about/                contact/   quiz/
  api/lead/route.ts     # lead capture placeholder (logs, no secrets)
components/
  ui/                   # button, badge, card, section, reveal primitives
  site-header / site-footer / hero / cta-band / page-hero
  tier-card / agent-card / trust-callout / score-gauge / contact-form
  quiz/                 # quiz-flow (orchestrator) + question/progress/result
lib/
  site-copy.ts          # all marketing copy + tiers/agents/trust data
  analytics.ts          # trackEvent(name, payload)
  quiz/                 # questions.ts, scoring.ts (typed), types.ts
```

## Design + conversion rules

Read `.claude/rules/design-taste.md` and `.claude/rules/conversion.md` before editing UI or copy. In short: warm cream + deep teal-navy, single **ocean-blue** accent (palette matched to metaortho.com); **Geist Sans + Geist Mono** for eyebrows/labels/numerics (`tabular-nums`); hue-tinted layered shadows + tinted hairlines; deliberate layout variety with exactly one inverted (teal-navy) surface; GPU-only motion; no AI clichés. Copy voice is editorial and precise: no em-dashes in rendered copy, minimal "agent talk" (prefer "your system" / "a private intelligence"). Every page has above-fold / mid / bottom CTAs driving to the quiz or a discovery call. External design-skill repos were inspected and applied — see `.claude/external-skills/SOURCES.md` and the "Craft system" section of design-taste.md.

## Quiz scoring invariants (`lib/quiz/scoring.ts`)

- Score is **floored at 68** — no "bad fit" result, ever.
- Bands: 68–79 Strong → Essentials · 80–91 Excellent → Concierge · 92–100 Exceptional → Estate.
- Tier comes from dimensional rules; score range is aligned to tier so number and copy agree.
- **Low AI comfort raises support need, never lowers fit.**
- Verified end-to-end: weakest answers = 69/Essentials, strongest = 100/Estate.

## Brand decisions (confirmed with Nelson)

- Palette: **matched to metaortho.com** — warm cream/sand backgrounds, deep teal-navy (`#0a2633`) for dark sections + ink, **ocean-blue accent** (`#2a6f97`), warm camel (`#c4976c`) as a secondary accent. (Superseded the original warm-violet direction.)
- Pricing: **fully consultative — no numbers**. Tiers show inclusions; price confirmed on the call.

## TODOs (v1 placeholders)

- `/contact`: embed a real scheduler (Cal.com/Calendly/SavvyCal) — placeholder block in `app/contact/page.tsx`.
- `app/api/lead/route.ts`: forward leads to CRM/email; read keys from env, never hard-code.
- "Email me my results" on the quiz result is a placeholder confirmation.
- `app/about/page.tsx`: replace the founder-story paragraph with Nelson's real story/credibility.
- Analytics: set `NEXT_PUBLIC_ANALYTICS_URL` and point `trackEvent` at the real provider.
- A stray `~/package-lock.json` exists; `next.config.ts` pins `turbopack.root` to silence the workspace-root warning.
