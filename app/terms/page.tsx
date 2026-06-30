import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Plain-language terms covering services, AI outputs, ownership, payments, and responsibility.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms"
      updated="June 30, 2026"
      intro={`These plain-language terms cover working with ${BRAND.name}. They are a starting point and will be expanded as the business grows.`}
      sections={[
        {
          heading: "The services",
          body: [
            "We provide consults, personal assistant sprints, workflow audits, automation builds, and monthly retainers. Scope is confirmed with you before any paid build begins.",
            "Example outcomes shown on this site are illustrative. They are not promises of specific results, revenue, or time savings.",
          ],
        },
        {
          heading: "AI outputs and your responsibility",
          body: [
            "The assistants and workflows we build use AI. AI can make mistakes and produce imperfect or incorrect output. You remain responsible for reviewing anything the systems produce before relying on or acting on it.",
            "Nothing we deliver is legal, financial, medical, or other professional advice.",
          ],
        },
        {
          heading: "Ownership",
          body: [
            "You own what we build for you: the prompts, documentation, workflow configuration, and accounts. There is no lock-in.",
          ],
        },
        {
          heading: "Payments, refunds, and tune-ups",
          body: [
            "Unused sessions are refundable. Build sprints include a 14-day tune-up window. Retainers are month-to-month and can be cancelled any time.",
            "You pay third-party tools and software directly. We do not mark them up.",
          ],
        },
        {
          heading: "Changes",
          body: [
            `We may update these terms as the service evolves. Material changes will be reflected here with a new date. Questions? Email ${BRAND.email}.`,
          ],
        },
      ]}
    />
  );
}
