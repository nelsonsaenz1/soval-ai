import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Hero } from "@/components/home/hero";
import { PathChooser } from "@/components/home/path-chooser";
import { FounderNote } from "@/components/home/founder-note";
import { ServiceCard } from "@/components/service-card";
import { MidCta } from "@/components/mid-cta";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";
import { ConsultButton } from "@/components/consult-button";
import { SERVICES } from "@/lib/services";

const PROBLEMS = [
  {
    title: "Your personal admin keeps expanding.",
    body: "Email, scheduling, errands, travel, school, notes, reminders, and research keep piling up.",
  },
  {
    title: "Your business leaks time in repeatable places.",
    body: "Forms, follow-ups, quotes, support emails, reporting, and handoffs eat hours every week.",
  },
  {
    title: "Generic AI advice does not survive contact with real life.",
    body: "You need a system built around your accounts, voice, clients, routines, and standards.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Map the bottleneck.",
    body: "We learn what is slow, repetitive, expensive, or mentally draining.",
  },
  {
    n: "02",
    title: "Design the simplest useful system.",
    body: "We choose the right tool stack, not the fanciest one.",
  },
  {
    n: "03",
    title: "Build with your real examples.",
    body: "Prompts, assistants, workflows, and automations are tested against your actual work.",
  },
  {
    n: "04",
    title: "Hand it over or keep improving.",
    body: "You can own it outright or keep us on monthly.",
  },
];

const PRICING_PREVIEW = [
  { price: "$79", name: "AI Clarity Consult", note: "45 minutes + one-page AI Leverage Map", href: "/book" },
  { price: "$299+", name: "Personal Assistant Sprint", note: "Build your first real assistant", href: "/services/personal-ai-assistant" },
  { price: "$249+", name: "Business Workflow Audit", note: "Find the bottlenecks before building", href: "/services/business-workflow-audit" },
  { price: "$1,500", name: "Automation Build Sprint", note: "Scoped workflow builds", href: "/services/automation-build-sprint" },
  { price: "$299/mo", name: "AI Operating System", note: "Ongoing optimization", href: "/services/ai-operating-system" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Problem */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="The real AI problem"
          title="The tools are powerful. The setup is the bottleneck."
          description="Most people do not need another AI app. They need someone to translate their messy routines into a system that actually works. The value is not the prompt. It is knowing what to automate, what to leave human, and how to make the workflow easy enough to use every week."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <Card variant="cream" className="h-full">
                <h3 className="font-display text-h3 text-heading">{p.title}</h3>
                <p className="mt-3 text-pretty text-secondary">{p.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Path chooser */}
      <Section tone="default">
        <SectionHeader
          eyebrow="Choose your path"
          title="Choose the kind of time you want back."
          description="Two places AI creates immediate leverage. Pick where you feel the drain, and we will meet you there."
        />
        <div className="mt-12">
          <PathChooser />
        </div>
      </Section>

      {/* Services preview */}
      <Section tone="warm">
        <SectionHeader
          eyebrow="Services"
          title="Five focused offers. No bloated agency menu."
          description="We focus on the two places AI can create immediate leverage, with a clear entry point and an ongoing option. That is the whole menu."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 80}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
          <Card
            variant="glassCream"
            className="flex h-full flex-col justify-center gap-4 border-accent/15 bg-accent-light/50"
          >
            <h3 className="font-display text-h3 text-heading">
              See the full breakdown.
            </h3>
            <p className="text-pretty text-secondary">
              Pricing, deliverables, and exactly who each offer is for.
            </p>
            <div>
              <Button href="/services" variant="secondary" size="md">
                Compare all services
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      {/* Mid-page CTA */}
      <Section tone="default">
        <MidCta source="home_mid" />
      </Section>

      {/* How it works */}
      <Section tone="surface">
        <SectionHeader
          eyebrow="How it works"
          title="Simple process. Real deliverables."
          description="No theater, no dashboards nobody uses. We build only what will be used, then test it against your real work."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.n} className="bg-surface p-7">
              <span className="nums text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Step {step.n}
              </span>
              <h3 className="mt-4 font-display text-h3 text-heading">
                {step.title}
              </h3>
              <p className="mt-2 text-pretty text-sm text-secondary">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pricing preview */}
      <Section tone="sand">
        <SectionHeader
          eyebrow="Pricing"
          title="Start cheaper than a traditional AI assessment."
          description="Clear, productized pricing. You pay tools directly, with no software markup. Final scope is confirmed before any build."
        />
        <div className="mt-12 overflow-hidden rounded-2xl border border-hairline bg-surface shadow-soft">
          <ul className="divide-y divide-hairline">
            {PRICING_PREVIEW.map((row) => (
              <li key={row.name}>
                <Link
                  href={row.href}
                  className="flex flex-col gap-1 px-6 py-5 transition-colors duration-150 hover:bg-warm sm:flex-row sm:items-center sm:gap-6"
                >
                  <span className="nums w-24 shrink-0 font-display text-h3 text-accent">
                    {row.price}
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium text-heading">
                      {row.name}
                    </span>
                    <span className="block text-sm text-secondary">
                      {row.note}
                    </span>
                  </span>
                  <span className="hidden text-accent sm:block" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ConsultButton source="home_pricing" size="md" />
          <Button href="/pricing" variant="secondary" size="md">
            See full pricing
          </Button>
        </div>
      </Section>

      {/* Founder note */}
      <Section tone="default">
        <FounderNote />
      </Section>

      <CtaBand />
    </>
  );
}
