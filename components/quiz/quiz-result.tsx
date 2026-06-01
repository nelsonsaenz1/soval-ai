"use client";

import * as React from "react";
import { ScoreGauge } from "@/components/score-gauge";
import { TierCard } from "@/components/tier-card";
import { Button } from "@/components/ui/button";
import { tiers } from "@/lib/site-copy";
import { trackEvent } from "@/lib/analytics";
import type { QuizScore } from "@/lib/quiz/scoring";

export function QuizResult({
  score,
  onRestart,
}: {
  score: QuizScore;
  onRestart: () => void;
}) {
  const tier = tiers.find((t) => t.id === score.recommendedTier) ?? tiers[0];
  const [emailed, setEmailed] = React.useState(false);

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-14">
      {/* Score + summary */}
      <div className="grid items-center gap-10 rounded-2xl border border-border bg-surface p-7 shadow-soft sm:p-10 lg:grid-cols-[auto_1fr]">
        <div className="mx-auto">
          <ScoreGauge score={score.total} band={score.resultBand} />
        </div>
        <div className="flex flex-col gap-4">
          <span className="eyebrow">Your Agent Fit Score</span>
          <h1 className="text-h2 font-semibold text-balance">
            {score.headline}
          </h1>
          <p className="text-lede text-pretty text-muted-foreground">
            {score.summary}
          </p>
        </div>
      </div>

      {/* Reasons */}
      <section className="flex flex-col gap-6">
        <h2 className="text-h3 font-semibold">Why this fits your life</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {score.reasons.map((reason, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6 shadow-soft"
            >
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] tabular-nums text-accent-strong">
                Reason {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {reason}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended tier + first use cases */}
      <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-5">
          <h2 className="text-h3 font-semibold">Your recommended build</h2>
          <TierCard tier={tier} recommended highlight />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-h3 font-semibold">Your first three use cases</h2>
            <ul className="flex flex-col gap-2.5">
              {score.useCases.map((useCase) => (
                <li
                  key={useCase}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground shadow-soft"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.5 8.5l2.5 2.5 6-6"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-h3 font-semibold">What we&apos;d build first</h2>
            <ol className="flex flex-col gap-4">
              {score.roadmap.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-xs font-semibold tabular-nums text-accent-strong">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {step.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA — inverted */}
      <section className="rounded-2xl bg-surface-contrast px-7 py-12 text-center text-on-contrast sm:px-10">
        <span className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.12em] text-accent-warm">
          The next step
        </span>
        <h2 className="mx-auto mt-4 max-w-xl text-h2 font-semibold text-balance">
          Let&apos;s confirm your build on a discovery call.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-on-contrast-muted">
          We&apos;ll review your result, answer your questions, and map exactly
          what we&apos;d install. No obligation.
        </p>
        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            href={`/contact?tier=${score.recommendedTier}&score=${score.total}`}
            size="lg"
            onClick={() =>
              trackEvent("book_call_clicked", {
                location: "quiz-result",
                tier: score.recommendedTier,
                score: score.total,
              })
            }
          >
            Book your discovery call
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="border-white/20 bg-transparent text-on-contrast hover:border-white/40 hover:bg-white/10"
            onClick={() => setEmailed(true)}
            aria-live="polite"
          >
            {emailed ? "We'll send it over" : "Email me my results"}
          </Button>
        </div>
        {emailed ? (
          <p className="mt-4 text-sm text-on-contrast-muted">
            Add your email on the discovery-call form and we&apos;ll include
            this summary.
          </p>
        ) : null}
      </section>

      <div className="flex flex-col items-center gap-3 text-center">
        <button
          type="button"
          onClick={onRestart}
          className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          Retake the quiz
        </button>
        <p className="mx-auto max-w-xl text-xs leading-relaxed text-subtle-foreground">
          Your Agent Fit Score is an advisory estimate. Your final tier and
          build are confirmed during your discovery call.
        </p>
      </div>
    </div>
  );
}
