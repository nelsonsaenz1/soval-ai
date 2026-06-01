import { Button } from "@/components/ui/button";
import { ctaBand } from "@/lib/site-copy";
import { CtaBandActions } from "@/components/cta-band-actions";

export function CtaBand({
  eyebrow = "The next step",
  title = ctaBand.title,
  body = ctaBand.body,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-surface-contrast text-on-contrast">
      <div className="container-edge py-20 md:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <span className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.12em] text-accent-warm">
            {eyebrow}
          </span>
          <h2 className="text-h2 font-semibold text-balance">{title}</h2>
          <p className="max-w-2xl text-lede text-pretty text-on-contrast-muted">
            {body}
          </p>
          <CtaBandActions>
            <Button href="/quiz" size="lg">
              {ctaBand.primary.label}
            </Button>
          </CtaBandActions>
        </div>
      </div>
    </section>
  );
}
