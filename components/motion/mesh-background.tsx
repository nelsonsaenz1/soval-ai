import { cn } from "@/lib/cn";

/**
 * Decorative soft mesh-gradient orbs for dark hero/CTA surfaces. Purely
 * presentational and GPU-friendly (blurred, static). aria-hidden.
 */
export function MeshBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute -left-24 -top-28 size-[34rem] rounded-full bg-accent/25 blur-[90px]" />
      <div className="absolute -right-20 top-1/4 size-[26rem] rounded-full bg-accent-teal/20 blur-[90px]" />
      <div className="absolute -bottom-32 left-1/3 size-[30rem] rounded-full bg-accent-warm/12 blur-[100px]" />
    </div>
  );
}
