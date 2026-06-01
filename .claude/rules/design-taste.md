# Design taste — Nelson's Path

The look: **Notion readability + Superhuman restraint + Apple lifestyle confidence + Stripe trust polish.** Warm, premium, discreet, simple. No neon-AI clichés, no robot imagery, no SaaS bloat.

## Visual system (implemented in `app/globals.css` via Tailwind v4 `@theme`)

**Palette is matched to metaortho.com** (Nelson's sister brand) for a consistent house style.

- **Backgrounds:** warm cream (`--color-background: #fbf8f5`), white surfaces, warm/sand muted panels (`#f5f0e8`, `#ede7db`). Dark sections use deep teal-navy (`--color-surface-contrast: #0a2633`).
- **Ink:** deep teal-navy text (`--color-foreground: #0a2633`), cool teal-slate for secondary, lighter "subtle" for captions.
- **Accent:** a single **ocean blue** (`--color-accent: #2a6f97`, hover `#1e5a7d`, soft `#e8f1f7`). Warm camel (`--color-accent-warm: #c4976c`) is available as a sparing secondary. Used for CTAs, links, eyebrows, small dots. Locked across the whole site. Never a gradient glow.
- **Type:** Geist (loaded by the scaffold). Large, tight, balanced display headings (`text-display`/`text-h1`/`text-h2` with negative tracking); readable 16px+ body; restrained uppercase eyebrows. No serif.
- **Radius:** locked scale — `rounded-xl` buttons/inputs, `rounded-2xl` cards, `rounded-pill` chips.
- **Imagery:** tasteful placeholders for affluent home/life. The hero uses an abstract "Today" brief card, not stock art. No robots, circuits, glowing brains, or generic dashboards.
- **Luxury rule:** fewer words, more whitespace, precise CTAs.

## Interaction / motion (from emilkowalski/skill + pbakaus/impeccable + Leonxlnx/taste-skill)

- Animate **transform/opacity only** (GPU). Never `transition: all`; name properties.
- **Custom easing**, never `ease-in` on UI. Standard out-curve: `cubic-bezier(0.23,1,0.32,1)` (`--ease-out-soft`).
- **Durations** stay snappy: presses ~100–160ms, UI transitions <300ms. Quiz question entrance is 280ms.
- Buttons press with `active:scale-[0.97]`. Cards lift subtly on hover only.
- One focus treatment page-wide: `:focus-visible` 2px accent outline, offset — never bare `outline:none`.
- Honor `prefers-reduced-motion`: a global rule collapses durations and the reveal/gauge degrade to instant.
- Hero fits the initial viewport; nav is a single line; CTAs are ≤3 words and never wrap.

## Anti-defaults we deliberately avoid (taste-skill)

AI-purple/blue *glow*, centered-hero-on-dark-mesh, three identical feature cards with no hierarchy, glassmorphism-on-everything, Inter + slate-900, beige/brass/espresso "luxury." Our ocean blue is muted and flat (no glow); tiers and cards carry hierarchy (featured Concierge).

## Craft system (the level-up pass)

A deeper read of the three repos (plus Josh Comeau's shadow method and the official Anthropic frontend-design skill) drives these now-implemented rules:

- **Mono labels.** Geist Mono, uppercase, `tracking-[0.1em]` for every eyebrow, nav-meta, tier label, keyboard hint, and "sample result." All numerics (`score`, `%`, step/phase indices) use `tabular-nums`. This is the tech-editorial signal that keeps cream+teal off the generic-luxury default. `.eyebrow` carries a short leading hairline tick.
- **Elevation = layered + hue-tinted.** Shadows are tinted to the teal-navy hue (`hsl(202 45% 14%)`), never black, in 2–3 stacked layers (`--shadow-soft/lift/raise/hero`). Cards rest on `soft`, lift to `lift` on hover. This makes the flat cream read as depth without any gradient.
- **Hairlines are tinted, not gray** (`hsl(202 24% 87%)` on cream, `hsl(202 28% 24%)` on teal panels). Connected panels use `gap-px`/`divide-y` instead of three floating cards.
- **Layout variety (taste-skill).** Homepage runs distinct families: stacked hero → split → connected stepper → asymmetric bento (featured Chief of Staff) → split + divided list → accent quiz band → pull-quote → tier grid (featured Concierge enlarged) → one inverted CtaBand. Only **one** inverted (teal-navy) surface site-wide.
- **Motion.** Transform/opacity only; `--ease-out` (`cubic-bezier(0.23,1,0.32,1)`); press `scale(0.97)` ≤160ms; card hover `-translate-y-0.5` + shadow step; quiz entrance 320ms; reveal 500ms; all collapse under reduced-motion.

### AI-tells we purged (per all three repos)

Removed em-dashes from rendered copy (→ periods/colons/commas), giant decorative `01/02/03` numerals (→ small mono `Step 01` / `Phase 01` only where genuinely sequential), decorative middle-dots, gradient glows, and most "agent" filler ("the agent does X" → "the system" / "a private intelligence"). No glassmorphism, no fake SaaS dashboard (the hero "Today brief" is editorial, not a dashboard).

> External repos were inspected via web (see `.claude/external-skills/SOURCES.md`). Guidance was distilled here rather than copied wholesale.
