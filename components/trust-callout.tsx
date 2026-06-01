import { trustPoints } from "@/lib/site-copy";

export function TrustCallout() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {trustPoints.map((point) => (
        <div
          key={point.title}
          className="rounded-2xl border border-border bg-surface p-6"
        >
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-accent-soft">
            <svg
              viewBox="0 0 20 20"
              className="h-4.5 w-4.5 text-accent"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 2.5l5.5 2v4.2c0 3.4-2.3 6.4-5.5 7.3-3.2-0.9-5.5-3.9-5.5-7.3V4.5l5.5-2z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <path
                d="M7.4 10l1.8 1.8 3.4-3.6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold">{point.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {point.body}
          </p>
        </div>
      ))}
    </div>
  );
}
