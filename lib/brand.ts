/**
 * Single source of truth for brand identity, contact, and primary CTAs.
 *
 * The company name is intentionally undecided. Change `BRAND.name` here once and
 * it updates everywhere it appears (nav, footer, metadata, copy). Nothing else
 * in the codebase hard-codes the name.
 */

export const BRAND = {
  name: "Soval AI",
  domain: "soval.ai",
  url: "https://soval.ai",

  oneLiner:
    "Personal AI assistants and small-business automations that give you your life, time, and attention back.",
  promise: "Less busywork. Better decisions. More time back.",
  metaDescription:
    "Done-for-you personal AI assistants and small-business workflow automation. We build practical systems around your real life and work, so AI actually gives you time back.",

  // Contact + booking. Leave schedulerEmbedUrl empty to show the placeholder.
  email: "hello@soval.ai",
  consultPrice: "$79",
  schedulerEmbedUrl: "",

  // Primary + secondary calls to action (used in nav, hero, bands, final CTAs).
  primaryCta: { label: "Book the $79 consult", href: "/book" },
  navCta: { label: "Book $79 consult", href: "/book" },
  secondaryCta: { label: "See services", href: "/services" },
  quizCta: { label: "Take the quiz", href: "/quiz" },
  leadMagnet: { label: "AI Time Audit Checklist", href: "/book" },

  // Header navigation.
  nav: [
    { label: "Personal AI", href: "/services/personal-ai-assistant" },
    { label: "Business AI", href: "/services/business-workflow-audit" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Quiz", href: "/quiz" },
    { label: "About", href: "/about" },
    { label: "FAQ", href: "/faq" },
  ],

  // Footer navigation, grouped.
  footerNav: [
    {
      title: "Services",
      links: [
        { label: "Personal AI Assistant", href: "/services/personal-ai-assistant" },
        { label: "Business Workflow Audit", href: "/services/business-workflow-audit" },
        { label: "Automation Build Sprint", href: "/services/automation-build-sprint" },
        { label: "AI Operating System", href: "/services/ai-operating-system" },
        { label: "All services", href: "/services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Pricing", href: "/pricing" },
        { label: "Take the quiz", href: "/quiz" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Get started",
      links: [
        { label: "Book the $79 consult", href: "/book" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],

  disclaimer:
    "AI outputs can be imperfect. You remain responsible for reviewing anything produced by the systems we build. Example outcomes shown are illustrative, not guarantees.",
} as const;

export type Brand = typeof BRAND;
