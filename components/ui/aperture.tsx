import { cn } from "@/lib/cn";

/**
 * The Soval AI aperture mark: three 8px-stroke arcs (each a 60/179 dash,
 * rotated -96 / 24 / 144 degrees) around a center dot, in a 120x120 viewBox.
 *
 * - `variant="full"` renders the brand's three-color arcs (ocean / teal / camel).
 * - `variant="mono"` inherits `currentColor` so it can be tinted (e.g. the
 *   footer wordmark, or the slow-rotating orbit mark in the hero).
 *
 * Decorative by default (`aria-hidden`); the surrounding lockup carries the
 * accessible name.
 */
export function ApertureMark({
  variant = "full",
  className,
  spin = false,
}: {
  variant?: "full" | "mono";
  className?: string;
  /** Slowly rotate in place (used by the hero orbit mark). */
  spin?: boolean;
}) {
  const mono = variant === "mono";
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn(spin && "sv-orbit", className)}
      fill="none"
      aria-hidden="true"
    >
      <g strokeWidth="8" strokeLinecap="round">
        <circle
          cx="60"
          cy="60"
          r="38"
          stroke={mono ? "currentColor" : "#2a6f97"}
          strokeDasharray="60 179"
          transform="rotate(-96 60 60)"
        />
        <circle
          cx="60"
          cy="60"
          r="38"
          stroke={mono ? "currentColor" : "#2e7d7d"}
          strokeDasharray="60 179"
          transform="rotate(24 60 60)"
        />
        <circle
          cx="60"
          cy="60"
          r="38"
          stroke={mono ? "currentColor" : "#c4976c"}
          strokeDasharray="60 179"
          transform="rotate(144 60 60)"
        />
      </g>
      <circle cx="60" cy="60" r="5" fill={mono ? "currentColor" : "#2a6f97"} />
    </svg>
  );
}
