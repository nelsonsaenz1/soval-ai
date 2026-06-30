import { ConsultButton } from "@/components/consult-button";

/**
 * Mid-page CTA card used across pages (lead-capture rule). Calm, single action.
 */
export function MidCta({
  title = "Not sure what you need?",
  subtitle = "Start with the $79 consult. We will map the highest-leverage place to begin, or tell you honestly if it is not worth paying for yet.",
  source = "mid_cta",
}: {
  title?: string;
  subtitle?: string;
  source?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-6 rounded-2xl border border-accent/15 bg-accent-light/60 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
      <div className="max-w-xl">
        <h3 className="font-display text-h3 text-heading">{title}</h3>
        <p className="mt-2 text-pretty text-secondary">{subtitle}</p>
      </div>
      <div className="shrink-0">
        <ConsultButton source={source} size="md" />
      </div>
    </div>
  );
}
