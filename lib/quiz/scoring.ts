import { questions } from "./questions";
import { DIMENSIONS, type Dimension, type QuizAnswers } from "./types";

export type Tier = "Essentials" | "Concierge" | "Estate";
export type ResultBand = "Strong Fit" | "Excellent Fit" | "Exceptional Fit";

export type RoadmapStep = { title: string; body: string };

export type QuizScore = {
  total: number; // 0–100, never below 68
  lifeComplexity: number;
  adminPain: number;
  delegationReadiness: number;
  aiReadiness: number;
  privacyNeed: number;
  supportNeed: number;
  integrationDepth: number;
  recommendedTier: Tier;
  resultBand: ResultBand;
  reasons: string[];
  useCases: string[];
  roadmap: RoadmapStep[];
  headline: string;
  summary: string;
};

const MIN_SCORE = 68;

/** Maximum attainable weight per dimension (single-select => max option per question). */
const MAX_PER_DIMENSION: Record<Dimension, number> = (() => {
  const totals = Object.fromEntries(
    DIMENSIONS.map((d) => [d, 0]),
  ) as Record<Dimension, number>;

  for (const question of questions) {
    for (const dimension of DIMENSIONS) {
      const maxForQuestion = Math.max(
        0,
        ...question.options.map((o) => o.weights[dimension] ?? 0),
      );
      totals[dimension] += maxForQuestion;
    }
  }
  return totals;
})();

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, n));

const round = (n: number) => Math.round(n);

function normalizedDimensions(answers: QuizAnswers): Record<Dimension, number> {
  const raw = Object.fromEntries(
    DIMENSIONS.map((d) => [d, 0]),
  ) as Record<Dimension, number>;

  for (const question of questions) {
    const chosenId = answers[question.id];
    if (!chosenId) continue;
    const option = question.options.find((o) => o.id === chosenId);
    if (!option) continue;
    for (const dimension of DIMENSIONS) {
      raw[dimension] += option.weights[dimension] ?? 0;
    }
  }

  const normalized = Object.fromEntries(
    DIMENSIONS.map((d) => {
      const max = MAX_PER_DIMENSION[d];
      return [d, max > 0 ? round((raw[d] / max) * 100) : 0];
    }),
  ) as Record<Dimension, number>;

  return normalized;
}

const REASON_COPY: Record<Dimension, string> = {
  lifeComplexity:
    "Your life has a lot of moving pieces, which is exactly where a private system earns its keep.",
  adminPain:
    "A meaningful share of your week goes to admin: calendar, inbox, and the follow-through a private system can absorb.",
  delegationReadiness:
    "You're ready to hand work off, so the system can take real tasks off your plate from day one.",
  aiReadiness:
    "You'd get the most from a done-for-you setup, so the system is productive without a learning curve.",
  privacyNeed:
    "Privacy matters to you, which is why a local-first build that keeps your data at home fits so well.",
  supportNeed:
    "You value real human support, and ongoing concierge care is built into how this works.",
  integrationDepth:
    "You have several tools to connect, and a coordinated system removes the friction between them.",
};

const REASON_PRIORITY: Dimension[] = [
  "lifeComplexity",
  "adminPain",
  "delegationReadiness",
  "integrationDepth",
  "privacyNeed",
  "supportNeed",
  "aiReadiness",
];

const USE_CASES_BY_FIRST_FOCUS: Record<string, string[]> = {
  calendar: [
    "Guard your calendar and protect focus time",
    "Surface daily reminders before they become fires",
    "Hold a running list of what needs your attention",
  ],
  inbox: [
    "Triage your inbox and flag what truly matters",
    "Draft and chase the follow-ups you keep deferring",
    "Keep threads organized around people and decisions",
  ],
  household: [
    "Coordinate household and family logistics in one place",
    "Track vendors, maintenance, and recurring tasks",
    "Keep shared lists and reminders in sync for everyone",
  ],
  travel: [
    "Plan and assemble itineraries within your rules",
    "Brief you before decisions with the research done",
    "Keep documents, points, and timing in order",
  ],
  health: [
    "Hold you to training and recovery routines",
    "Prep notes and questions before appointments",
    "Track the habits that matter, your way",
  ],
  chief: [
    "Run your day as a private chief of staff",
    "Triage calendar and inbox, then chase follow-ups",
    "Coordinate household, travel, and research end to end",
  ],
};

const DEFAULT_USE_CASES = USE_CASES_BY_FIRST_FOCUS.chief;

const ROADMAP_BY_TIER: Record<Tier, RoadmapStep[]> = {
  Essentials: [
    {
      title: "Set the foundation",
      body: "Stand up your assistant agent and a private memory vault on hardware in your home.",
    },
    {
      title: "Connect the core",
      body: "Wire in your calendar, reminders, and inbox so the agent handles the daily basics.",
    },
    {
      title: "Train and hand over",
      body: "A focused training session so you and your household are comfortable on day one.",
    },
  ],
  Concierge: [
    {
      title: "Map your operating system",
      body: "Design the specialist agents and integrations around your real pain points.",
    },
    {
      title: "Build and connect",
      body: "Install the system, connect 6–10 tools, and tie in smart-home where it helps.",
    },
    {
      title: "Train, then expand",
      body: "Hands-on training plus priority support and a quarterly session to grow the system.",
    },
  ],
  Estate: [
    {
      title: "Design private infrastructure",
      body: "Plan a redundant, local-first build sized to your household and privacy needs.",
    },
    {
      title: "Install like infrastructure",
      body: "Serious hardware, the full specialist suite, and per-family-member workflows.",
    },
    {
      title: "Multi-day onboarding",
      body: "In-home tutoring for the household and a dedicated, high-touch support cadence.",
    },
  ],
};

