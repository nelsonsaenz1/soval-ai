import { Button } from "@/components/ui/button";
import { ConsultButton } from "@/components/consult-button";
import { MeshBackground } from "@/components/motion/mesh-background";

/**
 * Shared bottom call-to-action band (dark, mesh). Appears on every page per the
 * conversion rules. Defaults to the homepage final-CTA copy.
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
    <section className="relative isolate overflow-hidden mesh-dark text-on-dark">
      <MeshBackground />
      <div className="container-edge relative flex flex-col items-center gap-6 py-20 text-center md:py-28">
        <h2 className="max-w-3xl text-balance font-display text-h1 text-on-dark">
          {title}
        </h2>
        <p className="max-w-2xl text-pretty text-lede text-on-dark-secondary">
          {subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <ConsultButton source={source} variant="light" magnetic />
          <Button href="/quiz" variant="outlineDark" size="lg">
            Take the quiz
          </Button>
        </div>
        <p className="text-sm text-on-dark-muted">
          Give yourself back 5 hours this month.
        </p>
      </div>
    </section>
  );
}
