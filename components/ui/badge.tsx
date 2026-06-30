import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "accent" | "neutral" | "warm" | "onDark" | "outline";

const variants: Record<Variant, string> = {
  accent: "bg-accent-light text-accent border border-accent/15",
  neutral: "bg-warm text-secondary border border-hairline",
  warm: "bg-accent-warm/12 text-accent-warm-hover border border-accent-warm/25",
  onDark: "bg-white/10 text-on-dark border border-on-dark-hairline",
  outline: "bg-transparent text-secondary border border-hairline-strong",
};

export function Badge({
  children,
  className,
  variant = "accent",
  dot = false,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  dot?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-medium leading-none",
        variants[variant],
        className,
      )}
    >
      {dot ? (
        <span
          className={cn(
            "size-1.5 rounded-full",
            variant === "onDark" ? "bg-white/70" : "bg-accent",
          )}
          aria-hidden
        />
      ) : null}
      {children}
    </span>
  );
}

/** Small check-prefixed pill, used for trust/inclusion chips. */
export function CheckBadge({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 text-xs font-medium",
        onDark
          ? "border-on-dark-hairline bg-white/10 text-on-dark"
          : "border-hairline bg-surface text-secondary",
      )}
    >
      <svg
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 text-accent"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3.5 8.5l2.5 2.5 6-6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </span>
  );
}
