"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";
import { getService } from "@/lib/services";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Values = {
  name: string;
  email: string;
  focus: string;
  bottleneck: string;
  tools: string;
  urgency: string;
  notes: string;
};

const FOCUS = [
  { value: "personal", label: "Personal life" },
  { value: "business", label: "Business" },
  { value: "both", label: "Both" },
];

const URGENCY = [
  { value: "this-week", label: "This week" },
  { value: "this-month", label: "This month" },
  { value: "this-quarter", label: "This quarter" },
  { value: "exploring", label: "Just exploring" },
];

export function BookForm() {
  const [values, setValues] = React.useState<Values>({
    name: "",
    email: "",
    focus: "",
    bottleneck: "",
    tools: "",
    urgency: "",
    notes: "",
  });
  const [errors, setErrors] = React.useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [prefill, setPrefill] = React.useState<{ band: string; service: string }>({
    band: "",
    service: "",
  });

  const recommended = prefill.service ? getService(prefill.service) : undefined;

  // Read quiz context from the URL and a prior quiz result after mount. This is
  // a browser-only read (avoids gating the whole form behind useSearchParams /
  // Suspense), and the effect is the correct place for this one-time sync.
  React.useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const service = sp.get("service") ?? "";
    const band = sp.get("band") ?? "";
    // Free-text intent carried from the hero command bar (e.g. "summarize my inbox").
    const q = sp.get("q") ?? "";
    let domain = "";
    try {
      const raw = sessionStorage.getItem("quizResult");
      if (raw) domain = JSON.parse(raw).domain ?? "";
    } catch {
      // ignore
    }
    /* eslint-disable react-hooks/set-state-in-effect -- one-time mount sync from the URL + sessionStorage, which cannot run during render */
    if (service || band) setPrefill({ band, service });
    if (domain) setValues((v) => (v.focus ? v : { ...v, focus: domain }));
    if (q) setValues((v) => (v.bottleneck ? v : { ...v, bottleneck: q }));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const set = (key: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<Record<keyof Values, string>> = {};
    if (!values.name.trim()) errs.name = "Your name helps us prepare.";
    if (!EMAIL_RE.test(values.email)) errs.email = "Enter a valid email address.";
    if (!values.focus) errs.focus = "Pick one so we route you correctly.";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          band: prefill.band || null,
          service: prefill.service || null,
          source: "book",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      trackEvent("lead_submitted", { source: "book", focus: values.focus });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/20 bg-accent-light/60 p-8 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent text-white">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-5 font-display text-h3 text-heading">
          Thanks, {values.name.split(" ")[0]}.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-pretty text-secondary">
          We have your details and will be in touch at {values.email} to confirm
          your $79 AI Clarity Consult and a time. You will get a one-page AI
          Leverage Map within 24 hours of the call.
        </p>
        <p className="mt-4 text-xs text-muted">
          Prefer not to wait? Use the calendar to book and pay instantly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {recommended ? (
        <div className="rounded-xl border border-accent/15 bg-accent-light/50 px-4 py-3 text-sm text-secondary">
          Based on your quiz, we would start with{" "}
          <span className="font-medium text-heading">{recommended.name}</span>.
          We will confirm on the call.
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={errors.name} required>
          <input
            id="name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email} required>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            className={inputClass(!!errors.email)}
          />
        </Field>
      </div>

      <Field label="Is this for personal, business, or both?" error={errors.focus} required>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Focus">
          {FOCUS.map((opt) => {
            const selected = values.focus === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => set("focus", opt.value)}
                className={cn(
                  "rounded-pill border px-4 py-2 text-sm font-medium transition-colors duration-150",
                  selected
                    ? "border-accent bg-accent text-white"
                    : "border-hairline-strong bg-surface text-heading hover:border-accent/40 hover:bg-warm",
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="What is the current bottleneck?" htmlFor="bottleneck">
        <input
          id="bottleneck"
          name="bottleneck"
          placeholder="e.g. inbox triage, lead follow-up, reporting"
          value={values.bottleneck}
          onChange={(e) => set("bottleneck", e.target.value)}
          className={inputClass(false)}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Tools you already use" htmlFor="tools">
          <input
            id="tools"
            name="tools"
            placeholder="Gmail, Notion, a CRM…"
            value={values.tools}
            onChange={(e) => set("tools", e.target.value)}
            className={inputClass(false)}
          />
        </Field>
        <Field label="Urgency" htmlFor="urgency">
          <select
            id="urgency"
            name="urgency"
            value={values.urgency}
            onChange={(e) => set("urgency", e.target.value)}
            className={cn(inputClass(false), "appearance-none bg-surface")}
          >
            <option value="">Select…</option>
            {URGENCY.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Anything else? (optional)" htmlFor="notes">
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={values.notes}
          onChange={(e) => set("notes", e.target.value)}
          className={cn(inputClass(false), "min-h-[5.5rem] py-3")}
        />
      </Field>

      {status === "error" ? (
        <p className="text-sm text-[color:var(--color-accent-warm-hover)]">
          Something went wrong sending that. Please try again, or email us
          directly.
        </p>
      ) : null}

      <Button type="submit" size="lg" className="self-start" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Request my $79 consult"}
      </Button>

      <p className="text-xs text-muted">
        We only use your details to set up the consult. No spam, and we never
        sell your information.
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-heading">
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      {children}
      {error ? <p className="text-sm text-[color:var(--color-accent-warm-hover)]">{error}</p> : null}
    </div>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "h-12 w-full rounded-xl border bg-surface px-4 text-base text-heading shadow-soft",
    "placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    invalid ? "border-[color:var(--color-accent-warm)]" : "border-hairline-strong focus-visible:border-accent",
  );
}
