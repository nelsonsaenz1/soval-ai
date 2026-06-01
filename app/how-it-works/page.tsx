import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Consultation, design and installation, training, and ongoing stewardship. A done-for-you process for getting your personal AI running at home.",
};

const phases = [
  {
    number: "01",
    title: "Consultation",
    body: "We start with a conversation, not a questionnaire. We learn your household, your work, the tools you already use, and where your time disappears. You leave the call knowing exactly what we would build first.",
    points: [
      "A private discovery call",
      "A clear, prioritized build plan",
      "Honest guidance on where to begin",
    ],
  },
  {
    number: "02",
    title: "Design & installation",
    body: "We engineer your system and set up a private memory vault on dedicated hardware in your home. We connect only the services you authorize, configure each specialist, and test everything before you touch it.",
    points: [
      "Local-first setup on home hardware",
      "Only the integrations you authorize",
      "Specialists tuned to your preferences",
    ],
  },
  {
    number: "03",
    title: "Training",
    body: "We sit with you and your household and teach the system hands-on: how to ask, what it can do, and how to make it yours. You receive a plain-language reference, not a manual.",
    points: [
      "Hands-on training for the household",
      "A simple, personalized reference",
      "Real examples from your own life",
    ],
  },
  {
    number: "04",
    title: "Stewardship",
    body: "Your concierge keeps the system working and grows it as your life changes: new tools, new routines, new people. This is ongoing infrastructure, not a one-time install.",
    points: [
      "Ongoing concierge support",
      "Proactive monitoring and refinement",
      "Regular expansion sessions",
    ],
  },
];

function Tick() {
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

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        title="Consult. Build. Train. Steward."
        description="A white-glove process that takes your personal AI from idea to installed, and keeps it working long after."
      />

      <Section>
        <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className="grid gap-6 p-7 sm:p-9 md:grid-cols-[200px_1fr] md:gap-10"
            >
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] tabular-nums text-accent-strong">
                  Phase {phase.number}
                </span>
                <h2 className="text-h3 font-semibold">{phase.title}</h2>
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-[0.975rem] leading-relaxed text-muted-foreground">
                  {phase.body}
                </p>
                <ul className="grid gap-2.5 sm:grid-cols-3">
                  {phase.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <Tick />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="What to expect"
          title="Weeks, not months. And never on your own."
          description="Most households are running quickly, starting with one focus and expanding from there. You are never handed a system and left to work it out alone."
          align="center"
        />
      </Section>

      <CtaBand />
    </>
  );
}
