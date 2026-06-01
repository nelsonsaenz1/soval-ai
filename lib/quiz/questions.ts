import type { QuizQuestion } from "./types";

/**
 * 13 single-select questions. Each option carries weights (0–3) toward the
 * scoring dimensions. The set spans professional load, household complexity,
 * calendar/email burden, travel, family logistics, health routines, research,
 * AI proficiency, privacy, tools/integrations, pain points, delegation,
 * support style, and white-glove preference.
 */
export const questions: QuizQuestion[] = [
  {
    id: "day",
    category: "Day-to-day",
    prompt: "What best describes your day-to-day life right now?",
    options: [
      {
        id: "in-control",
        label: "I'm busy, but mostly in control.",
        weights: { lifeComplexity: 1, delegationReadiness: 1 },
      },
      {
        id: "switching",
        label: "I'm constantly context-switching.",
        weights: { lifeComplexity: 2, adminPain: 1, delegationReadiness: 2 },
      },
      {
        id: "too-many",
        label: "I have too many moving pieces to track manually.",
        weights: { lifeComplexity: 3, adminPain: 2, delegationReadiness: 2 },
      },
      {
        id: "needs-os",
        label: "My household and work life need a real operating system.",
        weights: { lifeComplexity: 3, adminPain: 2, delegationReadiness: 3 },
      },
    ],
  },
  {
    id: "timeSink",
    category: "Pain points",
    prompt: "Where do you lose the most time each week?",
    options: [
      {
        id: "calendar",
        label: "Calendar and scheduling.",
        weights: { adminPain: 2 },
      },
      {
        id: "email",
        label: "Email, messages, and follow-ups.",
        weights: { adminPain: 3 },
      },
      {
        id: "household",
        label: "Household and family logistics.",
        weights: { adminPain: 2, lifeComplexity: 2 },
      },
      {
        id: "travel",
        label: "Travel, research, and planning.",
        weights: { adminPain: 2, lifeComplexity: 1 },
      },
      {
        id: "health",
        label: "Health, routines, and accountability.",
        weights: { adminPain: 1, lifeComplexity: 1 },
      },
      {
        id: "all",
        label: "All of the above.",
        weights: { adminPain: 3, lifeComplexity: 2, delegationReadiness: 1 },
      },
    ],
  },
  {
    id: "household",
    category: "Household complexity",
    prompt: "Which best describes your household?",
    options: [
      {
        id: "solo",
        label: "Just me.",
        weights: { lifeComplexity: 0 },
      },
      {
        id: "couple",
        label: "Me and a partner.",
        weights: { lifeComplexity: 1 },
      },
      {
        id: "family",
        label: "A family with kids at home.",
        weights: { lifeComplexity: 3, adminPain: 1 },
      },
      {
        id: "estate",
        label: "A large household, with multiple homes, staff, or generations.",
        weights: { lifeComplexity: 3, privacyNeed: 1, integrationDepth: 1 },
      },
    ],
  },
  {
    id: "work",
    category: "Professional load",
    prompt: "What does your professional load look like?",
    options: [
      {
        id: "light",
        label: "Light: retired, between things, or intentionally slow.",
        weights: { lifeComplexity: 0 },
      },
      {
        id: "steady",
        label: "A steady role with a predictable rhythm.",
        weights: { lifeComplexity: 1, adminPain: 1 },
      },
      {
        id: "demanding",
        label: "A demanding role with constant communication.",
        weights: { lifeComplexity: 2, adminPain: 2 },
      },
      {
        id: "founder",
        label: "I run a business, or several at once.",
        weights: { lifeComplexity: 3, adminPain: 2, integrationDepth: 1 },
      },
    ],
  },
  {
    id: "travel",
    category: "Travel",
    prompt: "How often do you travel?",
    options: [
      {
        id: "rarely",
        label: "Rarely.",
        weights: { lifeComplexity: 0 },
      },
      {
        id: "sometimes",
        label: "A few times a year.",
        weights: { lifeComplexity: 1 },
      },
      {
        id: "monthly",
        label: "Most months.",
        weights: { lifeComplexity: 2, integrationDepth: 1 },
      },
      {
        id: "constant",
        label: "Constantly, often internationally.",
        weights: { lifeComplexity: 3, integrationDepth: 1 },
      },
    ],
  },
  {
    id: "tools",
    category: "Integrations",
    prompt: "How many tools would your ideal assistant need to understand?",
    options: [
      { id: "1-3", label: "1–3.", weights: { integrationDepth: 1 } },
      { id: "4-6", label: "4–6.", weights: { integrationDepth: 2 } },
      { id: "7-10", label: "7–10.", weights: { integrationDepth: 3 } },
      {
        id: "10plus",
        label: "More than 10.",
        weights: { integrationDepth: 3, lifeComplexity: 1 },
      },
    ],
  },
  {
    id: "comfort",
    category: "AI proficiency",
    prompt: "How comfortable are you setting up AI tools yourself?",
    options: [
      {
        id: "very",
        label: "Very comfortable.",
        weights: { aiReadiness: 3 },
      },
      {
        id: "no-time",
        label: "Comfortable, but I don't want to spend the time.",
        weights: { aiReadiness: 2, supportNeed: 1 },
      },
      {
        id: "annoying",
        label: "I can use them, but setup is annoying.",
        weights: { aiReadiness: 1, supportNeed: 2 },
      },
      {
        id: "handle-it",
        label: "I want someone to handle everything.",
        weights: { aiReadiness: 0, supportNeed: 3 },
      },
    ],
  },
  {
    id: "privacy",
    category: "Privacy",
    prompt: "How important is privacy to you?",
    options: [
      {
        id: "standard",
        label: "Standard privacy is fine.",
        weights: { privacyNeed: 0 },
      },
      {
        id: "careful",
        label: "I want careful controls.",
        weights: { privacyNeed: 1 },
      },
      {
        id: "local-first",
        label: "I strongly prefer a local-first, private setup.",
        weights: { privacyNeed: 2 },
      },
      {
        id: "highest",
        label: "I want the highest privacy option available.",
        weights: { privacyNeed: 3 },
      },
    ],
  },
  {
    id: "ownFirst",
    category: "First focus",
    prompt: "If your AI agent worked well, what would you want it to own first?",
    options: [
      {
        id: "calendar",
        label: "My calendar and reminders.",
        weights: { adminPain: 1 },
      },
      {
        id: "inbox",
        label: "My inbox and follow-ups.",
        weights: { adminPain: 2 },
      },
      {
        id: "household",
        label: "My household and family logistics.",
        weights: { lifeComplexity: 2 },
      },
      {
        id: "travel",
        label: "Travel and personal research.",
        weights: { lifeComplexity: 1, integrationDepth: 1 },
      },
      {
        id: "health",
        label: "Health and fitness routines.",
        weights: { supportNeed: 1 },
      },
      {
        id: "chief",
        label: "A full personal chief-of-staff workflow.",
        weights: {
          lifeComplexity: 2,
          adminPain: 2,
          integrationDepth: 1,
          delegationReadiness: 1,
        },
      },
    ],
  },
  {
    id: "onboarding",
    category: "Onboarding",
    prompt: "What kind of onboarding would help you most?",
    options: [
      {
        id: "walkthrough",
        label: "A short walkthrough.",
        weights: { supportNeed: 0 },
      },
      {
        id: "guided",
        label: "A guided setup and a cheat sheet.",
        weights: { supportNeed: 1 },
      },
      {
        id: "hands-on",
        label: "Hands-on training for me and my household.",
        weights: { supportNeed: 2 },
      },
      {
        id: "white-glove",
        label: "White-glove install plus ongoing tutoring.",
        weights: { supportNeed: 3 },
      },
    ],
  },
  {
    id: "support",
    category: "Support style",
    prompt: "How often would you want human support available?",
    options: [
      {
        id: "monthly",
        label: "A monthly check-in.",
        weights: { supportNeed: 1 },
      },
      {
        id: "priority",
        label: "Priority support when I need it.",
        weights: { supportNeed: 2 },
      },
      {
        id: "proactive",
        label: "Proactive monitoring and regular expansion sessions.",
        weights: { supportNeed: 3 },
      },
      {
        id: "dedicated",
        label: "Dedicated, high-touch support.",
        weights: { supportNeed: 3, privacyNeed: 1 },
      },
    ],
  },
  {
    id: "delegate",
    category: "Delegation",
    prompt: "How do you feel about handing tasks off?",
    options: [
      {
        id: "myself",
        label: "I prefer to do things myself.",
        weights: { delegationReadiness: 0 },
      },
      {
        id: "busywork",
        label: "I'm happy to delegate the busywork.",
        weights: { delegationReadiness: 2 },
      },
      {
        id: "non-decisions",
        label: "Delegate anything that isn't a real decision.",
        weights: { delegationReadiness: 3 },
      },
      {
        id: "autopilot",
        label: "I want as much as possible to just run on its own.",
        weights: { delegationReadiness: 3, supportNeed: 1 },
      },
    ],
  },
  {
    id: "build",
    category: "White-glove preference",
    prompt: "What kind of build are you imagining?",
    options: [
      {
        id: "lean",
        label: "Lean and simple: just the essentials.",
        weights: { supportNeed: 0 },
      },
      {
        id: "capable",
        label: "A capable setup, professionally done.",
        weights: { supportNeed: 2, integrationDepth: 1 },
      },
      {
        id: "private",
        label: "A serious, private build with redundancy.",
        weights: { supportNeed: 3, privacyNeed: 3 },
      },
      {
        id: "complete",
        label: "The most complete, high-touch build available.",
        weights: { supportNeed: 3, privacyNeed: 2, integrationDepth: 1 },
      },
    ],
  },
];

export const TOTAL_QUESTIONS = questions.length;
