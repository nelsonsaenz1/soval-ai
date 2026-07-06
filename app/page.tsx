import { Hero } from "@/components/home/hero";
import { ToolingStrip } from "@/components/home/tooling-strip";
import { PathChooser } from "@/components/home/path-chooser";
import { ServicesMatrix } from "@/components/home/services-matrix";
import { FounderNote } from "@/components/home/founder-note";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/ui/reveal";
import { MonoLabel } from "@/components/ui/mono-label";

const PROBLEMS = [
  {
    title: "Your personal admin keeps expanding.",
    body: "Email, scheduling, errands, travel, school, notes, reminders, and research keep piling up.",
  },
  {
    title: "Your business leaks time in repeatable places.",
    body: "Forms, follow-ups, quotes, support emails, reporting, and handoffs eat hours every week.",
  },
  {
    title: "Generic AI advice does not survive contact with real life.",
    body: "You need a system built around your accounts, voice, clients, routines, and standards.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Map the bottleneck.",
    body: "We learn what is slow, repetitive, expensive, or mentally draining.",
  },
  {
    n: "02",
    title: "Design the simplest useful system.",
    body: "We choose the right tool stack, not the fanciest one.",
  },
  {
    n: "03",
    title: "Build with your real examples.",
    body: "Prompts, assistants, workflows, and automations are tested against your actual work.",
  },
  {
    n: "04",
    title: "Hand it over or keep improving.",
    body: "You can own it outright or keep us on monthly.",
  },
];

// 2px top-rule accent that cycles across the four steps.
const STEP_RULES = ["#2a6f97", "#2e7d7d", "#c4976c", "#8fc2dd"];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolingStrip />

      {/* Problem — darkest */}
      <section className="border-b border-white/10 bg-darkest">
        <div className="container-edge py-20">
          <Reveal>
            <div className="mx-auto mb-12 max-w-[680px] text-center">
              <MonoLabel className="text-[11.5px] font-semibold tracking-[0.14em] text-accent-onDark">
                The real AI problem
              </MonoLabel>
              <h2 className="mt-4 text-balance font-display text-[clamp(2rem,1.5rem+1.6vw,2.5rem)] leading-[1.1] tracking-[-0.02em] text-white">
                The tools are powerful. The setup is the bottleneck.
              </h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-white/[0.66]">
                The value is not the prompt. It is knowing what to automate, what
                to leave human, and how to make the workflow easy enough to use
                every week.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {PROBLEMS.map((problem, i) => (
                <div
                  key={problem.title}
                  className="rounded-[18px] border border-white/10 bg-white/[0.04] p-[30px] backdrop-blur-[6px]"
                >
                  <MonoLabel className="text-[12px] font-semibold tracking-[0.1em] text-accent-onDark">
                    {String(i + 1).padStart(2, "0")}
                  </MonoLabel>
                  <h3 className="mt-4 font-display text-[22px] leading-snug text-white">
                    {problem.title}
                  </h3>
                  <p className="mt-[10px] text-[14.5px] leading-[1.55] text-white/[0.62]">
                    {problem.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Path chooser — the one light "relief" section */}
      <section className="border-b border-hairline bg-cream">
        <div className="container-edge py-20">
          <Reveal>
            <div className="mx-auto mb-11 max-w-[640px] text-center">
              <MonoLabel className="text-[11.5px] font-semibold tracking-[0.14em] text-accent">
                Choose your path
              </MonoLabel>
              <h2 className="mt-4 text-balance font-display text-[clamp(1.9rem,1.4rem+1.6vw,2.375rem)] leading-[1.1] tracking-[-0.02em] text-heading">
                Choose the kind of time you want back.
              </h2>
              <p className="mt-4 text-[16px] leading-[1.6] text-secondary">
                Two places AI creates immediate leverage. Pick where you feel the
                drain.
              </p>
            </div>
            <PathChooser />
          </Reveal>
        </div>
      </section>

      {/* Services matrix — darkest */}
      <section className="border-b border-white/10 bg-darkest">
        <div className="container-edge py-20">
          <Reveal>
            <div className="mb-9 flex items-end justify-between gap-6">
              <div>
                <MonoLabel className="text-[11.5px] font-semibold tracking-[0.14em] text-accent-onDark">
                  Services
                </MonoLabel>
                <h2 className="mt-[14px] text-balance font-display text-[clamp(1.9rem,1.4rem+1.6vw,2.375rem)] leading-[1.1] tracking-[-0.02em] text-white">
                  Five focused offers. No bloated menu.
                </h2>
              </div>
              <MonoLabel className="hidden shrink-0 text-[11px] tracking-[0.1em] text-white/40 sm:block">
                05 / offers
              </MonoLabel>
            </div>
            <ServicesMatrix />
          </Reveal>
        </div>
      </section>

      {/* How it works — dark */}
      <section className="border-b border-white/10 bg-dark">
        <div className="container-edge py-20">
          <Reveal>
            <div className="mb-10 max-w-[640px]">
              <MonoLabel className="text-[11.5px] font-semibold tracking-[0.14em] text-accent-onDark">
                How it works
              </MonoLabel>
              <h2 className="mt-[14px] text-balance font-display text-[clamp(1.9rem,1.4rem+1.6vw,2.375rem)] leading-[1.1] tracking-[-0.02em] text-white">
                Simple process. Real deliverables.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((step, i) => (
                <div
                  key={step.n}
                  className="border-t-2 pt-6"
                  style={{ borderTopColor: STEP_RULES[i] }}
                >
                  <MonoLabel className="text-[11px] font-semibold tracking-[0.14em] text-accent-onDark">
                    Step {step.n}
                  </MonoLabel>
                  <h3 className="mt-[14px] font-display text-[20px] leading-snug text-white">
                    {step.title}
                  </h3>
                  <p className="mt-[9px] text-[13.5px] leading-[1.5] text-white/60">
                    {step.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder — darkest, with a soft top glow */}
      <section className="relative overflow-hidden border-b border-white/10 bg-darkest">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(50% 90% at 50% 0%, rgba(42,111,151,0.22), transparent 60%)",
          }}
        />
        <div className="container-edge relative py-[88px]">
          <Reveal>
            <FounderNote />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
