import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";

/**
 * Soval AI logo mark — a rounded-square monogram with the ocean-blue → teal-navy
 * gradient and a cream serif "S". Inline SVG so it stays crisp at any size and
 * uses the real DM Serif Display face for the letter.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="soval-mark-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a8ab3" />
          <stop offset="0.55" stopColor="#2a6f97" />
          <stop offset="1" stopColor="#0a2633" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="26" fill="url(#soval-mark-gradient)" />
      <text
        x="50"
        y="50"
        dy="0.345em"
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize="68"
        fill="#fbf8f5"
      >
        S
      </text>
    </svg>
  );
}

/** Full logo lockup: mark + wordmark. */
export function Logo({
  className,
  markClassName,
  wordmarkClassName,
  onDark = false,
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  onDark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("size-8 shrink-0", markClassName)} />
      <span
        className={cn(
          "font-display text-xl leading-none tracking-tight",
          onDark ? "text-on-dark" : "text-heading",
          wordmarkClassName,
        )}
      >
        {BRAND.name}
      </span>
    </span>
  );
}
