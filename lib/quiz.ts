/**
 * Agent Fit Quiz — "Where is AI most likely to give you time back?"
 *
 * 8 questions, single-select plus an email capture. Scoring is deterministic and
 * maps to one of five honest result bands (including a DIY / not-worth-it-yet
 * outcome, per directive). No band is hidden; every answer set is reachable.
 */

export type BandId =
  | "personal-assistant-sprint"
  | "workflow-audit-first"
  | "automation-build-candidate"
  | "operating-system-retainer"
  | "diy";

export type QuizOption = { value: string; label: string };

export type QuizQuestion = {
  id: string;
  eyebrow: string;
  prompt: string;
  helper?: string;
  /** "email" renders a text input; otherwise single-select. */
  type: "single" | "email";
  options?: QuizOption[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "domain",
    eyebrow: "Question 01",
    prompt: "Are you here for your personal life, your business, or both?",
    type: "single",
    options: [
      { value: "personal", label: "My personal life" },
      { value: "business", label: "My business" },
      { value: "both", label: "Both" },
    ],
  },
  {
    id: "timeLeak",
    eyebrow: "Question 02",
    prompt: "What steals the most time right now?",
    type: "single",
    options: [
      { value: "inbox", label: "Email and inbox triage" },
      { value: "scheduling", label: "Scheduling and calendar wrangling" },
      { value: "admin", label: "Personal admin, errands, research" },
      { value: "leads", label: "Lead intake and follow-up" },
      { value: "ops", label: "Repetitive operations: quoting, reporting, support" },
      { value: "content", label: "Content and communications" },
    ],
  },
  {
    id: "tools",
    eyebrow: "Question 03",
    prompt: "What tools do you already use?",
    type: "single",
    options: [
      { value: "google", label: "Google Workspace" },
      { value: "microsoft", label: "Microsoft 365 or Outlook" },
      { value: "notion", label: "Notion or Obsidian" },
      { value: "crm", label: "A CRM (HubSpot, Salesforce, etc.)" },
      { value: "mixed", label: "A mix, nothing really connected" },
      { value: "minimal", label: "Honestly, not much" },
    ],
  },
  {
    id: "frequency",
    eyebrow: "Question 04",
    prompt: "How often does this happen?",
    type: "single",
    options: [
      { value: "daily", label: "Multiple times a day" },
      { value: "weekly", label: "A few times a week" },
      { value: "monthly", label: "A few times a month" },
      { value: "rarely", label: "Rarely, or it is a one-off" },
    ],
  },
  {
    id: "impact",
    eyebrow: "Question 05",
    prompt: "What would change if this got 50% faster?",
    type: "single",
    options: [
      { value: "huge", label: "It would change my month: hours back every week" },
      { value: "revenue", label: "It would free me to grow revenue" },
      { value: "meaningful", label: "Meaningful: a few hours back" },
      { value: "minor", label: "Nice to have, not urgent" },
    ],
  },
  {
    id: "cadence",
    eyebrow: "Question 06",
    prompt: "Are you looking for a one-time setup or monthly help?",
    type: "single",
    options: [
      { value: "onetime", label: "One-time setup, then I run it myself" },
      { value: "monthly", label: "Ongoing monthly help" },
      { value: "unsure", label: "Not sure yet" },
    ],
  },
  {
    id: "budget",
    eyebrow: "Question 07",
    prompt: "What budget range feels right to start?",
    type: "single",
    options: [
      { value: "diy", label: "Under $100, just exploring" },
      { value: "low", label: "$100 to $500" },
      { value: "mid", label: "$500 to $2,000" },
      { value: "high", label: "$2,000+ or a monthly retainer" },
    ],
  },
  {
    id: "email",
    eyebrow: "Question 08",
    prompt: "Where should we send your result?",
    helper: "We will send your recommended path. No spam, and we never sell your details.",
    type: "email",
  },
];

export type QuizAnswers = Record<string, string>;

export type ResultBand = {
  id: BandId;
  label: string;
  headline: string;
  description: string;
  /** Slug into lib/services.ts for the recommended next offer. */
  recommendedServiceSlug: string;
  ctaLabel: string;
};

