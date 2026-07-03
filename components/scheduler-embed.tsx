/**
 * Booking calendar. Renders an embedded scheduler (Cal.com or Calendly) when
 * NEXT_PUBLIC_SCHEDULER_URL is set; otherwise shows a configuration placeholder.
 *
 * Payment for the $79 consult is collected inside the scheduler at booking time
 * (Cal.com and Calendly both support requiring Stripe payment), so no separate
 * checkout is needed on the site.
 */
export function SchedulerEmbed({ url }: { url?: string }) {
  if (url) {
    return (
      <div className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-soft">
        <iframe
          src={url}
          title="Book your consult"
          loading="lazy"
          className="h-[720px] w-full"
          allow="payment; camera; microphone; fullscreen"
        />
      </div>
    );
  }

  return (
    <div className="mt-4 flex min-h-[12rem] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-hairline-strong bg-warm/60 p-8 text-center">
      <p className="font-medium text-heading">Booking calendar goes here</p>
      <p className="max-w-sm text-sm text-secondary">
        Connect a Cal.com or Calendly link with payment enabled, then set{" "}
        <code className="rounded bg-surface px-1.5 py-0.5 text-[0.8em]">
          NEXT_PUBLIC_SCHEDULER_URL
        </code>
        . Until then, the form sends us your details and we will email you times.
      </p>
    </div>
  );
}
