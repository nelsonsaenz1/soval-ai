import { Button } from "@/components/ui/button";

type Cta = { label: string; href: string };

export function PageHero({
  eyebrow,
  title,
  description,
  primaryCta = { label: "Take the Agent Fit Quiz", href: "/quiz" },
  secondaryCta = { label: "Book a Discovery Call", href: "/contact" },
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta?: Cta | null;
  secondaryCta?: Cta | null;
}) {
  return (
    <section className="border-b border-border bg-background">
      <div className="container-edge py-16 md:py-24">
        <div className="flex max-w-3xl flex-col gap-5">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="text-h1 font-semibold text-balance">{title}</h1>
          <p className="max-w-2xl text-lede text-pretty text-muted-foreground">
            {description}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              {primaryCta ? (
                <Button href={primaryCta.href} size="lg">
                  {primaryCta.label}
                </Button>
              ) : null}
              {secondaryCta ? (
                <Button href={secondaryCta.href} size="lg" variant="secondary">
                  {secondaryCta.label}
                </Button>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
