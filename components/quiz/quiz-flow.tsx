"use client";

import * as React from "react";
import { questions } from "@/lib/quiz/questions";
import type { QuizAnswers } from "@/lib/quiz/types";
import { computeScore, type QuizScore } from "@/lib/quiz/scoring";
import { trackEvent } from "@/lib/analytics";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { QuizQuestion } from "@/components/quiz/quiz-question";
import { QuizResult } from "@/components/quiz/quiz-result";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "np_quiz_result";
const LETTERS = "ABCDEFG";

export function QuizFlow() {
  const [started, setStarted] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<QuizAnswers>({});
  const [score, setScore] = React.useState<QuizScore | null>(null);

  const start = () => {
    trackEvent("quiz_started", { totalQuestions: questions.length });
    setStarted(true);
  };

  const finish = (finalAnswers: QuizAnswers) => {
    const result = computeScore(finalAnswers);
    trackEvent("quiz_completed", {
      score: result.total,
      tier: result.recommendedTier,
      band: result.resultBand,
    });
    trackEvent("tier_recommended", { tier: result.recommendedTier });
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          tier: result.recommendedTier,
          score: result.total,
          firstFocus: finalAnswers.ownFirst ?? null,
        }),
      );
    } catch {
      // sessionStorage may be unavailable; carrying context is best-effort.
    }
    setScore(result);
  };

  const handleSelect = (optionId: string) => {
    const current = questions[index];
    if (!current) return;
    const next = { ...answers, [current.id]: optionId };
    setAnswers(next);
    if (index >= questions.length - 1) {
      finish(next);
    } else {
      setIndex(index + 1);
    }
  };

  const back = () => {
    setIndex((i) => Math.max(0, i - 1));
  };

  const restart = () => {
    setAnswers({});
    setIndex(0);
    setScore(null);
    setStarted(true);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Keyboard selection (A–G / 1–9) without re-binding the listener each render.
  const live = React.useRef({ started, score, index, handleSelect });
  React.useEffect(() => {
    live.current = { started, score, index, handleSelect };
  });
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const state = live.current;
      if (!state.started || state.score) return;
      const q = questions[state.index];
      if (!q) return;
      const k = e.key.toLowerCase();
      let i = -1;
      if (k >= "1" && k <= "9") i = Number(k) - 1;
      else if (k >= "a" && k <= "g") i = k.charCodeAt(0) - 97;
      if (i >= 0 && i < q.options.length) {
        e.preventDefault();
        state.handleSelect(q.options[i].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (score) {
    return <QuizResult score={score} onRestart={restart} />;
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-8 text-center shadow-soft sm:p-14">
        <span className="eyebrow eyebrow--plain">Agent Fit Quiz</span>
        <h1 className="mt-5 text-h1 font-semibold text-balance">
          How much of your week could a private AI return?
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-lede text-pretty text-muted-foreground">
          {questions.length}&nbsp;questions, about two minutes. You&apos;ll
          receive an Agent Fit Score and a tailored build recommendation to
          bring to your discovery call.
        </p>
        <div className="mt-9 flex justify-center">
          <Button size="lg" onClick={start}>
            Begin the assessment
          </Button>
        </div>
        <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-subtle-foreground">
          No account required · Answers stay in your browser
        </p>
      </div>
    );
  }

  const question = questions[index];
  if (!question) return null;
  const lastKey = LETTERS[question.options.length - 1] ?? "D";

  return (
    <div className="mx-auto max-w-2xl">
      <QuizProgress current={index + 1} total={questions.length} />

      <div className="mt-9 min-h-[24rem]">
        <div key={question.id} className="quiz-in">
          <QuizQuestion
            question={question}
            selectedId={answers[question.id]}
            onSelect={handleSelect}
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={index === 0}
          className="text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        >
          ← Back
        </button>
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.08em] text-subtle-foreground">
          Press A–{lastKey} or click
        </span>
      </div>
    </div>
  );
}
