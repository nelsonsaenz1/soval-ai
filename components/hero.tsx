import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { hero } from "@/lib/site-copy";

const briefItems = [
  { label: "Morning brief, ready before you wake", meta: "06:30" },
  { label: "Three replies drafted for your review", meta: "Inbox" },
  { label: "Friday travel held, awaiting your word", meta: "Travel" },
  { label: "Dinner reserved, calendar reconciled", meta: "Done" },
];

function Tick() {
  return (
    <span
      aria-hidden="true"
      className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft"
    >
      <svg viewBox="0 0 16 16" className="h-3 w-3 text-accent" fill="none">
        <path
          d="M3.5 8.5l2.5 2.5 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="container-edge grid items-center gap-14 pt-16 pb-20 md:pt-20 md:pb-28 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col items-start gap-7">
          <Badge tone="accent">{hero.kicker}</Badge>
          <h1 className="text-display font-semibold text-balance">
            {hero.headline}
          </h1>
          <p className="max-w-xl text-lede text-pretty text-muted-foreground">
            {hero.subheadline}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} size="lg" variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
          <ul className="mt-1 flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-6">
            {hero.badges.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
              >
                <Tick />
                {badge}
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="relative hidden lg:block">
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-hero">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="eyebrow">Today</span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-subtle-foreground">
                Prepared by your concierge
              </span>
            </div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {briefItems.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4 rounded-xl bg-background px-4 py-3"
                >
                  <span className="flex items-center gap-3 text-sm text-foreground">
                    <Tick />
                    {item.label}
                  </span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-subtle-foreground">
                    {item.meta}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-border px-4 py-3 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Runs on hardware in your home. Nothing leaves without approval.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
