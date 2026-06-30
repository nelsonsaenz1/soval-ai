import type { FaqItem } from "@/lib/faq";

/**
 * Accessible FAQ accordion built on native <details>/<summary> — keyboard
 * navigable and zero-JS. Connected list with tinted hairlines.
 */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-soft">
      <dl className="divide-y divide-hairline">
        {items.map((item) => (
          <div key={item.q}>
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-heading transition-colors duration-150 hover:bg-warm focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent">
                <dt className="font-medium">{item.q}</dt>
                <span
                  className="shrink-0 text-muted transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-open:rotate-45"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </span>
              </summary>
              <dd className="px-6 pb-5 pr-12 text-pretty text-secondary">
                {item.a}
              </dd>
            </details>
          </div>
        ))}
      </dl>
    </div>
  );
}
