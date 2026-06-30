"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { BRAND } from "@/lib/brand";
import { trackEvent } from "@/lib/analytics";

type Variant = React.ComponentProps<typeof Button>["variant"];
type Size = React.ComponentProps<typeof Button>["size"];

/**
 * The primary "Book the $79 consult" CTA, with analytics. `source` labels where
 * the click came from. Set `magnetic` for hero/band emphasis.
 */
export function ConsultButton({
  source,
  label = BRAND.primaryCta.label,
  variant,
  size = "lg",
  magnetic = false,
  className,
}: {
  source: string;
  label?: string;
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  className?: string;
}) {
  const onClick = () => trackEvent("consult_clicked", { source });

  if (magnetic) {
    return (
      <MagneticButton
        href={BRAND.primaryCta.href}
        variant={variant}
        size={size}
        onClick={onClick}
        className={className}
      >
        {label}
      </MagneticButton>
    );
  }

  return (
    <Button
      href={BRAND.primaryCta.href}
      variant={variant}
      size={size}
      onClick={onClick}
      className={className}
    >
      {label}
    </Button>
  );
}
