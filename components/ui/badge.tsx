import * as React from "react";
import { cn } from "@/lib/cn";

export function Badge({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "accent";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border px-3.5 py-1.5",
        "font-mono text-[0.7rem] font-medium uppercase tracking-[0.1em]",
        tone === "accent"
          ? "border-accent-border bg-accent-soft text-accent-strong"
          : "border-border bg-surface text-muted-foreground",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-accent"
      />
      {children}
    </span>
  );
}

export function CheckBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
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
