/**
 * The five core offers. This is the single source of truth for pricing,
 * deliverables, fit, and page content. Pricing is real (per directive) and must
 * match /pricing exactly. No fake proof, no guaranteed outcomes — example
 * outcomes only.
 */

export type PriceTier = {
  label: string;
  price: string;
  cadence?: string;
  blurb?: string;
  points: string[];
};

export type ServiceSection = {
  title: string;
  body?: string;
  items?: string[];
};

export type Service = {
  slug: string;
  /** Where the service's primary link points (dedicated page or booking). */
  href: string;
  hasPage: boolean;
  eyebrow: string;
  name: string;
  /** Short price label for cards, e.g. "$299 / $799". */
  priceLabel: string;
  priceNote?: string;
  tagline: string;
  /** One-paragraph summary for the hub + preview. */
  summary: string;
  audience: string;
  cta: { label: string; href: string };
  bestFit: string[];
  notFit: string[];
  /** Sub-tiers shown as a comparison (starter/full, lite/deep dive, etc.). */
  tiers?: PriceTier[];
  /** Long-form sections for the dedicated service page. */
  detail?: {
    headline: string;
    subheadline: string;
    sections: ServiceSection[];
  };
};

export const SERVICES: Service[] = [
  {
    slug: "ai-clarity-consult",
    href: "/book",
    hasPage: false,
    eyebrow: "Start here",
    name: "AI Clarity Consult",
    priceLabel: "$79",
    priceNote: "one-time · 45 minutes · credited toward any paid package booked within 14 days",
    tagline: "Find the highest-leverage place AI can give you time back.",
    summary:
      "A 45-minute working session and a one-page AI Leverage Map within 24 hours. Bring the messy part of your life or business. We will find the highest-leverage place AI can give you time back, or tell you honestly if it is not worth paying for yet.",
    audience:
      "Individuals, founders, solopreneurs, and small-business owners who are curious but do not know where to start.",
    cta: { label: "Book the $79 consult", href: "/book" },
    bestFit: [
      "You are curious about AI but unsure where it actually helps you",
      "You want a clear, prioritized next step before spending more",
      "You would rather be told the honest answer than be upsold",
    ],
    notFit: [
      "You already know the exact build you want (start with a sprint or audit)",
      "You want someone to manage your whole business for you",
    ],
    tiers: [
      {
        label: "AI Clarity Consult",
        price: "$79",
        cadence: "one-time",
        points: [
          "45-minute Zoom or screen-share",
          "Pre-call intake form",
          "One-page AI Leverage Map delivered within 24 hours",
          "Honest recommendation: do nothing, DIY setup, Personal Assistant Sprint, Business Workflow Audit, or Automation Build Sprint",
        ],
      },
    ],
  },
  {
    slug: "personal-ai-assistant",
    href: "/services/personal-ai-assistant",
    hasPage: true,
    eyebrow: "Personal",
    name: "Personal AI Assistant Sprint",
    priceLabel: "$299 / $799",
    priceNote: "one-time · Starter Sprint or Full Build Sprint",
    tagline: "A personal AI assistant built around the way you actually live.",
    summary:
      "Not a generic chatbot. A personalized operating layer for your calendar, notes, inbox, research, tasks, travel, study, and life admin. We audit how you actually work, then build assistants you will use every week.",
    audience:
      "Busy professionals, students, executives, founders, and affluent households who want a personalized assistant but do not want to become an AI hobbyist.",
    cta: { label: "Build my assistant", href: "/book" },
    bestFit: [
      "Your personal admin keeps expanding and you want it handled",
      "You use a calendar, inbox, and notes, and want them working together",
      "You want a system you own, not another app to babysit",
    ],
    notFit: [
      "You want to automate a business process (start with the Workflow Audit)",
      "You enjoy tinkering and want to build it all yourself",
    ],
    tiers: [
      {
        label: "Starter Sprint",
        price: "$299",
        cadence: "one-time",
        blurb: "One core assistant, built with you in a single working session.",
        points: [
          "90-minute live working session",
          "Personal workflow audit: calendar, email triage style, notes, tasks, research needs, shopping/travel/home routines",
          "Custom prompt library and assistant instructions",
          "One core assistant: personal chief of staff, inbox triage, study/research, travel planner, meeting prep, or life admin",
          "Simple handoff guide",
        ],
      },
      {
        label: "Full Build Sprint",
        price: "$799",
        cadence: "one-time",
        blurb: "A connected set of assistants and routines across your life.",
        points: [
          "Intake plus two 90-minute build sessions",
          "3 to 5 personalized assistants and workflows",
          "Voice and tone calibration",
          "Obsidian, Notion, or Google Workspace setup recommendations",
          "14-day tune-up window",
        ],
      },
    ],
    detail: {
      headline: "A personal AI assistant built around the way you actually live.",
      subheadline:
        "Not a generic chatbot. A personalized operating layer for your calendar, notes, inbox, research, tasks, travel, study, and life admin.",
      sections: [
        {
          title: "What it can help with",
          items: [
            "Inbox summaries and triage",
            "Schedule prep and meeting briefs",
            "Research briefings",
            "Travel planning",
            "Gift research",
            "Class and study support",
            "Household operations",
            "Decision memos",
            "Reminders that actually fire",
          ],
        },
        {
          title: "What we build",
          items: [
            "Assistant instructions tuned to your voice",
            "A reusable prompt library",
            "Workspace setup in your tools",
            "Recurring routines",
            "A plain-language handoff guide",
          ],
        },
        {
          title: "Examples",
          items: [
            "A busy student keeping coursework, research, and deadlines in one place",
            "A founder in NYC with a personal chief of staff for inbox and calendar",
            "A household concierge for travel, gifts, and family logistics",
            "A job-search assistant tracking roles, outreach, and follow-ups",
            "A family admin assistant for school, appointments, and errands",
          ],
        },
      ],
    },
  },
  {
    slug: "business-workflow-audit",
    href: "/services/business-workflow-audit",
    hasPage: true,
    eyebrow: "Business",
    name: "Small Business AI Workflow Audit",
    priceLabel: "$249 / $749",
    priceNote: "one-time · Lite or Deep Dive",
    tagline: "Find the workflow that is costing your business the most time.",
    summary:
      "Before building automations, we map the process, estimate the leverage, and decide what should be automated, delegated, simplified, or left alone. You get a practical roadmap before you spend on builds.",
    audience:
      "Small-business owners who want automation but need a practical roadmap before spending on builds.",
    cta: { label: "Find my bottlenecks", href: "/book" },
    bestFit: [
      "You feel the time leak but cannot name the single biggest cause",
      "You want a roadmap before committing budget to a build",
      "You want an honest automate / delegate / simplify / leave-alone call",
    ],
    notFit: [
      "You already know the exact automation and want it built now (go to Automation Build)",
      "You want only personal-life help (start with the Personal Assistant Sprint)",
    ],
    tiers: [
      {
        label: "Lite",
        price: "$249",
        cadence: "one-time",
        blurb: "Async review of one workflow with a clear action plan.",
        points: [
          "Intake plus async review of one workflow",
          "5 to 7 page PDF: bottleneck, current process, automation opportunities, tool recommendations, risk notes, 30-day action plan",
        ],
      },
      {
        label: "Deep Dive",
        price: "$749",
        cadence: "one-time",
        blurb: "A full process mapped with an ROI and time-savings model.",
        points: [
          "Two workflows, or one full customer or admin process",
          "Interview with owner or operator",
          "10 to 15 page workflow map and ROI / time-savings model",
          "Build vs buy recommendation",
          "Implementation quote if relevant",
        ],
      },
    ],
    detail: {
      headline: "Find the workflow that is costing your business the most time.",
      subheadline:
        "Before building automations, we map the process, estimate the leverage, and decide what should be automated, delegated, simplified, or left alone.",
      sections: [
        {
          title: "Workflow categories we look at",
          items: [
            "Lead intake",
            "Follow-up",
            "Quoting",
            "Scheduling",
            "Document processing",
            "Customer support",
            "Reporting",
            "Content operations",
            "CRM hygiene",
          ],
        },
        {
          title: "Sample deliverable outline",
          items: [
            "The single biggest bottleneck, named plainly",
            "Your current process, mapped step by step",
            "Automation opportunities ranked by leverage",
            "Tool recommendations with no markup",
            "Risk notes and what to leave human",
            "A 30-day action plan",
          ],
        },
        {
          title: "Build vs buy philosophy",
          body:
            "We do not automate broken processes before simplifying them, and we will tell you when an off-the-shelf tool beats a custom build. The point is leverage, not more software. If the honest answer is to delegate or simplify instead of automate, that is what the roadmap will say.",
        },
      ],
    },
  },
  {
    slug: "automation-build-sprint",
    href: "/services/automation-build-sprint",
    hasPage: true,
    eyebrow: "Business",
    name: "Automation Build Sprint",
    priceLabel: "From $1,500",
    priceNote: "one-time · most simple builds $1,500–$3,500 · larger systems quoted",
    tagline: "Custom AI workflows built around one real business process.",
    summary:
      "We scope one process, build the simplest useful automation, test it on real examples, and hand it over with documentation. Built in the right tool stack for your business, not the fanciest one.",
    audience:
      "Service businesses, solopreneurs, operators, clinics, consultants, agencies, local businesses, and founder-led teams.",
    cta: { label: "Scope an automation", href: "/book" },
    bestFit: [
      "You have one clear, repeatable process worth automating",
      "You can point to real examples to build and test against",
      "You want to own the result, with documentation and a handoff",
    ],
    notFit: [
      "The process is still changing week to week (audit and simplify first)",
      "You want a full custom software product (that is scoped separately)",
    ],
    tiers: [
      {
        label: "Automation Build Sprint",
        price: "From $1,500",
        cadence: "one-time",
        blurb: "Common range $1,500–$3,500. Larger systems quoted.",
        points: [
          "Workflow map of the process",
          "Built in the right tool stack: Claude, ChatGPT, Zapier, Make, n8n, Airtable, Notion, Google Workspace, CRM, or a lightweight custom app",
          "Tested on real examples",
          "Documentation and a handoff video",
          "14-day tune-up window",
        ],
      },
    ],
    detail: {
      headline: "Custom AI workflows built around one real business process.",
      subheadline:
        "We scope one process, build the simplest useful automation, test it on real examples, and hand it over with documentation.",
      sections: [
        {
          title: "Good fit",
          items: [
            "One clear, repeatable process",
            "Real examples to build and test against",
            "An owner who wants leverage, not a science project",
          ],
        },
        {
          title: "Not a fit",
          items: [
            "A process that changes week to week and needs simplifying first",
            "A full custom software product (scoped or referred separately)",
            "Anything where the honest answer is do not automate this yet",
          ],
        },
        {
          title: "Example builds",
          items: [
            "Lead intake and qualification assistant",
            "Missed-call and form follow-up workflow",
            "Meeting notes to action items to email recap pipeline",
            "Proposal or estimate draft generator",
            "Customer support triage assistant",
            "Internal knowledge base assistant",
            "Weekly business dashboard summary",
            "Content repurposing workflow",
          ],
        },
        {
          title: "Build process",
          items: [
            "Capture the real process",
            "Simplify before automating",
            "Configure in the right tool stack",
            "Test on real examples",
            "Train you and your team",
            "Tune within the 14-day window",
          ],
        },
      ],
    },
  },
  {
    slug: "ai-operating-system",
    href: "/services/ai-operating-system",
    hasPage: true,
    eyebrow: "Ongoing",
    name: "AI Operating System Retainer",
    priceLabel: "$299/mo / $999/mo",
    priceNote: "month-to-month · Personal OS or Business OS · custom for higher-touch",
    tagline: "Keep your AI systems useful after the first build.",
    summary:
      "AI tools change. Your life and business change. The retainer keeps your assistants, workflows, and operating cadence improving every month. Month-to-month, no lock-in.",
    audience:
      "People and businesses who want ongoing improvements, maintenance, training, and new assistant or workflow iterations.",
    cta: { label: "Keep improving monthly", href: "/book" },
    bestFit: [
      "You have systems in place and want them maintained and improved",
      "You want a steady cadence of new automations, not a one-off",
      "You want month-to-month flexibility with no lock-in",
    ],
    notFit: [
      "You only need a single one-time build (start with a sprint)",
      "You are not ready to use what gets built every week",
    ],
    tiers: [
      {
        label: "Personal OS",
        price: "$299",
        cadence: "per month",
        blurb: "Ongoing tuning for your personal assistants.",
        points: [
          "Monthly 60-minute optimization call",
          "Assistant updates and prompt tuning",
          "Tool and workflow troubleshooting",
          "Light research and setup support",
          "Monthly “what to automate next” plan",
        ],
      },
      {
        label: "Business OS",
        price: "$999",
        cadence: "per month",
        blurb: "An operating cadence for your business systems.",
        points: [
          "Monthly 90-minute ops review",
          "Workflow maintenance and improvement backlog",
          "New automations scoped monthly",
          "Staff and founder office hours",
          "KPI and time-savings tracking",
          "Vendor and tool monitoring",
        ],
      },
    ],
    detail: {
      headline: "Keep your AI systems useful after the first build.",
      subheadline:
        "AI tools change. Your life and business change. The retainer keeps your assistants, workflows, and operating cadence improving every month.",
      sections: [
        {
          title: "What is included",
          items: [
            "Maintenance and tuning of what we have built",
            "New assistants and automations scoped on a regular cadence",
            "Troubleshooting when tools or APIs change",
            "A monthly plan for what to improve next",
          ],
        },
        {
          title: "What is excluded",
          items: [
            "Large net-new builds beyond the monthly scope (quoted separately)",
            "Full custom software products",
            "Tool subscriptions, which you pay vendors directly with no markup",
          ],
        },
        {
          title: "Month-to-month, no lock-in",
          body:
            "Retainers are month-to-month. You can cancel any time. The goal is to keep your systems useful, not to trap you in a contract.",
        },
      ],
    },
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** The four services that have dedicated pages (excludes the entry consult). */
export const SERVICE_PAGES = SERVICES.filter((s) => s.hasPage);