export const BANDS: Record<BandId, ResultBand> = {
  "personal-assistant-sprint": {
    id: "personal-assistant-sprint",
    label: "Personal Assistant Sprint",
    headline: "Your fastest win is a personal AI assistant.",
    description:
      "Your time leak is personal admin, and it happens often enough to be worth systemizing. A Personal AI Assistant Sprint builds one or more assistants around how you actually live, so the busywork stops piling up.",
    recommendedServiceSlug: "personal-ai-assistant",
    ctaLabel: "Build my assistant",
  },
  "workflow-audit-first": {
    id: "workflow-audit-first",
    label: "Workflow Audit First",
    headline: "Map the bottleneck before you build.",
    description:
      "There is real leverage in your business, but the smart first move is a roadmap, not a rushed build. A Small Business AI Workflow Audit finds the single biggest time leak and tells you what to automate, delegate, simplify, or leave alone.",
    recommendedServiceSlug: "business-workflow-audit",
    ctaLabel: "Find my bottlenecks",
  },
  "automation-build-candidate": {
    id: "automation-build-candidate",
    label: "Automation Build Candidate",
    headline: "You have a process worth automating.",
    description:
      "You know the pain, it happens often, and the payoff is real. That is a strong candidate for an Automation Build Sprint: one process, scoped, built in the right tool stack, tested on real examples, and handed over with documentation.",
    recommendedServiceSlug: "automation-build-sprint",
    ctaLabel: "Scope an automation",
  },
  "operating-system-retainer": {
    id: "operating-system-retainer",
    label: "Operating System Retainer",
    headline: "You want momentum, not a one-off.",
    description:
      "You are working across both your life and your business, or you want ongoing help. An AI Operating System Retainer keeps your assistants and workflows improving every month, with new automations scoped on a steady cadence. Month-to-month, no lock-in.",
    recommendedServiceSlug: "ai-operating-system",
    ctaLabel: "Keep improving monthly",
  },
  diy: {
    id: "diy",
    label: "DIY for now",
    headline: "You may not need to pay for this yet.",
    description:
      "Based on your answers, this is occasional or low-stakes enough that a paid build is probably premature. We would rather tell you that. Start with the free quiz takeaways, and if it grows into a weekly drain, the $79 AI Clarity Consult is the honest next step.",
    recommendedServiceSlug: "ai-clarity-consult",
    ctaLabel: "Book the $79 consult anyway",
  },
};

// --- Scoring metadata (kept separate from display so questions stay clean) ---

const FREQUENCY_SCORE: Record<string, number> = {
  daily: 3,
  weekly: 2,
  monthly: 1,
  rarely: 0,
};

const IMPACT_SCORE: Record<string, number> = {
  huge: 3,
  revenue: 3,
  meaningful: 2,
  minor: 0,
};

const BUSINESS_PROCESS = new Set(["leads", "ops", "content"]);

const TIME_LEAK_LABEL: Record<string, string> = {
  inbox: "email and inbox triage",
  scheduling: "scheduling and calendar wrangling",
  admin: "personal admin and research",
  leads: "lead intake and follow-up",
  ops: "repetitive operations like quoting and reporting",
  content: "content and communications",
};

export type QuizResult = {
  bandId: BandId;
  band: ResultBand;
  reasons: string[];
};

export function scoreQuiz(answers: QuizAnswers): QuizResult {
  const domain = answers.domain ?? "personal";
  const cadence = answers.cadence ?? "unsure";
  const budget = answers.budget ?? "low";
  const timeLeak = answers.timeLeak ?? "admin";
  const frequency = FREQUENCY_SCORE[answers.frequency] ?? 1;
  const impact = IMPACT_SCORE[answers.impact] ?? 1;
  const intensity = frequency + impact; // 0–6

  let bandId: BandId;

  if (
    intensity <= 1 ||
    (budget === "diy" && impact === 0 && frequency <= 1)
  ) {
    bandId = "diy";
  } else if (cadence === "monthly" || domain === "both") {
    bandId = "operating-system-retainer";
  } else if (domain === "business") {
    const strongBuild =
      intensity >= 4 &&
      (budget === "mid" || budget === "high") &&
      BUSINESS_PROCESS.has(timeLeak);
    bandId = strongBuild ? "automation-build-candidate" : "workflow-audit-first";
  } else {
    bandId = "personal-assistant-sprint";
  }

  return { bandId, band: BANDS[bandId], reasons: buildReasons(answers, bandId) };
}

function buildReasons(answers: QuizAnswers, bandId: BandId): string[] {
  const domain = answers.domain ?? "personal";
  const leakLabel = TIME_LEAK_LABEL[answers.timeLeak] ?? "the busywork you described";
  const reasons: string[] = [];

  // 1. Where the time goes.
  reasons.push(`Your biggest time leak right now is ${leakLabel}.`);

  // 2. Why this cadence / scope.
  if (bandId === "operating-system-retainer") {
    reasons.push(
      domain === "both"
        ? "You are looking for leverage across both your life and your business, which is what an operating cadence is built for."
        : "You want ongoing help, so a monthly cadence beats a one-and-done build.",
    );
  } else if (bandId === "automation-build-candidate") {
    reasons.push(
      "It is frequent and high-impact, which makes a focused, one-process build worth it.",
    );
  } else if (bandId === "workflow-audit-first") {
    reasons.push(
      "There is clear business leverage here, but a roadmap first protects your budget.",
    );
  } else if (bandId === "diy") {
    reasons.push(
      "It is occasional or low-stakes today, so a paid build would likely be premature.",
    );
  } else {
    reasons.push(
      "It is a personal-life pattern that repeats, which is exactly what a personal assistant handles well.",
    );
  }

  // 3. Honest framing on fit.
  if (bandId === "diy") {
    reasons.push("We would rather flag that than sell you something you do not need yet.");
  } else {
    reasons.push("You want a system you own and can use every week, not another app to babysit.");
  }

  return reasons.slice(0, 3);
}
