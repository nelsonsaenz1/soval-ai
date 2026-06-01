/**
 * Central copy + structured content for Nelson's Path.
 * Voice: editorial, precise, quietly premium. Outcome-first, never hype.
 * Keep marketing language here so pages stay thin and tone stays consistent.
 */

export const site = {
  name: "Nelson's Path",
  tagline: "A private intelligence for the modern household.",
  bookingUrl: "/contact",
  // TODO: replace with real scheduler (Cal.com / Calendly / SavvyCal) embed + link.
  schedulerEmbedUrl: "",
} as const;

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Capabilities", href: "/agent-capabilities" },
  { label: "Privacy & security", href: "/privacy-security" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const footerNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Agent capabilities", href: "/agent-capabilities" },
  { label: "Privacy & security", href: "/privacy-security" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Take the quiz", href: "/quiz" },
];

export const hero = {
  kicker: "Done-for-you personal AI",
  headline: "Your own AI that runs your life.",
  subheadline:
    "A private intelligence, installed in your home and connected to the tools your life already runs on. Engineered, trained, and maintained by a dedicated concierge.",
  primaryCta: { label: "Take the Agent Fit Quiz", href: "/quiz" },
  secondaryCta: { label: "Book a Discovery Call", href: "/contact" },
  badges: [
    "Local-first architecture",
    "Private household memory",
    "Fully managed setup",
    "Dedicated concierge",
  ],
} as const;

export type Step = {
  number: string;
  title: string;
  body: string;
};

export const steps: Step[] = [
  {
    number: "01",
    title: "Consultation",
    body: "We begin with a private consultation to understand your household, your tools, and where your hours quietly disappear, then leave you with a precise plan for what to build first.",
  },
  {
    number: "02",
    title: "Design & installation",
    body: "We engineer your system and install it on dedicated hardware in your home, integrating only the services you authorize and tuning each specialist to your preferences.",
  },
  {
    number: "03",
    title: "Training & stewardship",
    body: "We train your household in plain language, then steward the system: monitoring, refining, and expanding it as your life and your priorities evolve.",
  },
];

export type AgentCapability = {
  name: string;
  summary: string;
  examples: string[];
};

export const agents: AgentCapability[] = [
  {
    name: "Chief of Staff",
    summary:
      "Orchestrates your day end to end: scheduling, correspondence, and the follow-through that otherwise slips.",
    examples: [
      "Protects focus time and triages your calendar",
      "Drafts and chases the replies you keep deferring",
      "Maintains a standing brief of what needs your attention",
    ],
  },
  {
    name: "Travel",
    summary:
      "Plans, books within your standing preferences, and keeps every itinerary in a single, calm place.",
    examples: [
      "Weighs options against your stated preferences",
      "Assembles itineraries the whole household can see",
      "Tracks points, documents, and time-zone logistics",
    ],
  },
  {
    name: "Household Manager",
    summary:
      "Runs the home: vendors, maintenance, deliveries, and the recurring obligations no one wants to own.",
    examples: [
      "Schedules and remembers home maintenance",
      "Coordinates vendors, contractors, and deliveries",
      "Keeps documents, warranties, and records in order",
    ],
  },
  {
    name: "Family Concierge",
    summary:
      "Coordinates the logistics of family life so nothing falls between people or calendars.",
    examples: [
      "Coordinates activities, carpools, and schedules",
      "Plans gatherings, gifts, and the dates that matter",
      "Keeps shared lists and reminders in sync",
    ],
  },
  {
    name: "Health & Wellness",
    summary:
      "Supports your routines and accountability with discretion, without ever standing in for your physician.",
    examples: [
      "Holds you to training and recovery routines",
      "Prepares notes and questions before appointments",
      "Tracks the habits that matter, on your terms",
    ],
  },
  {
    name: "Research & Briefing",
    summary:
      "Conducts the research and returns a clear, decision-ready brief on purchases, choices, and the questions that matter.",
    examples: [
      "Briefs you before meetings and decisions",
      "Compares options and frames the trade-offs",
      "Maintains a private knowledge base on what matters to you",
    ],
  },
];

export type TrustPoint = {
  title: string;
  body: string;
};

export const trustPoints: TrustPoint[] = [
  {
    title: "Local-first by design",
    body: "Your system runs on dedicated hardware installed in your home. Your household memory is never left in an anonymous cloud dashboard.",
  },
  {
    title: "You authorize every connection",
    body: "Nothing reaches your accounts without your explicit approval. Cloud services are used only where, and only how, you permit.",
  },
  {
    title: "It assists. You decide.",
    body: "No autonomous financial transactions. No irreversible, high-stakes action without your sign-off. The judgment stays yours.",
  },
];

export const boundaries: string[] = [
  "No autonomous financial transactions.",
  "No medical, legal, or financial advice.",
  "No irreversible, high-stakes action without human approval.",
  "You hold your own sensitive credentials. We never request passwords in chat.",
];

export type Tier = {
  id: "Essentials" | "Concierge" | "Estate";
  name: string;
  audience: string;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "Essentials",
    name: "Essentials",
    audience: "For an individual or a light household.",
    blurb:
      "A considered starting point: calendar, correspondence, reminders, and a private household memory, professionally installed.",
    features: [
      "Always-on personal assistant",
      "One specialist agent",
      "Discreet messaging access",
      "Private memory vault",
      "2–4 core integrations",
      "2–3 hours of training",
      "Monthly stewardship & support",
    ],
    cta: "Start with Essentials",
  },
  {
    id: "Concierge",
    name: "Concierge",
    audience: "For principals, couples, and busier households.",
    blurb:
      "A complete personal operating system for lives with several moving parts and recurring demands.",
    features: [
      "Multiple specialist agents",
      "6–10 integrations",
      "Smart-home integration where available",
      "1–2 days of training",
      "Priority support",
      "Quarterly expansion session",
    ],
    cta: "Explore Concierge",
    featured: true,
  },
  {
    id: "Estate",
    name: "Estate",
    audience: "For high-demand, privacy-sensitive households.",
    blurb:
      "Installed like genuine household infrastructure: redundant, privacy-forward, and supported at the highest level.",
    features: [
      "Deeper local-first, private architecture",
      "Redundant, professional-grade hardware",
      "Per-member workflows",
      "The full specialist suite",
      "Multi-day in-home training",
      "Dedicated support cadence",
    ],
    cta: "Discuss an Estate build",
  },
];

export const pricingNote =
  "Final investment depends on household complexity, hardware, integrations, privacy requirements, and training. The discovery call confirms the right build.";

export const ctaBand = {
  title: "See how much of your week a private AI could return.",
  body: "The Agent Fit Quiz takes about two minutes and ends with a tailored build recommendation.",
  primary: { label: "Take the Agent Fit Quiz", href: "/quiz" },
  secondary: { label: "Book a Discovery Call", href: "/contact" },
} as const;

export const disclaimer =
  "Nelson's Path provides done-for-you personal AI installation and concierge stewardship. The system assists; you decide. It does not offer medical, legal, or financial advice, and takes no irreversible, high-stakes action without your approval. Quiz results are an advisory estimate; your final build is confirmed during a discovery call.";
