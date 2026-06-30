export type FaqItem = {
  q: string;
  a: string;
  /** Surface on the pricing page too. */
  pricing?: boolean;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Do I need to know which AI tool I want?",
    a: "No. That is part of the work. We pick the right tool stack for your situation, not the fanciest one.",
  },
  {
    q: "Is this for individuals or businesses?",
    a: "Both, with separate service paths. Personal assistants for your life, and workflow systems for your business.",
  },
  {
    q: "Do you build full software products?",
    a: "Not usually. We build practical assistants and workflows first. Larger apps are scoped separately or referred out.",
  },
  {
    q: "Will you access my email, calendar, or files?",
    a: "Only with explicit permission, and only to set up the workflows you approve. You stay in control of access.",
  },
  {
    q: "Do I own what you build?",
    a: "Yes. You own the prompts, documentation, workflow configuration, and accounts. There is no lock-in.",
    pricing: true,
  },
  {
    q: "Do you mark up software?",
    a: "No. You pay vendors directly. We do not mark up software or take referral fees.",
    pricing: true,
  },
  {
    q: "Can I cancel monthly support?",
    a: "Yes. Retainers are month-to-month, and you can cancel any time.",
    pricing: true,
  },
  {
    q: "What if AI is not the right fix?",
    a: "We will say that. The consult can result in a DIY or no-build recommendation. We would rather tell you the truth than sell you a build you do not need.",
    pricing: true,
  },
];

export const PRICING_FAQ = FAQ_ITEMS.filter((item) => item.pricing);
