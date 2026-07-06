import { ApertureMark } from "@/components/ui/aperture";
import { MonoLabel } from "@/components/ui/mono-label";
import { HeroCommandBar } from "@/components/home/hero-command-bar";
import { cn } from "@/lib/cn";

const TRUST = [
  "No software markup",
  "You own the setup",
  "Built around your workflow",
  "One-time + monthly",
];

// Illustrative snapshot of a working assistant — numbers are examples, not a
// promise (see the disclaimer below and CLAUDE.md's honesty rules).
const STATS: {
  value: string;
  unit?: string;
  caption: string;
  highlight?: boolean;
}[] = [
  { value: "12", caption: "Inbox triaged" },
  { value: "4", caption: "Priorities set" },
  { value: "7", caption: "Follow-ups queued" },
  { value: "5.5", unit: " hrs", caption: "Reclaimed / week", highlight: true },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden mesh-hero border-b border-white/10">
      <div className="blueprint-grid" aria-hidden="true" />

      {/* Decorative orbit mark: gentle float, slow spin. */}
      <div
        className="sv-float pointer-events-none absolute -right-10 -top-[60px] h-[360px] w-[360px] opacity-50"
        aria-hidden="true"
      >
        <ApertureMark variant="mono" spin className="h-full w-full text-accent" />
      </div>

      <div className="container-edge relative pb-16 pt-20 md:pb-[68px] md:pt-[78px]">
        <div className="mx-auto max-w-[820px] text-center">
          <span className="inline-flex items-center gap-[9px] rounded-pill border border-accent-onDark/[0.22] bg-accent-onDark/10 px-[15px] py-[7px] font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-accent-onDark">
            <span
              className="sv-pulse size-[7px] rounded-full bg-signal"
              aria-hidden="true"
            />
            Personal AI · Small-business automation
          </span>

          <h1 className="mt-[26px] text-balance font-display text-[clamp(2.5rem,1.1rem+4.4vw,4.125rem)] font-normal leading-[1.02] tracking-[-0.025em] text-white">
            Give yourself back the hours{" "}
            <span className="italic text-accent-onDark">AI</span> was supposed to
            save.
          </h1>

          <p className="mx-auto mt-[26px] max-w-[600px] text-[18.5px] leading-[1.6] text-white/[0.74]">
            We build practical AI assistants and workflows around your actual
            life or business: the busywork that keeps stealing your attention,
            handled.
          </p>

          <HeroCommandBar />

          <ul className="mt-[22px] flex flex-wrap justify-center gap-2">
            {TRUST.map((item) => (
              <li
                key={item}
                className="rounded-pill border border-white/[0.12] bg-white/5 px-[13px] py-[6px] font-mono text-[11px] text-white/60"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Floating stat row (replaces the old dashboard mockup). */}
        <div
          className="relative mx-auto mt-14 grid max-w-[900px] grid-cols-2 gap-[14px] sm:grid-cols-4"
          role="img"
          aria-label="Illustrative assistant snapshot: 12 inbox items triaged, 4 priorities set, 7 follow-ups queued, and 5.5 hours reclaimed per week."
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.caption}
              className={cn(
                "sv-stream rounded-2xl border p-5 backdrop-blur-[10px]",
                stat.highlight
                  ? "border-accent-onDark/30 bg-[linear-gradient(160deg,rgba(42,111,151,0.3),rgba(46,125,125,0.16))]"
                  : "border-white/10 bg-white/[0.045]",
              )}
              style={{ animationDelay: `${0.1 + i * 0.12}s` }}
            >
              <p className="nums font-display text-[34px] leading-none text-white">
                {stat.value}
                {stat.unit ? (
                  <span className="text-[15px] text-accent-onDark">
                    {stat.unit}
                  </span>
                ) : null}
              </p>
              <MonoLabel
                className={cn(
                  "mt-[9px] block text-[10px] tracking-[0.08em]",
                  stat.highlight ? "text-[#a9d4e8]" : "text-white/55",
                )}
              >
                {stat.caption}
              </MonoLabel>
            </div>
          ))}
        </div>

        <p className="mt-4 text-center font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/40">
          Illustrative — your numbers depend on what we build together.
        </p>
      </div>
    </section>
  );
}
