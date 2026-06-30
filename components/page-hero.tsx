import * as React from "react";

/**
 * Generic inner-page hero. Warm mesh-cream band with eyebrow, serif headline,
 * lede, optional meta row (e.g. price), and an actions slot for CTAs.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  meta,
  actions,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section className="mesh-cream border-b border-hairline">
      <div className="container-edge py-16 md:py-20">
        <div className="flex max-w-3xl flex-col">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-6 text-balance font-display text-h1 text-heading">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-pretty text-lede text-secondary">
              {description}
            </p>
          ) : null}
          {meta ? <div className="mt-6">{meta}</div> : null}
          {actions ? (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {actions}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
