export const DIMENSIONS = [
  "lifeComplexity",
  "adminPain",
  "delegationReadiness",
  "aiReadiness",
  "privacyNeed",
  "supportNeed",
  "integrationDepth",
] as const;

export type Dimension = (typeof DIMENSIONS)[number];

export type Weights = Partial<Record<Dimension, number>>;

export type QuizOption = {
  id: string;
  label: string;
  weights: Weights;
};

export type QuizQuestion = {
  id: string;
  category: string;
  prompt: string;
  options: QuizOption[];
};

/** Map of questionId -> selected optionId. */
export type QuizAnswers = Record<string, string>;
