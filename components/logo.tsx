import { cn } from "@/lib/cn";
import { ApertureMark } from "@/components/ui/aperture";

/**
 * Soval AI logo lockup: the aperture mark + the SOVAL wordmark (Space Grotesk)
 * + an "AI" pill. Vector, so it stays crisp and can be tinted per surface.
 *
 * - `onDark` sets the wordmark white (teal-navy on light surfaces otherwise).
 * - `mono` renders the mark in a single tint (`--color-accent-onDark`) instead
 *   of the full three-color arcs — used in the footer.
 * - `markSize` / `wordSize` size the mark and wordmark (nav 34/19, footer 30/17).
 *
 * The accessible name is provided by the wrapping link's aria-label; the mark
 * itself is decorative.
 */
export function Logo({
  onDark = false,
  mono = false,
  markSize = 34,
  wordSize = 19,
  className,
}: {
  onDark?: boolean;
  mono?: boolean;
  markSize?: number;
  wordSize?: number;
  className?: string;
}) {
  const pillSize = Math.round(wordSize * 0.58);
  return (
    <span className={cn("inline-flex items-center gap-[0.6rem]", className)}>
      <span
        className="inline-flex shrink-0 items-center justify-center"
        style={{ width: markSize, height: markSize }}
      >
        <ApertureMark
          variant={mono ? "mono" : "full"}
          className={cn("h-full w-full", mono && "text-accent-onDark")}
        />
      </span>
      <span
        className={cn(
          "font-grotesk font-semibold leading-none tracking-[0.16em]",
          onDark ? "text-white" : "text-heading",
        )}
        style={{ fontSize: wordSize }}
      >
        SOVAL
      </span>
      <span
        className="rounded-pill bg-accent-onDark px-[7px] py-[2px] font-grotesk font-medium leading-none tracking-[0.1em] text-dark"
        style={{ fontSize: pillSize }}
      >
        AI
      </span>
    </span>
  );
}
