import type { Metadata } from "next";
import { BookForm } from "@/components/book-form";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Book the $79 AI Clarity Consult",
  description:
    "Book a 45-minute AI Clarity Consult. We identify the highest-leverage place AI can give you time back and send a one-page AI Leverage Map within 24 hours.",
};

const INCLUDES = [
  "45-minute Zoom or screen-share",
  "A short pre-call intake so we arrive prepared",
  "A one-page AI Leverage Map within 24 hours",
  "An honest recommendation, including do-nothing or DIY",
];

export default function BookPage() {
  return (
    <>
      <section className="mesh-cream border-b border-hairline">
        <div className="container-edge py-14 md:py-16">
          <div className="max-w-3xl">
            <span className="eyebrow">Book</span>
            <h1 className="mt-6 text-balance font-display text-h1 text-heading">
              Book the $79 AI Clarity Consult.
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lede text-secondary">
              In 45 minutes, we will identify the highest-leverage place AI can
              give you time back and send a one-page AI Leverage Map within 24
              hours. The $79 is credited toward any package you book within 14
              days.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-edge grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: what you get + scheduler/payment placeholders */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="font-display text-h3 text-heading">
                What is included
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex gap-2.5 text-secondary">
                    <svg viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-accent" fill="none" aria-hidden="true">
                      <path d="M3.5 8.5l2.5 2.5 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-pretty">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-h3 text-heading">Pick a time</h2>
              {BRAND.schedulerEmbedUrl ? (
                <iframe
                  src={BRAND.schedulerEmbedUrl}
                  title="Booking calendar"
                  className="mt-4 h-[34rem] w-full rounded-2xl border border-hairline"
                />
              ) : (
                <div className="mt-4 flex min-h-[12rem] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-hairline-strong bg-warm/60 p-8 text-center">
                  <p className="font-medium text-heading">
                    Booking calendar embeds here
                  </p>
                  <p className="max-w-sm text-sm text-secondary">
                    Cal.com, Calendly, or SavvyCal. Set{" "}
                    <code className="rounded bg-surface px-1.5 py-0.5 text-[0.8em]">
                      BRAND.schedulerEmbedUrl
                    </code>{" "}
                    to go live. Until then, submit the form and we will email you
                    times.
                  </p>
                </div>
              )}
              <p className="mt-3 text-xs text-muted">
                Payment ($79) is collected once a scheduler is connected. For now,
                send the request and we will follow up to confirm and collect
                payment.
              </p>
            </div>
          </div>

          {/* Right: intake form */}
          <div className="rounded-2xl border border-hairline bg-surface p-7 shadow-lift sm:p-9">
            <h2 className="font-display text-h3 text-heading">
              Tell us where to start
            </h2>
            <p className="mt-2 text-sm text-secondary">
              A few details so the consult is useful from minute one.
            </p>
            <div className="mt-6">
              <BookForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
