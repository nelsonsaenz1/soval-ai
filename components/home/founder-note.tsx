import { BRAND } from "@/lib/brand";

/**
 * A short, personal note from the founder. No name or photo by design — the
 * point is to signal that the work is personal and relationship-driven.
 */
export function FounderNote() {
  return (
    <figure className="mx-auto max-w-3xl text-center">
      <span className="eyebrow eyebrow--plain mx-auto justify-center">
        From the founder
      </span>
      <blockquote className="mt-6 text-balance font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.1rem)] leading-[1.35] text-heading">
        “I started {BRAND.name} because I discovered a passion for helping people
        improve their lives and businesses with agentic AI. My goal is simple: to
        share it with the world one client at a time, building personal
        relationships and meaningful connections along the way.”
      </blockquote>
      <figcaption className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
        The founder, {BRAND.name}
      </figcaption>
    </figure>
  );
}
