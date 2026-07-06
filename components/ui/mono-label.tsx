import * as React from "react";
import { cn } from "@/lib/cn";

/**
 * A JetBrains Mono uppercase micro-label — the engineered kicker used across the
 * dark-first system for eyebrows, kickers, stat captions, footer headers, and
 * category tags. Size, weight, and color are set by the caller via `className`.
 */
export function MonoLabel({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  return <Tag className={cn("mono-label", className)}>{children}</Tag>;
}
