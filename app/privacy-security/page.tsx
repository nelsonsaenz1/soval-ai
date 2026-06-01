import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { CtaBand } from "@/components/cta-band";
import { boundaries } from "@/lib/site-copy";

export const metadata: Metadata = {
  title: "Privacy & security",
  description:
    "Local-first by design. Your system lives on hardware in your home, your household memory stays private, and you authorize every integration. It assists; you decide.",
};

const principles = [
  {
    title: "Local-first by design.",
    body: "Your system lives on hardware installed in your home. Your household memory is never left in an anonymous cloud dashboard.",
  },
  {
    title: "You approve every integration.",
    body: "Nothing connects to your accounts without your explicit say-so. Cloud APIs are used only where you've approved them.",
  },
  {
    title: "It assists. You decide.",
    body: "It prepares, drafts, and organizes. The decisions, especially the consequential ones, stay with you.",
  },
  {
    title: "Your credentials stay yours.",
    body: "You enter your own sensitive credentials. We never ask for passwords in chat, and we don't store them for you.",
  },
];

export default function PrivacySecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy & security"
        title="Local-first by design. Private by default."
        description="The most capable personal AI should also be the most private. Your system lives in your home, your memory stays with you, and you stay in control."
      />

      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="rounded-2xl border border-border bg-surface p-7"
            >
              <h2 className="text-lg font-semibold">{principle.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {principle.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <SectionHeader
            eyebrow="Clear boundaries"
            title="What your system will never do."
            description="Powerful does not mean unaccountable. We set firm limits so the system is something you can fully trust in your home."
          />
          <ul className="flex flex-col gap-3 self-center">
            {boundaries.map((boundary) => (
              <li
                key={boundary}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface px-5 py-4 text-sm text-foreground"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="mt-0.5 h-4.5 w-4.5 shrink-0 text-accent"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="7.25"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M5.5 5.5l9 9"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                {boundary}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="container-prose flex flex-col items-center gap-4 rounded-2xl border border-accent-border bg-accent-soft p-8 text-center sm:p-12">
          <span className="eyebrow">In plain terms</span>
          <p className="text-xl font-medium leading-relaxed text-foreground">
            Your household memory lives on your hardware, you approve every
            connection, and nothing irreversible happens without you. It
            assists; you decide.
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
