import type { Metadata } from "next";
import { QuizFlow } from "@/components/quiz/quiz-flow";

export const metadata: Metadata = {
  title: "Agent Fit Quiz",
  description:
    "A two-minute Agent Fit Quiz. Get a personalized Agent Fit Score, a recommended build, and your first three agent use cases.",
};

export default function QuizPage() {
  return (
    <div className="bg-surface-muted">
      <div className="container-edge py-14 sm:py-20">
        <QuizFlow />
      </div>
    </div>
  );
}
