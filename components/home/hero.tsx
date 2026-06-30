import { BRAND } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { ConsultButton } from "@/components/consult-button";
import { CheckBadge } from "@/components/ui/badge";
import { DashboardMockup } from "@/components/dashboard-mockup";

const TRUST = [
  "No software markup",
  "You own the setup",
  "Built around your workflow",
  "One-time + monthly options",
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden mesh-cream">
      <div className="container-edge grid items-center gap-14 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col">
          <span className="eyebrow">Personal AI assistants + small-business automation</span>

          <h1 className="mt-6 text-balance font-display text-display text-heading">
            Give yourself back the hours AI was supposed to save.
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lede text-secondary">
            We build practical AI assistants and workflows around your actual
            life or business: inboxes, calendars, notes, follow-up, documents,
            and the busywork that keeps stealing your attention.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ConsultButton source="hero" magnetic />
            <Button href={BRAND.secondaryCta.href} variant="secondary" size="lg">
              {BRAND.secondaryCta.label}
            </Button>
          </div>

          <ul className="mt-9 flex flex-wrap gap-2.5">
            {TRUST.map((item) => (
              <li key={item}>
                <CheckBadge>{item}</CheckBadge>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
