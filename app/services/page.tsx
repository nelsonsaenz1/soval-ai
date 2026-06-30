import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ServiceCard } from "@/components/service-card";
import { ConsultButton } from "@/components/consult-button";
import { CtaBand } from "@/components/cta-band";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Five focused AI services: a $79 clarity consult, personal assistant sprints, a small-business workflow audit, automation builds, and a monthly operating-system retainer.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="AI services for people and businesses that want time back."
        description="This is intentionally not a nine-service agency menu. We focus on the two places AI can create immediate leverage: personal assistants for your life, and workflow systems for your business."
        actions={
          <>
            <ConsultButton source="services_hero" size="lg" />
            <Button href="/quiz" variant="secondary" size="lg">
              Take the quiz
            </Button>
          </>
        }
      />

      <Section tone="surface">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          {SERVICES.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 2) * 80}>
              <ServiceCard service={service} detailed />
            </Reveal>
          ))}

          <Card
            variant="cream"
            className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="max-w-xl">
              <h3 className="font-display text-h3 text-heading">
                Still deciding where to start?
              </h3>
              <p className="mt-2 text-pretty text-secondary">
                Take the 2-minute quiz, or book the $79 consult and we will point
                you to the right one, honestly.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ConsultButton source="services_footer" size="md" />
              <Button href="/quiz" variant="secondary" size="md">
                Take the quiz
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <CtaBand source="services" />
    </>
  );
}
