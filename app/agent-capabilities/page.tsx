import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { AgentCard } from "@/components/agent-card";
import { Reveal } from "@/components/ui/reveal";
import { CtaBand } from "@/components/cta-band";
import { agents } from "@/lib/site-copy";

export const metadata: Metadata = {
  title: "Agent capabilities",
  description:
    "What your personal AI can do: a chief of staff, plus specialists for travel, household, family, health, and research, taught your preferences and your tools.",
};

export default function AgentCapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Agent capabilities"
        title="A private chief of staff, plus a team of specialists."
        description="Start with one focus and grow over time. Every agent learns your preferences, respects your boundaries, and works through the tools you already use."
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {agents.map((agent, i) => (
            <Reveal key={agent.name} delay={(i % 2) * 70}>
              <AgentCard agent={agent} detailed />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="How it stays useful"
          title="Taught once. Working forever, and growing with you."
          description="Your agent remembers what matters to your household and gets more capable as you connect more of your life. New routines and tools are added during your concierge sessions."
          align="center"
        />
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            {
              title: "Private memory",
              body: "Knows your people, preferences, and routines, stored at home.",
            },
            {
              title: "Your tools",
              body: "Works through the apps and services you already rely on.",
            },
            {
              title: "Always expanding",
              body: "New capabilities added as your life changes, by your concierge.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
