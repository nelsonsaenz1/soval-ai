import * as React from "react";
import { cn } from "@/lib/cn";

type Tone =
  | "default"
  | "surface"
  | "warm"
  | "sand"
  | "dark"
  | "darkest"
  | "meshCream";

const tones: Record<Tone, string> = {
  default: "bg-background",
  surface: "bg-surface",
  warm: "bg-warm",
  sand: "bg-sand",
  dark: "mesh-dark text-on-dark",
  darkest: "bg-darkest text-on-dark",
  meshCream: "mesh-cream",
};

export function Section({
  children,
  id,
  tone = "default",
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  id?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 md:py-28", tones[tone], className)}
    >
      <div className={cn("container-edge", containerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "mx-auto max-w-2xl items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className={cn("eyebrow", onDark && "eyebrow--on-dark")}>
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "font-display text-h2 text-balance",
          onDark ? "text-on-dark" : "text-heading",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-lede text-pretty",
            onDark ? "text-on-dark-secondary" : "text-secondary",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
