import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Book a discovery call",
  description:
    "Tell us a little about your household and we'll set up a discovery call to map out exactly what we would build. No obligation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Discovery call"
        title="Let's map out what we'd build for you."
        description="Share a few details and we'll reach out within one business day to schedule a relaxed, no-obligation discovery call."
        primaryCta={null}
        secondaryCta={null}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div className="rounded-2xl border border-border bg-surface p-7 sm:p-9">
            <Suspense fallback={<FormSkeleton />}>
              <ContactForm />
            </Suspense>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-surface-muted p-7">
              <h2 className="text-lg font-semibold">What happens next</h2>
              <ol className="mt-4 flex flex-col gap-4">
                {[
                  "We review your details and reach out within one business day.",
                  "We schedule a relaxed discovery call to understand your life.",
                  "You leave with a clear plan for what we'd build first.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent-strong">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* TODO: Embed your scheduler (Cal.com / Calendly / SavvyCal) here. */}
            <div className="rounded-2xl border border-dashed border-border-strong bg-surface p-7 text-center">
              <p className="text-sm font-medium text-foreground">
                Prefer to book instantly?
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                A live scheduling calendar will appear here once connected.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-hidden="true">
      {[0, 1, 2].map((row) => (
        <div key={row} className="grid gap-5 sm:grid-cols-2">
          <div className="h-[4.5rem] rounded-xl bg-surface-muted" />
          <div className="h-[4.5rem] rounded-xl bg-surface-muted" />
        </div>
      ))}
      <div className="h-12 w-56 rounded-xl bg-surface-muted" />
    </div>
  );
}
