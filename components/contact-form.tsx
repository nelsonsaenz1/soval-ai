"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

const TIERS = ["Essentials", "Concierge", "Estate", "Not sure yet"] as const;
const CONTACT_METHODS = ["Email", "Phone call", "Text message"] as const;

const fieldClasses =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-[0.95rem] text-foreground " +
  "placeholder:text-subtle-foreground transition-colors duration-150 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "focus:border-accent";

const labelClasses = "text-sm font-medium text-foreground";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className={labelClasses}>
      {children}
    </label>
  );
}

export function ContactForm() {
  const params = useSearchParams();
  const tierParam = params.get("tier");
  const scoreParam = params.get("score");

  const initialTier = TIERS.includes(tierParam as (typeof TIERS)[number])
    ? (tierParam as (typeof TIERS)[number])
    : "Not sure yet";

  const [tier, setTier] = React.useState<string>(initialTier);
  const [firstFocus, setFirstFocus] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  // The query-param tier is already applied via initial state. When the visitor
  // arrives without one, fall back to the quiz result saved in sessionStorage.
  React.useEffect(() => {
    if (tierParam) return;
    const id = requestAnimationFrame(() => {
      try {
        const stored = sessionStorage.getItem("np_quiz_result");
        if (!stored) return;
        const parsed = JSON.parse(stored) as { tier?: string };
        if (parsed.tier && TIERS.includes(parsed.tier as (typeof TIERS)[number])) {
          setTier(parsed.tier);
        }
      } catch {
        // ignore unavailable storage
      }
    });
    return () => cancelAnimationFrame(id);
  }, [tierParam]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());

    setStatus("submitting");
    try {
      // TODO: wire this route to your CRM / email / scheduler backend.
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, quizScore: scoreParam ?? null }),
      });
      if (!res.ok) throw new Error("Request failed");
      trackEvent("contact_form_submitted", {
        tier: String(payload.tier ?? ""),
        contactMethod: String(payload.contactMethod ?? ""),
        fromQuiz: Boolean(scoreParam),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent-border bg-accent-soft p-8 text-center sm:p-12">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-foreground">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
            <path
              d="M5 12.5l4 4 10-10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mt-5 text-2xl font-semibold">Thank you. We&apos;ll be in touch.</h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          We&apos;ve received your request and will reach out within one business
          day to schedule your discovery call.
        </p>
        <p className="mt-4 text-xs text-subtle-foreground">
          {/* TODO: Replace with confirmation email + calendar invite once a backend is connected. */}
          Prefer to pick a time now? A scheduling link will appear here once the
          calendar is connected.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <input id="name" name="name" required autoComplete="name" className={fieldClasses} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClasses}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClasses}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="location">City / neighborhood</Label>
          <input
            id="location"
            name="location"
            autoComplete="address-level2"
            className={fieldClasses}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="tier">Which tier are you interested in?</Label>
          <select
            id="tier"
            name="tier"
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className={fieldClasses}
          >
            {TIERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="contactMethod">Preferred contact method</Label>
          <select
            id="contactMethod"
            name="contactMethod"
            defaultValue={CONTACT_METHODS[0]}
            className={fieldClasses}
          >
            {CONTACT_METHODS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="firstFocus">
          What would you want your agent to handle first?
        </Label>
        <textarea
          id="firstFocus"
          name="firstFocus"
          rows={4}
          value={firstFocus}
          onChange={(e) => setFirstFocus(e.target.value)}
          placeholder="e.g. my calendar and inbox, our family logistics, travel planning…"
          className={fieldClasses}
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-accent-strong" role="alert">
          Something went wrong sending your request. Please try again, or email
          us directly.
        </p>
      ) : null}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Request my discovery call"}
        </Button>
        <p className="text-xs text-subtle-foreground">
          No passwords or sensitive credentials. We&apos;ll set those up
          securely with you, never in a form.
        </p>
      </div>
    </form>
  );
}
