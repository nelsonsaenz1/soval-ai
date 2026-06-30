import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "A plain-language privacy summary: what we collect, how we use it, and how we handle access to your tools.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      updated="June 30, 2026"
      intro={`This is a plain-language summary of how ${BRAND.name} handles your information. It is written to be readable, not to bury anything in legalese.`}
      sections={[
        {
          heading: "What we collect",
          body: [
            "When you book a consult, take the quiz, or fill out a form, we collect what you give us: your name, email, whether you are focused on personal or business needs, the bottleneck you describe, the tools you use, and any notes.",
            "We do not collect more than we need to prepare for and follow up on your consult.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "We use your details to schedule the consult, prepare your one-page AI Leverage Map, follow up, and recommend the right next step. That is it.",
          ],
        },
        {
          heading: "What we do not do",
          body: [
            "We do not sell your information. We do not mark up software or take referral fees on tools we recommend.",
          ],
        },
        {
          heading: "Access to your tools",
          body: [
            "We only access your email, calendar, files, or accounts with your explicit permission, and only to set up the workflows you approve. You stay in control, and you can revoke access at any time.",
          ],
        },
        {
          heading: "AI outputs",
          body: [
            "The systems we build use AI, and AI outputs can be imperfect. You remain responsible for reviewing anything produced before relying on it.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            `You can ask us to update or delete your information at any time. Email ${BRAND.email} and we will take care of it.`,
          ],
        },
      ]}
    />
  );
}