const SUMMARY_BY_TIER: Record<Tier, string> = {
  Essentials:
    "You're a strong fit for a private AI system, especially if you want a clean starting point: calendar, reminders, inbox triage, and a private household memory. Essentials gives you the benefits without overbuilding on day one.",
  Concierge:
    "You're an excellent fit for a deeper personal operating system. Your answers suggest multiple recurring pain points, several tools to connect, and enough moving pieces that a basic assistant would underperform. Concierge is the right starting point.",
  Estate:
    "You're an exceptional fit for a high-touch, privacy-forward build. Your life has enough complexity, and enough sensitivity, that the system should be installed like genuine household infrastructure, with redundancy, deeper training, and premium support.",
};

const BAND_BY_TIER: Record<Tier, ResultBand> = {
  Essentials: "Strong Fit",
  Concierge: "Excellent Fit",
  Estate: "Exceptional Fit",
};

const SCORE_RANGE_BY_TIER: Record<Tier, [number, number]> = {
  Essentials: [68, 79],
  Concierge: [80, 91],
  Estate: [92, 100],
};

function pickTier(
  dims: Record<Dimension, number>,
  supportNeedAdj: number,
  needAvg: number,
): Tier {
  if (
    dims.privacyNeed >= 70 ||
    supportNeedAdj >= 75 ||
    dims.lifeComplexity >= 80
  ) {
    return "Estate";
  }
  if (
    dims.integrationDepth >= 45 ||
    dims.adminPain >= 60 ||
    supportNeedAdj >= 50 ||
    needAvg >= 55
  ) {
    return "Concierge";
  }
  return "Essentials";
}

function buildReasons(
  dims: Record<Dimension, number>,
  supportNeedAdj: number,
): string[] {
  const values: Record<Dimension, number> = {
    ...dims,
    supportNeed: supportNeedAdj,
    // Low AI comfort is itself a reason to choose done-for-you.
    aiReadiness: 100 - dims.aiReadiness,
  };

  const ranked = [...REASON_PRIORITY].sort((a, b) => {
    const diff = values[b] - values[a];
    if (diff !== 0) return diff;
    return REASON_PRIORITY.indexOf(a) - REASON_PRIORITY.indexOf(b);
  });

  return ranked.slice(0, 3).map((d) => REASON_COPY[d]);
}

export function computeScore(answers: QuizAnswers): QuizScore {
  const dims = normalizedDimensions(answers);

  // Low AI comfort increases the need for white-glove support (never lowers fit).
  const supportNeedAdj = clamp(
    dims.supportNeed + (100 - dims.aiReadiness) * 0.3,
    0,
    100,
  );

  const needWeights: Partial<Record<Dimension, number>> = {
    lifeComplexity: 1.2,
    adminPain: 1.2,
    delegationReadiness: 1,
    privacyNeed: 0.8,
    integrationDepth: 0.8,
  };
  let weightedSum = 0;
  let weightTotal = 0;
  for (const [dim, weight] of Object.entries(needWeights) as [
    Dimension,
    number,
  ][]) {
    weightedSum += dims[dim] * weight;
    weightTotal += weight;
  }
  // supportNeed uses the adjusted value.
  weightedSum += supportNeedAdj * 1;
  weightTotal += 1;
  const needAvg = clamp(weightedSum / weightTotal, 0, 100);

  const recommendedTier = pickTier(dims, supportNeedAdj, needAvg);
  const resultBand = BAND_BY_TIER[recommendedTier];

  const [lo, hi] = SCORE_RANGE_BY_TIER[recommendedTier];
  const total = clamp(round(lo + (hi - lo) * (needAvg / 100)), MIN_SCORE, 100);

  const firstFocus = answers.ownFirst ?? "chief";
  const useCases =
    USE_CASES_BY_FIRST_FOCUS[firstFocus] ?? DEFAULT_USE_CASES;

  return {
    total,
    lifeComplexity: dims.lifeComplexity,
    adminPain: dims.adminPain,
    delegationReadiness: dims.delegationReadiness,
    aiReadiness: dims.aiReadiness,
    privacyNeed: dims.privacyNeed,
    supportNeed: round(supportNeedAdj),
    integrationDepth: dims.integrationDepth,
    recommendedTier,
    resultBand,
    reasons: buildReasons(dims, supportNeedAdj),
    useCases,
    roadmap: ROADMAP_BY_TIER[recommendedTier],
    headline: `Your Agent Fit Score is ${total}/100. ${resultBand}.`,
    summary: SUMMARY_BY_TIER[recommendedTier],
  };
}
