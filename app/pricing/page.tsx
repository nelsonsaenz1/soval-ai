import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConsultButton } from "@/components/consult-button";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { PRICING_FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Clear, productized pricing. One-time builds from $79, monthly retainers from $299. You pay tools directly with no software markup.",
};

type Row = { name: string; detail: string; price: string; href: string };

const ONE_TIME: Row[] = [
  { name: "AI Clarity Consult", detail: "45-minute session and a one-page AI Leverage Map within 24 hours", price: "$79", href: "/book" },
  { name: "Personal Assistant Sprint · Starter", detail: "One core assistant, a 90-minute working session, and a prompt library", price: "$299", href: "/services/personal-ai-assistant" },
  { name: "Personal Assistant Sprint · Full Build", detail: "3 to 5 assistants, two build sessions, and a 14-day tune-up", price: "$799", href: "/services/personal-ai-assistant" },
  { name: "Business Workflow Audit · Lite", detail: "One workflow reviewed, with a 5 to 7 page action plan", price: "$249", href: "/services/business-workflow-audit" },
  { name: "Business Workflow Audit · Deep Dive", detail: "Full process mapped, ROI model, build vs buy recommendation", price: "$749", href: "/services/business-workflow-audit" },
  { name: "Automation Build Sprint", detail: "One process built, tested on real examples, documented, handed over", price: "From $1,500", href: "/services/automation-build-sprint" },
];

const MONTHLY: Row[] = [
  { name: "Personal OS", detail: "Monthly optimization call, assistant tuning, troubleshooting, and a what-to-automate-next plan", price: "$299", href: "/services/ai-operating-system" },
  { name: "Business OS", detail: "Monthly ops review, new automations scoped, KPI tracking, and office hours", price: "$999", href: "/services/ai-operating-system" },
];

function PricingTable({ rows, monthly = false }: { rows: Row[]; monthly?: boolean }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-soft">
      <ul className="divide-y divide-hairline">
        {rows.map((row) => (
          <li key={row.name}>
            <Link
              href={row.href}
              className="flex flex-col gap-2 px-6 py-5 transition-colors duration-150 hover:bg-warm sm:flex-row sm:items-center sm:gap-6"
            >
              <span className="flex-1">
                <span className="block font-medium text-heading">{row.name}</span>
                <span className="mt-0.5 block text-sm text-secondary">{row.detail}</span>
              </span>
              <span className="nums shrink-0 font-display text-h3 text-accent">
                {row.price}
                {monthly ? <span className="text-sm font-normal text-muted">/mo</span> : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="One-time builds when you want ownership. Monthly support when you want momentum."
        description="Start cheaper than a traditional AI assessment. Final scope is confirmed before any build, and the $79 consult is credited toward any paid package booked within 14 days."
        actions={
          <>
            <ConsultButton source="pricing_hero" size="lg" />
            <Button href="/quiz" variant="secondary" size="lg">
              Take the quiz
            </Button>
          </>
        }
      />

      <Section tone="surface">
        <SectionHeader
          eyebrow="One-time"
          title="One-time builds you own outright."
          description="Pay once, keep everything. Prompts, documentation, configuration, and accounts are yours."
        />
        <div className="mt-10">
          <PricingTable rows={ONE_TIME} />
        </div>
      </Section>

      <Section tone="warm">
        <SectionHeader
          eyebrow="Monthly"
          title="Monthly support that keeps systems improving."
          description="Month-to-month, no lock-in. Cancel any time."
        />
        <div className="mt-10">
          <PricingTable rows={MONTHLY} monthly />
        </div>
      </Section>

      <Section tone="default">
        <div className="grid gap-5 md:grid-cols-2">
          <Card variant="surface">
            <h3 className="font-display text-h3 text-heading">Tool-cost policy</h3>
            <p className="mt-3 text-pretty text-secondary">
              You pay tools directly. We do not mark up software or take referral
              fees. Our incentive is your leverage, not a kickback.
            </p>
          </Card>
          <Card variant="surface">
            <h3 className="font-display text-h3 text-heading">Refund and tune-up policy</h3>
            <p className="mt-3 text-pretty text-secondary">
              Unused sessions are refundable. Build sprints include a 14-day
              tune-up window. Retainers are month-to-month, with no lock-in.
            </p>
          </Card>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeader
          eyebrow="Pricing FAQ"
          title="The questions people ask before paying."
        />
        <div className="mt-10 max-w-3xl">
          <FaqList items={PRICING_FAQ} />
        </div>
        <p className="mt-6 text-sm text-secondary">
          More questions?{" "}
          <Link href="/faq" className="font-medium text-accent hover:underline">
            Read the full FAQ
          </Link>
          .
        </p>
      </Section>

      <CtaBand source="pricing" />
    </>
  );
}
