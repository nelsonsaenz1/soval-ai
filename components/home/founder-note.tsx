import { BRAND } from "@/lib/brand";
import { MonoLabel } from "@/components/ui/mono-label";

/**
 * A short, personal note from the founder, on the dark canvas. No name or photo
 * by design — the point is to signal that the work is personal and
 * relationship-driven.
 */
export function FounderNote() {
  return (
    <figure className="mx-auto max-w-[780px] text-center">
      <MonoLabel className="text-[11px] font-semibold tracking-[0.16em] text-accent-onDark">
        From the founder
      </MonoLabel>
      <blockquote className="mt-[22px] text-balance font-display text-[clamp(1.5rem,1.05rem+1.9vw,2rem)] leading-[1.36] tracking-[-0.01em] text-white">
        “I started {BRAND.name} because I discovered a passion for helping people
        improve their lives and businesses with agentic AI. My goal is simple: to
        share it with the world one client at a time, building personal
        relationships and meaningful connections along the way.”
      </blockquote>
      <figcaption className="mt-[26px]">
        <MonoLabel className="text-[11px] font-semibold tracking-[0.16em] text-white/50">
          The founder, {BRAND.name}
        </MonoLabel>
      </figcaption>
    </figure>
  );
}
