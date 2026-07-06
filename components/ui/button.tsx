import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/cn";

type Variant =
  | "primary"
  | "secondary"
  | "ghost"
  | "light"
  | "outlineDark"
  | "onDarkPrimary"
  | "ghostDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] " +
  "active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground shadow-soft hover:bg-accent-hover hover:shadow-lift",
  secondary:
    "bg-surface text-heading border border-hairline-strong shadow-soft hover:border-accent/40 hover:bg-warm",
  ghost: "text-heading hover:bg-warm",
  light:
    "bg-white text-heading shadow-lift hover:bg-white/90",
  outlineDark:
    "border border-on-dark-hairline text-on-dark hover:bg-white/10",
  // Signature on-dark CTA: light-blue fill, teal-navy ink.
  onDarkPrimary:
    "bg-accent-onDark text-dark shadow-soft hover:bg-accent-onDark/90 hover:shadow-lift",
  ghostDark: "text-on-dark-secondary hover:text-on-dark hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-[0.95rem]",
  lg: "h-[3.25rem] px-7 text-[1.05rem]",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type LinkProps = SharedProps & {
  href: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  onClick?: () => void;
};

type NativeProps = SharedProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: LinkProps | NativeProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest as Omit<LinkProps, keyof SharedProps>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  const nativeRest = rest as Omit<NativeProps, keyof SharedProps | "href">;
  return (
    <button className={classes} {...nativeRest}>
      {children}
    </button>
  );
}
