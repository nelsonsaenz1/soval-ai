import * as React from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "muted" | "sand" | "contrast";

const tones: Record<Tone, string> = {
  default: "bg-background",
  muted: "bg-surface-muted",
  sand: "bg-surface-sand",
  contrast: "bg-surface-contrast text-on-contrast",
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
    <section id={id} className={cn("py-20 md:py-28", tones[tone], className)}>
      <div className={cn("container-edge", containerClassName)}>{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
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
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2 className="text-h2 font-semibold text-balance">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-lede text-pretty text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
