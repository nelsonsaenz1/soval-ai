import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { TierCard } from "@/components/tier-card";
import { CtaBand } from "@/components/cta-band";
import { pricingNote, tiers } from "@/lib/site-copy";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three consultative tiers: Essentials, Concierge, and Estate. Final pricing depends on your household, hardware, integrations, and training, and is confirmed on a discovery call.",
};

const factors = [
  {
    title: "Household complexity",
    body: "How many people, homes, and moving pieces the system needs to coordinate.",
  },
  {
    title: "Hardware",
    body: "The home hardware your build runs on, including any redundancy for serious setups.",
  },
  {
    title: "Integrations",
    body: "How many tools and services we connect, and how deeply they need to work together.",
  },
  {
    title: "Privacy needs",
    body: "How private and local-first you want the build, and the controls that come with it.",
  },
  {
    title: "Training",
    body: "How much hands-on training and ongoing tutoring you and your household want.",
  },
  {
    title: "Support cadence",
    body: "How proactive and high-touch you'd like your ongoing concierge support to be.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="A build that fits your household, not a checkout cart."
        description="Nelson's Path is a consultative service, so the right setup depends on your life. Choose a starting point below; we confirm the details on your discovery call."
        primaryCta={{ label: "Book a Discovery Call", href: "/contact" }}
        secondaryCta={{ label: "Take the Agent Fit Quiz", href: "/quiz" }}
      />

      <Section>
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          {pricingNote}
        </p>
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="What shapes your price"
          title="Six things we confirm before we quote."
          description="We'd rather get the build right than sell you a fixed package. These are the factors we talk through on your call."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {factors.map((factor) => (
            <div
              key={factor.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="text-base font-semibold">{factor.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {factor.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Not sure which tier fits?"
        body="Take the two-minute Agent Fit Quiz for a personalized recommendation, then bring it to your discovery call."
      />
    </>
  );
}
