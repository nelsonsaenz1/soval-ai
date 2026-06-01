import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import type { Tier } from "@/lib/site-copy";

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5l2.5 2.5 6-6"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TierCard({
  tier,
  highlight,
  recommended,
}: {
  tier: Tier;
  highlight?: boolean;
  recommended?: boolean;
}) {
  const featured = highlight ?? tier.featured;
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-2xl border bg-surface p-7",
        featured
          ? "border-accent-border shadow-raise ring-1 ring-accent-border lg:-my-2 lg:pb-9 lg:pt-9"
          : "border-border shadow-soft",
      )}
    >
      {(featured || recommended) && (
        <span className="absolute -top-3 left-7 inline-flex items-center rounded-pill border border-accent-border bg-accent-soft px-3 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.1em] text-accent-strong">
          {recommended ? "Recommended for you" : "Most chosen"}
        </span>
      )}

      <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-subtle-foreground">
        {tier.audience}
      </span>
      <h3 className="mt-3 text-2xl font-semibold tracking-tight">{tier.name}</h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-foreground">
        {tier.blurb}
      </p>

      <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-border pt-6">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-sm text-foreground/90">
            <Check />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <Button
          href={`/contact?tier=${tier.id}`}
          variant={featured ? "primary" : "secondary"}
          className="w-full"
        >
          {tier.cta}
        </Button>
      </div>
    </div>
  );
}
