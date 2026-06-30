"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

type Variant = React.ComponentProps<typeof Button>["variant"];
type Size = React.ComponentProps<typeof Button>["size"];

/**
 * A Button that subtly tracks the pointer on hover (fine-pointer devices only).
 * Transform-only, applied directly to the wrapper for performance, and disabled
 * under reduced motion or coarse pointers. Falls back to a plain Button.
 */
export function MagneticButton({
  href,
  children,
  variant,
  size = "lg",
  strength = 7,
  onClick,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  strength?: number;
  onClick?: () => void;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const enabled = React.useRef(false);

  React.useEffect(() => {
    enabled.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const node = ref.current;
    if (!node || !enabled.current) return;
    const rect = node.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    node.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
  };

  const reset = () => {
    const node = ref.current;
    if (node) node.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={className}
      style={{
        display: "inline-flex",
        transition: "transform 0.25s cubic-bezier(0.23,1,0.32,1)",
        willChange: "transform",
      }}
    >
      <Button href={href} variant={variant} size={size} onClick={onClick}>
        {children}
      </Button>
    </span>
  );
}
