import type { Metadata } from "next";
import { QuizFlow } from "@/components/quiz/quiz-flow";

export const metadata: Metadata = {
  title: "Where is AI most likely to give you time back?",
  description:
    "A 2-minute quiz that points you to the right next step: a personal assistant sprint, a workflow audit, an automation build, a monthly retainer, or a do-it-yourself recommendation.",
};

export default function QuizPage() {
  return (
    <>
      <section className="mesh-cream border-b border-hairline">
        <div className="container-edge py-14 text-center md:py-16">
          <span className="eyebrow eyebrow--plain mx-auto justify-center">
            The Agent Fit Quiz
          </span>
          <h1 className="mx-auto mt-4 max-w-2xl text-balance font-display text-h1 text-heading">
            Where is AI most likely to give you time back?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lede text-secondary">
            Eight quick questions. No jargon. You will get an honest
            recommendation, even if that recommendation is to wait.
          </p>
        </div>
      </section>

      <section className="bg-warm py-16 md:py-20">
        <div className="container-edge">
          <QuizFlow />
        </div>
      </section>
    </>
  );
}
