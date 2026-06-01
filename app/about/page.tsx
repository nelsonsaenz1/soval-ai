import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "About",
  description:
    "Nelson's Path builds and installs private AI for households that value their time and their privacy, and stays on call to keep the system working.",
};

const promises = [
  {
    title: "We do it for you.",
    body: "No setup homework, no half-finished automations. We build, install, and configure the whole system.",
  },
  {
    title: "We teach you.",
    body: "Hands-on training in plain language, so your household is comfortable from day one.",
  },
  {
    title: "We stay on call.",
    body: "Real people keep your system working and grow it as your life changes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Personal AI, installed like household infrastructure."
        description="Nelson's Path exists for people whose lives have outgrown another app: households that want the benefits of a private AI without becoming the ones who maintain it."
      />

      <Section>
        <div className="container-prose flex flex-col gap-6">
          <span className="eyebrow">Our story</span>
          {/* TODO: Replace with Nelson's real founder story, background, and credibility proof. */}
          <p className="text-lg leading-relaxed text-muted-foreground">
            Nelson&apos;s Path started from a simple observation: the most
            capable AI tools were being built for engineers, not for the busy
            households that needed them most. The people with the least time to
            configure software were the ones being asked to do the most setup.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            So we flipped the model. Instead of selling another subscription,
            we build a private AI system around your life, install it on hardware
            in your home, connect it to your real tools, teach you how to use
            it, and stay on call to keep it working. You get the outcome, your
            time back, without the technical burden.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            This is not another app to manage. It is support infrastructure for
            your life, backed by real people who answer when you need them.
          </p>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="The concierge promise"
          title="Done for you, taught to you, supported for you."
          align="center"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {promises.map((promise) => (
            <div
              key={promise.title}
              className="rounded-2xl border border-border bg-surface p-7"
            >
              <h3 className="text-lg font-semibold">{promise.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {promise.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
