import { Hero } from "@/components/hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { AgentCard } from "@/components/agent-card";
import { TierCard } from "@/components/tier-card";
import { CtaBand } from "@/components/cta-band";
import { Button } from "@/components/ui/button";
import { agents, steps, tiers, trustPoints } from "@/lib/site-copy";

const timeBack = [
  "Calendar & scheduling",
  "Inbox & correspondence",
  "Travel & itineraries",
  "Household & maintenance",
  "Family logistics",
  "Health & routines",
  "Reminders & follow-through",
  "Research & briefings",
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 1. The mandate — split */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-5">
            <span className="eyebrow">The mandate</span>
            <h2 className="text-h2 font-semibold text-balance">
              Your life has too many moving pieces for another app.
            </h2>
            <p className="text-lede text-pretty text-muted-foreground">
              Nelson&apos;s Path is not software you manage. It is support
              infrastructure for your household: a private system that quietly
              absorbs the work filling your week, and returns your time.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {timeBack.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 bg-surface px-5 py-4 text-sm text-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 2. Process — connected stepper */}
      <Section tone="muted">
        <SectionHeader
          eyebrow="The engagement"
          title="A white-glove process. We handle the rest."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-3 bg-surface p-7">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] tabular-nums text-accent-strong">
                Step {step.number}
              </span>
              <h3 className="text-h3 font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/how-it-works" variant="secondary">
            See the full process
          </Button>
        </div>
      </Section>

      {/* 3. Capabilities — asymmetric bento */}
      <Section>
        <SectionHeader
          eyebrow="Capabilities"
          title="A staff of specialists, working quietly in the background."
          description="Begin with a single focus and grow from there. Each specialist is taught your preferences and works through the tools you already use."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <AgentCard agent={agents[0]} featured className="md:col-span-2" />
          {agents.slice(1, 3).map((agent) => (
            <AgentCard key={agent.name} agent={agent} />
          ))}
          {agents.slice(3).map((agent) => (
            <AgentCard key={agent.name} agent={agent} />
          ))}
        </div>
        <div className="mt-10">
          <Button href="/agent-capabilities" variant="secondary">
            Explore the full suite
          </Button>
        </div>
      </Section>

      {/* 4. Privacy — split with divided list */}
      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <span className="eyebrow">Privacy</span>
            <h2 className="text-h2 font-semibold text-balance">
              Your data never leaves your home.
            </h2>
            <p className="text-lede text-pretty text-muted-foreground">
              Your system and its memory run on dedicated hardware you own.
              Cloud services are used only where you authorize them, and never
              by default.
            </p>
            <div className="mt-1">
              <Button href="/privacy-security" variant="secondary">
                How we keep it private
              </Button>
            </div>
          </div>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
            {trustPoints.map((point) => (
              <li key={point.title} className="flex flex-col gap-1.5 p-6 sm:p-7">
                <h3 className="text-base font-semibold">{point.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {point.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 5. Quiz teaser */}
      <Section>
        <div className="overflow-hidden rounded-2xl border border-accent-border bg-accent-soft">
          <div className="grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-5">
              <span className="eyebrow">Agent Fit Quiz</span>
              <h2 className="text-h2 font-semibold text-balance">
                See how much of your week a private AI could return.
              </h2>
              <p className="max-w-xl text-lede text-pretty text-muted-foreground">
                A two-minute assessment that ends with your Agent Fit Score and
                a tailored build recommendation.
              </p>
              <div className="mt-1">
                <Button href="/quiz" size="lg">
                  Take the Agent Fit Quiz
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="ml-auto w-full max-w-xs rounded-2xl border border-border bg-surface p-7 shadow-lift">
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-subtle-foreground">
                  Sample result
                </span>
                <p className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-5xl font-semibold tabular-nums tracking-tight">
                    87
                  </span>
                  <span className="font-mono text-sm text-subtle-foreground">
                    / 100
                  </span>
                </p>
                <p className="mt-1 text-sm font-medium text-accent-strong">
                  Excellent Fit
                </p>
                <p className="mt-4 border-t border-border pt-4 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-subtle-foreground">
                  Recommended · Concierge
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 6. Pull quote — human-backed */}
      <Section tone="muted">
        <figure className="container-prose flex flex-col items-center gap-7 text-center">
          <span className="eyebrow eyebrow--plain">Human-backed</span>
          <blockquote className="text-h2 font-medium text-balance">
            &ldquo;This is not a chatbot helpdesk. Real people install your
            system, train your household, and stay on call as your life
            changes.&rdquo;
          </blockquote>
          <figcaption className="font-mono text-xs uppercase tracking-[0.08em] text-subtle-foreground">
            The Nelson&apos;s Path concierge promise
          </figcaption>
        </figure>
      </Section>

      {/* 7. Engagements */}
      <Section>
        <SectionHeader
          eyebrow="Engagements"
          title="Three ways to begin."
          description="Each is confirmed on your discovery call. The right build depends on your household, hardware, and integrations."
        />
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/pricing" variant="secondary">
            Compare what&apos;s included
          </Button>
        </div>
      </Section>

      {/* 8. CTA — the single inverted surface */}
      <CtaBand />
    </>
  );
}
