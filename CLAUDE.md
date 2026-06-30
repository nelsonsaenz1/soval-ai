@AGENTS.md

# [NAME TBD] — AI concierge / operations studio (marketing site + Agent Fit Quiz)

Done-for-you **personal AI assistants** + **small-business workflow automation** for busy
individuals, founders, solopreneurs, and small businesses. A premium, conversion-oriented
marketing site that borrows the **MetaOrtho** UI style and translates it from healthcare into
an AI concierge / operations studio. Business outcome: a booked **$79 AI Clarity Consult**.
Hero feature: the **Agent Fit Quiz**.

Built to `~/MissionControl/ai-consulting-business-docs/website-build-directive.pdf` (June 30, 2026).
That directive supersedes the earlier "Nelson's Path" concept (warm-violet, consultative/no-numbers,
3 tiers) that this repo was first scaffolded with.

## The name is a deliberate placeholder

The company name is undecided. It renders as `[NAME TBD]` everywhere, centralized in
`lib/brand.ts` (`BRAND.name`). Change that one value to rebrand the entire site. Nothing else
hard-codes the name, email, url, or primary CTA copy.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** · **Tailwind CSS v4**
  (CSS-first `@theme`, no `tailwind.config`).
- Fonts: **DM Serif Display** (editorial headings) + **DM Sans** (body), via `next/font/google`.
- **Zero extra runtime/UI deps.** Motion is CSS (transform/opacity, custom easing) plus two tiny
  client components (`motion/magnetic-button`, `dashboard-mockup`). framer-motion was deliberately
  not reintroduced (React 19 / Next 16 / Turbopack robustness; the directive's req #6 permits
  implementation-driven changes, and the acceptance criteria are visual, not library-specific).
  Forms are simple controlled forms with inline validation (directive allows "RHF **or** simple
  controlled forms") — no zod / react-hook-form.
- Import alias `@/*` → repo root. No `src/`.

## Commands

```bash
npm run dev     # localhost:3000
npm run build   # production build + type check  ✅ passing (17 routes prerender)
npm run lint    # eslint flat config              ✅ clean
```

Preview server name is `web` (`.claude/launch.json`).

## Architecture

```
app/
  layout.tsx              # DM fonts, metadata (from BRAND), Navbar + Footer shell, skip link
  page.tsx                # home: hero · problem · path chooser · services · mid-CTA · how-it-works · pricing · final CTA
  services/page.tsx       # hub: all 5 offers with best-fit / not-fit
  services/{personal-ai-assistant,business-workflow-audit,automation-build-sprint,ai-operating-system}/page.tsx
  pricing/  quiz/  book/  about/  faq/  privacy/  terms/
  api/lead/route.ts       # lead capture placeholder (validates name+email, logs, no secrets)
components/
  ui/                     # button (pill), card (glass variants), badge, section, reveal
  layout/                 # navbar, footer
  motion/                 # mesh-background, magnetic-button
  home/                   # hero, path-chooser
  dashboard-mockup · service-card · service-detail · price-tier-table
  consult-button · mid-cta · cta-band · page-hero · faq-list · legal-page · book-form · quiz/quiz-flow
lib/
  brand.ts                # name, CTAs, nav, footer, contact, disclaimer (single source of truth)
  services.ts             # the 5 offers: pricing, tiers, deliverables, fit, detail-page content
  quiz.ts                 # 8 questions + 5-band scoring (scoreQuiz)
  faq.ts · analytics.ts · cn.ts
```

## Offers + pricing — REAL numbers (must match `/pricing` and `lib/services.ts` exactly)

- **AI Clarity Consult** — `$79` (entry point; the primary CTA → `/book`)
- **Personal AI Assistant Sprint** — `$299` Starter / `$799` Full Build
- **Small Business AI Workflow Audit** — `$249` Lite / `$749` Deep Dive
- **Automation Build Sprint** — `From $1,500` (common range $1,500–$3,500; larger quoted)
- **AI Operating System Retainer** — `$299/mo` Personal OS / `$999/mo` Business OS

You pay tools directly; **no software markup**, no referral fees. The $79 consult is credited
toward any package booked within 14 days. Pricing is real per the directive (this replaced the
old consultative/no-numbers model).

## Quiz invariants (`lib/quiz.ts`)

- 8 single-select questions + an email step → one of **five honest bands**: Personal Assistant
  Sprint · Workflow Audit First · Automation Build Candidate · Operating System Retainer ·
  **DIY / not worth paying for yet**.
- `scoreQuiz()` is deterministic; every band is reachable. DIY is the honest "don't pay yet"
  outcome (the consult can also result in a no-build recommendation).
- The result carries `?band=&service=` to `/book` and writes `sessionStorage.quizResult`, which
  prefills the book form's focus and shows a "based on your quiz" banner.

## Design + conversion rules

Read `.claude/rules/design-taste.md` and `.claude/rules/conversion.md` before editing UI or copy.
In short: replicate MetaOrtho — warm cream pages, deep teal-navy dark sections, single **ocean-blue**
accent (`#2a6f97`) with warm camel + teal as sparing secondaries; **DM Serif Display** headings +
**DM Sans** body/labels; large **pill** CTAs; rounded cards (radii 12/16/24/32/pill); glass-cream /
glass-dark surfaces; soft mesh gradients; layered hue-tinted shadows + tinted hairlines; GPU-only,
custom-eased, reduced-motion-safe motion. Tone: premium, calm, practical, honest, slightly direct.
No hype ("revolutionary", "10x", "AI magic"), no fake testimonials/logos/ROI — only "example
outcomes" / "illustrative". Primary CTA **Book the $79 consult** appears in nav, hero, pricing,
the final CTA band, footer, and the mobile menu; secondary CTAs are See services / Take the quiz.
Every page has above-fold, mid (`MidCta`), and bottom (`CtaBand`) calls to action.

## TODOs (v1 placeholders)

- Pick the real name and set `BRAND.name`; set `BRAND.email` / `url` / `domain`.
- `/book`: embed a real scheduler (set `BRAND.schedulerEmbedUrl`) and collect the $79 payment.
- `app/api/lead/route.ts`: forward leads to CRM / email (env keys, never hard-coded).
- Quiz "Email me my results" and the book confirmation are placeholders.
- `app/about/page.tsx`: replace the founder-positioning paragraph with the real story.
- Analytics: set `NEXT_PUBLIC_ANALYTICS_URL` and point `trackEvent` at the real provider.
- `next.config.ts` pins `turbopack.root` to silence the stray `~/package-lock.json` workspace warning.
