"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/service-card";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";
import {
  QUIZ_QUESTIONS,
  scoreQuiz,
  type QuizAnswers,
  type QuizResult,
} from "@/lib/quiz";
import { getService } from "@/lib/services";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function QuizFlow() {
  const total = QUIZ_QUESTIONS.length;
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<QuizAnswers>({});
  const [email, setEmail] = React.useState("");
  const [result, setResult] = React.useState<QuizResult | null>(null);
  const started = React.useRef(false);

  const current = QUIZ_QUESTIONS[index];

  const ensureStarted = () => {
    if (!started.current) {
      started.current = true;
      trackEvent("quiz_started");
    }
  };

  const finish = (finalAnswers: QuizAnswers) => {
    const res = scoreQuiz(finalAnswers);
    setResult(res);
    trackEvent("quiz_completed", { band: res.bandId });
    trackEvent("band_recommended", {
      band: res.bandId,
      service: res.band.recommendedServiceSlug,
    });
    try {
      sessionStorage.setItem(
        "quizResult",
        JSON.stringify({
          band: res.bandId,
          bandLabel: res.band.label,
          service: res.band.recommendedServiceSlug,
          email: finalAnswers.email ?? "",
          domain: finalAnswers.domain ?? "",
        }),
      );
    } catch {
      // sessionStorage can be unavailable (private mode); non-critical.
    }
  };

  const selectOption = (value: string) => {
    ensureStarted();
    const next = { ...answers, [current.id]: value };
    setAnswers(next);
    window.setTimeout(() => {
      if (index < total - 1) setIndex((i) => i + 1);
      else finish(next);
    }, 220);
  };

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) return;
    const next = { ...answers, email };
    setAnswers(next);
    finish(next);
  };

  const restart = () => {
    setResult(null);
    setAnswers({});
    setEmail("");
    setIndex(0);
    started.current = false;
  };

  if (result) {
    return (
      <QuizResultView
        result={result}
        email={answers.email ?? email}
        onRetake={restart}
      />
    );
  }

  const progress = Math.round((index / total) * 100);

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          <span className="nums">{String(index + 1).padStart(2, "0")}</span> /{" "}
          <span className="nums">{String(total).padStart(2, "0")}</span>
        </span>
        {index > 0 ? (
          <button
            type="button"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            className="text-sm font-medium text-secondary hover:text-heading"
          >
            ← Back
          </button>
        ) : (
          <span className="text-xs text-muted">About 2 minutes</span>
        )}
      </div>
      <div
        className="mt-3 h-1.5 overflow-hidden rounded-pill bg-warm"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-pill bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div key={current.id} className="quiz-in mt-10">
        <p className="eyebrow eyebrow--plain">{current.eyebrow}</p>
        <h2 className="mt-3 text-balance font-display text-h2 text-heading">
          {current.prompt}
        </h2>
        {current.helper ? (
          <p className="mt-3 text-pretty text-secondary">{current.helper}</p>
        ) : null}

        {current.type === "single" && current.options ? (
          <div
            className="mt-8 flex flex-col gap-3"
            role="radiogroup"
            aria-label={current.prompt}
          >
            {current.options.map((opt) => {
              const selected = answers[current.id] === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => selectOption(opt.value)}
                  className={cn(
                    "group flex items-center justify-between gap-4 rounded-xl border px-5 py-4 text-left transition-[transform,border-color,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.99]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                    selected
                      ? "border-accent bg-accent-light shadow-soft"
                      : "border-hairline-strong bg-surface hover:border-accent/40 hover:bg-warm",
                  )}
                >
                  <span className="font-medium text-heading">{opt.label}</span>
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-150",
                      selected
                        ? "border-accent bg-accent text-white"
                        : "border-hairline-strong text-transparent group-hover:border-accent/50",
                    )}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 16 16" className="size-3" fill="none">
                      <path
                        d="M3.5 8.5l2.5 2.5 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}

        {current.type === "email" ? (
          <form onSubmit={submitEmail} className="mt-8 flex flex-col gap-4">
            <label htmlFor="quiz-email" className="sr-only">
              Email address
            </label>
            <input
              id="quiz-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                ensureStarted();
                setEmail(e.target.value);
              }}
              className="h-[3.25rem] w-full rounded-xl border border-hairline-strong bg-surface px-5 text-base text-heading shadow-soft placeholder:text-muted focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
            <Button
              type="submit"
              size="lg"
              className="self-start"
              disabled={!EMAIL_RE.test(email)}
            >
              See my result →
            </Button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

function QuizResultView({
  result,
  email,
  onRetake,
}: {
  result: QuizResult;
  email: string;
  onRetake: () => void;
}) {
  const { band, reasons } = result;
  const service = getService(band.recommendedServiceSlug);
  const [emailState, setEmailState] = React.useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");

  const bookHref = `/book?band=${band.id}&service=${band.recommendedServiceSlug}`;

  const sendResults = async () => {
    if (!email) return;
    setEmailState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: email.split("@")[0] || "Quiz lead",
          email,
          source: "quiz_result",
          band: band.id,
          service: band.recommendedServiceSlug,
        }),
      });
      setEmailState(res.ok ? "sent" : "error");
    } catch {
      setEmailState("error");
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex flex-col items-center text-center">
        <Badge variant="accent" dot>
          Your recommended path
        </Badge>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          {band.label}
        </p>
        <h1 className="mt-3 text-balance font-display text-h1 text-heading">
          {band.headline}
        </h1>
        <p className="mt-5 max-w-2xl text-pretty text-lede text-secondary">
          {band.description}
        </p>
      </div>

      {/* Reasons */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {reasons.map((reason, i) => (
          <div
            key={i}
            className="rounded-2xl border border-hairline bg-surface p-5 shadow-soft"
          >
            <span className="nums text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Reason {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-pretty text-sm text-secondary">{reason}</p>
          </div>
        ))}
      </div>

      {/* Recommended service */}
      {service ? (
        <div className="mt-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted">
            We would start you here
          </p>
          <ServiceCard service={service} />
        </div>
      ) : null}

      {/* Actions */}
      <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-accent/15 bg-accent-light/50 p-7 text-center">
        <h2 className="font-display text-h3 text-heading">
          Book your $79 AI Clarity Consult
        </h2>
        <p className="max-w-xl text-pretty text-secondary">
          We will confirm this recommendation, or adjust it, and send a one-page
          plan within 24 hours. The $79 is credited toward any package you book.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            href={bookHref}
            size="lg"
            onClick={() =>
              trackEvent("consult_clicked", {
                source: "quiz_result",
                band: band.id,
              })
            }
          >
            {band.ctaLabel}
          </Button>
          {email ? (
            <Button
              type="button"
              variant="secondary"
              size="lg"
              onClick={sendResults}
              disabled={emailState === "sending" || emailState === "sent"}
            >
              {emailState === "sent"
                ? "Sent ✓"
                : emailState === "sending"
                  ? "Sending…"
                  : "Email me my results"}
            </Button>
          ) : null}
        </div>
        {emailState === "sent" ? (
          <p className="text-sm text-secondary">
            On its way to {email}. (Placeholder: wire up email delivery to send
            for real.)
          </p>
        ) : null}
        {emailState === "error" ? (
          <p className="text-sm text-secondary">
            Could not send just now. You can still book the consult above.
          </p>
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6 text-sm">
        <button
          type="button"
          onClick={onRetake}
          className="font-medium text-accent hover:underline"
        >
          Retake the quiz
        </button>
        <Link
          href="/services"
          className="font-medium text-secondary hover:text-heading"
        >
          See all services
        </Link>
      </div>

      <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-muted">
        This recommendation is a starting point based on your answers, not a
        guarantee. We confirm the right scope with you on the consult.
      </p>
    </div>
  );
}
