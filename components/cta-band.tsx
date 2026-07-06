import { Button } from "@/components/ui/button";
import { ConsultButton } from "@/components/consult-button";
import { MonoLabel } from "@/components/ui/mono-label";

/**
 * Shared bottom call-to-action band (dark, glowing mesh). Appears on every page
 * per the conversion rules. Defaults to the homepage final-CTA copy.
 */
export function CtaBand({
  title = "You do not need to become an AI expert.",
  subtitle = "You need a system that gives you time back. Book the $79 consult and we will find the highest-leverage place to start.",
  source = "cta_band",
}: {
  title?: string;
  subtitle?: string;
  source?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden mesh-cta text-on-dark">
      <div className="blueprint-grid blueprint-grid--cta" aria-hidden="true" />
      <div className="container-edge relative flex flex-col items-center py-[92px] text-center">
        <h2 className="max-w-[680px] text-balance font-display text-[clamp(2.2rem,1.4rem+2.6vw,2.875rem)] leading-[1.08] tracking-[-0.02em] text-white">
          {title}
        </h2>
        <p className="mt-5 max-w-[560px] text-pretty text-[17px] leading-[1.6] text-white/[0.72]">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex rounded-pill shadow-[0_12px_30px_rgba(143,194,221,0.25)]">
            <ConsultButton source={source} variant="onDarkPrimary" size="lg" />
          </span>
          <Button href="/quiz" variant="outlineDark" size="lg">
            Take the quiz
          </Button>
        </div>
        <MonoLabel className="mt-[22px] text-[11.5px] tracking-[0.08em] text-white/50">
          Give yourself back 5 hours this month
        </MonoLabel>
      </div>
    </section>
  );
}
