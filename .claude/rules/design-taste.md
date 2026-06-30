# Design taste — [NAME TBD]

The look: **Notion readability + Superhuman restraint + Apple lifestyle confidence + Stripe trust polish.** Warm, premium, discreet, simple. No neon-AI clichés, no robot imagery, no SaaS bloat. We **replicate the MetaOrtho visual system** and translate it from healthcare to an AI concierge / operations studio.

## Visual system (implemented in `app/globals.css` via Tailwind v4 `@theme`)

- **Backgrounds:** warm cream (`--color-background: #fbf8f5`), white surfaces, warm/sand muted panels (`#f5f0e8`, `#ede7db`). Dark sections use deep teal-navy (`--color-dark: #0a2633`, `--color-darkest: #061b24`).
- **Ink:** near-black primary text (`rgba(0,0,0,.94)`), teal-navy headings (`--color-heading: #0a2633`), secondary `rgba(0,0,0,.80)`, muted `rgba(0,0,0,.55)`. On dark: `--color-on-dark*`.
- **Accent:** a single **ocean blue** (`--color-accent: #2a6f97`, hover `#1e5a7d`, light `#e8f1f7`). Warm camel (`#c4976c`) and teal (`#2e7d7d`) are sparing secondaries. Used for CTAs, links, eyebrows, dots, prices. Flat, never a gradient glow.
- **Type:** **DM Serif Display** for editorial headings (the `.font-display` / `font-serif` helper on display/h1/h2/h3/hero), **DM Sans** for body, labels, and eyebrows. Large, tight, negative-tracked display scale (`text-display`/`text-h1`/`text-h2`). Eyebrows are DM Sans uppercase, `tracking-[0.15em]`, ocean-blue, with a short leading hairline tick (`.eyebrow`). All numerics (prices, scores, step indices) use `.nums` (tabular).
- **Radius:** locked scale — `rounded-sm/md/lg/xl` = 12/16/24/32px, `rounded-pill` = 9999px. Buttons and chips are pills; cards are `rounded-2xl` (32px).
- **Elevation:** layered, **hue-tinted** shadows (teal-navy hue, never black) in `--shadow-soft/lift/raise/hero`. Cards rest on `soft`, lift to `lift` on hover.
- **Hairlines** are tinted, not gray (`rgba(0,0,0,.08)`), and `border-on-dark-hairline` on dark panels. Connected panels use `gap-px`/`divide-y`.
- **Glass + mesh:** `.glass-cream` (translucent warm white on light) and `.glass-dark` (Linear-style translucent panel on dark); `.mesh-dark` / `.mesh-cream` soft radial mesh gradients for hero, CTA, and dashboard surfaces.
- **Imagery:** no robots, circuits, glowing brains, or fake SaaS dashboards. The hero "Your AI Operating System" mockup is editorial and explicitly labeled **Sample view** / **Illustrative**.

## Interaction / motion

- Animate **transform/opacity only** (GPU). Never `transition: all`; name properties.
- **Custom easing** `--ease-out` = `cubic-bezier(0.23,1,0.32,1)`; never `ease-in` on UI.
- Durations: presses ~100–160ms (`active:scale-[0.97]`), UI < 300ms, quiz entrance 340ms, reveal 600ms, dashboard `card-in` + `bar-fill`.
- Cards lift `-translate-y-0.5` + shadow step on hover. One focus treatment page-wide: `:focus-visible` 2px ocean-blue outline, offset — never bare `outline:none`.
- Honor `prefers-reduced-motion`: a global rule collapses durations; reveal/bar-fill degrade to their end state.
- The hero `MagneticButton` and the animated dashboard are tiny client components; everything else is CSS. **framer-motion is intentionally not used** (React 19 / Next 16 / Turbopack robustness).

## Dark surfaces

Multiple deep teal-navy moments are on-brand (MetaOrtho uses several): the hero dashboard mockup, the shared `CtaBand`, and the footer are dark. Use them for hierarchy, not decoration. (This relaxes the old "exactly one inverted surface" rule.)

## Anti-defaults we deliberately avoid

AI-purple/blue *glow*, centered-hero-on-dark-mesh as the only idea, three identical feature cards with no hierarchy, glassmorphism-on-everything, Inter + slate-900, fake dashboards, and giant decorative `01/02/03` numerals (we use small mono-style `Step 01` / `Question 01` only where genuinely sequential). No em-dashes in rendered copy (use periods/colons/commas).
