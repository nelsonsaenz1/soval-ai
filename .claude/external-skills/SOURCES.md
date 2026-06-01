# External design-skill sources

The directive referenced three GitHub repos for design/interaction taste. They were **inspected via the web** and distilled into `.claude/rules/design-taste.md` rather than copied into the app (the directive said not to blindly copy large files).

| Repo | Status | What it is | Used for |
|---|---|---|---|
| [emilkowalski/skill](https://github.com/emilkowalski/skill) | ✅ found | Emil Kowalski's animation/interaction craft (`SKILL.md`) — easing, durations, when (not) to animate | Easing curves, durations, GPU-only motion, button press |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | ✅ found | "AI harness" design-engineering skill — states, focus, spacing, type scales | Focus treatment, 8-state thinking, spacing/type rhythm |
| LeonxInx/taste-skill | ❌ 404 (typo in directive) | — | — |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | ✅ found (correct URL) | Anti-"AI slop" frontend guardrails — banned defaults, hero rules, color discipline | Avoided AI-purple glow, locked single muted accent, hero-in-viewport, locked radius |

**Note:** the directive's third URL `github.com/LeonxInx/taste-skill` 404s — it's a typo. The real repo is `github.com/Leonxlnx/taste-skill` (lowercase L-n-x). That correct one was read.

## Additional sources (level-up research pass)

A second, deeper research pass pulled the full rule sets from the three repos above and evaluated the strongest UI/design-engineering references on GitHub. Most useful, and what was borrowed:

| Source | Borrowed |
|---|---|
| [Josh W. Comeau — Designing Shadows](https://www.joshwcomeau.com/css/designing-shadows/) | Layered, hue-tinted elevation system (`--shadow-soft/lift/raise/hero`) |
| Anthropic official frontend-design skill | The "purpose / tone / constraints / differentiation" gate before writing UI |
| [Koomook/claude-frontend-skills](https://github.com/Koomook/claude-frontend-skills), [wilwaldon/Claude-Code-Frontend-Design-Toolkit](https://github.com/wilwaldon/Claude-Code-Frontend-Design-Toolkit) | Used as a *counter-example* — their Space-Grotesk/cyberpunk/mesh-gradient defaults are exactly the slop to avoid for a restrained brand |
| Vercel Geist / Linear conventions | Mono labels + `tabular-nums` as the tech-editorial signal |

The concrete, implemented playbook lives in `.claude/rules/design-taste.md` ("Craft system" section).

No external skill files are committed here; this folder documents what was inspected.
