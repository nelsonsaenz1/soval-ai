import * as React from "react";
import { cn } from "@/lib/cn";

type Variant = "surface" | "cream" | "glassCream" | "glassDark" | "plain";

const variants: Record<Variant, string> = {
  surface: "bg-surface border border-hairline shadow-soft",
  cream: "bg-cream border border-hairline shadow-soft",
  glassCream: "glass-cream",
  glassDark: "glass-dark text-on-dark",
  plain: "",
};

export function Card({
  children,
  className,
  variant = "surface",
  interactive = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  interactive?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Tag
      className={cn(
        "rounded-2xl p-6 sm:p-8",
        variants[variant],
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:shadow-lift",
        interactive && variant !== "glassDark" && "hover:border-accent/30",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
