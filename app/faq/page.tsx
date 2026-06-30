import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ConsultButton } from "@/components/consult-button";
import { FaqList } from "@/components/faq-list";
import { CtaBand } from "@/components/cta-band";
import { FAQ_ITEMS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Common questions about working together: tool choice, ownership, access, software markups, monthly support, and what happens if AI is not the right fix.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Straight answers before you book."
        description="If your question is not here, the $79 consult is the fastest way to get a specific answer for your situation."
        actions={
          <>
            <ConsultButton source="faq_hero" size="lg" />
            <Button href="/services" variant="secondary" size="lg">
              See services
            </Button>
          </>
        }
      />

      <Section tone="surface">
        <div className="mx-auto max-w-3xl">
          <FaqList items={FAQ_ITEMS} />
        </div>
      </Section>

      <CtaBand source="faq" />
    </>
  );
}
