import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConsultButton } from "@/components/consult-button";
import { MidCta } from "@/components/mid-cta";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "About",
  description:
    "Built for people who want practical AI, not AI theater. We help people and small businesses turn AI into actual time back, building only what gets used.",
};

const VALUES = [
  {
    title: "Honest scoping",
    body: "We recommend the smallest thing that will actually help, even when it is less than you expected to spend.",
  },
  {
    title: "No tool markups",
    body: "You pay vendors directly. Our incentive is your leverage, not a referral fee.",
  },
  {
    title: "Ownership by default",
    body: "You keep the prompts, documentation, configuration, and accounts. There is no lock-in.",
  },
  {
    title: "Simpler beats shinier",
    body: "The fanciest stack rarely wins. The one you will use every week does.",
  },
  {
    title: "Human judgment stays in the loop",
    body: "We automate the busywork and leave the decisions that need a person to a person.",
  },
];

const ANTI = [
  "We do not sell AI magic.",
  "We do not force you into one platform.",
  "We do not mark up software tools.",
  "We do not automate broken processes before simplifying them.",
  "We do not build dashboards nobody will use.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Built for people who want practical AI, not AI theater."
        description="Most AI advice is either too abstract or too bloated. The goal here is simple: help people and small businesses turn AI into actual time back."
        actions={
          <>
            <ConsultButton source="about_hero" size="lg" />
            <Button href="/services" variant="secondary" size="lg">
              See services
            </Button>
          </>
        }
      />

      <Section tone="surface">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_2fr] lg:gap-16">
          <h2 className="font-display text-h2 text-heading">Why this exists</h2>
          <div className="flex max-w-2xl flex-col gap-5 text-pretty text-lede text-secondary">
            <p>
              The work starts with real routines, real bottlenecks, and real
              examples, then builds only what will be used. No generic AI
              education, no nine-service agency menu, no dashboards nobody opens.
            </p>
            <p>
              {BRAND.name} is personal. The founder discovered a passion for
              helping people improve their lives and businesses with agentic AI,
              and wants to share it with the world one client at a time, building
              real relationships and meaningful connections along the way.
            </p>
            <p className="text-base text-muted">
              The founder&apos;s story will be shared as the company grows.
              Example outcomes on this site are illustrative, not guarantees.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="warm">
        <SectionHeader
          eyebrow="Values"
          title="What we optimize for."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <Card key={v.title} variant="surface">
              <h3 className="font-display text-h3 text-heading">{v.title}</h3>
              <p className="mt-2 text-pretty text-secondary">{v.body}</p>
            </Card>
          ))}
          <Card variant="glassDark" className="mesh-dark flex flex-col justify-center">
            <h3 className="font-display text-h3 text-on-dark">What we do not do</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {ANTI.map((item) => (
                <li key={item} className="text-sm text-on-dark-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section tone="default">
        <MidCta source="about_mid" />
      </Section>

      <CtaBand source="about" />
    </>
  );
}
