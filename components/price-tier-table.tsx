import type { PriceTier } from "@/lib/services";
import { Card } from "@/components/ui/card";
import { ConsultButton } from "@/components/consult-button";
import { cn } from "@/lib/cn";

export function PriceTierTable({
  tiers,
  source = "tier_table",
}: {
  tiers: PriceTier[];
  source?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-5",
        tiers.length === 1 ? "max-w-xl" : "md:grid-cols-2",
      )}
    >
      {tiers.map((tier, i) => (
        <Card
          key={tier.label}
          variant={i === 1 ? "surface" : "cream"}
          className={cn("flex flex-col", i === 1 && "ring-1 ring-accent/20")}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-h3 text-heading">{tier.label}</h3>
            <span className="nums whitespace-nowrap font-display text-h2 text-accent">
              {tier.price}
              {tier.cadence ? (
                <span className="ml-1 text-sm font-normal text-muted">
                  {tier.cadence === "per month" ? "/mo" : ""}
                </span>
              ) : null}
            </span>
          </div>

          {tier.cadence && tier.cadence !== "per month" ? (
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted">
              {tier.cadence}
            </p>
          ) : null}

          {tier.blurb ? (
            <p className="mt-3 text-pretty text-secondary">{tier.blurb}</p>
          ) : null}

          <ul className="mt-5 flex flex-col gap-2.5">
            {tier.points.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm text-secondary">
                <svg
                  viewBox="0 0 16 16"
                  className="mt-0.5 size-4 shrink-0 text-accent"
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
                <span className="text-pretty">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-7">
            <ConsultButton
              source={`${source}_${tier.label.toLowerCase().replace(/\s+/g, "_")}`}
              size="md"
              variant={i === 1 ? "primary" : "secondary"}
              label="Book the $79 consult"
            />
          </div>
        </Card>
      ))}
    </div>
  );
}
