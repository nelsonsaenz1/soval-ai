import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Stat = {
  label: string;
  value: string;
  caption: string;
  icon: ReactNode;
};

const STATS: Stat[] = [
  {
    label: "Inbox triage",
    value: "12",
    caption: "messages summarized",
    icon: <InboxIcon />,
  },
  {
    label: "Today's priorities",
    value: "4",
    caption: "tasks extracted",
    icon: <CheckIcon />,
  },
  {
    label: "Follow-up assistant",
    value: "7",
    caption: "leads queued",
    icon: <SendIcon />,
  },
];

export function DashboardMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mesh-dark rounded-[1.75rem] border border-on-dark-hairline p-5 text-on-dark shadow-hero sm:p-6",
        className,
      )}
      role="img"
      aria-label="Illustrative AI operating system dashboard showing inbox triage, daily priorities, queued follow-ups, and weekly time reclaimed."
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
        </div>
        <span className="rounded-pill border border-on-dark-hairline bg-white/5 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-on-dark-muted">
          Sample view
        </span>
      </div>

      <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-on-dark-muted">
        Your AI Operating System
      </p>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="card-in rounded-xl border border-on-dark-hairline bg-white/[0.04] p-3.5"
            style={{ animationDelay: `${0.15 + i * 0.12}s` }}
          >
            <span className="flex size-7 items-center justify-center rounded-md bg-accent/25 text-[#bfe0f0]">
              {stat.icon}
            </span>
            <p className="nums mt-3 text-2xl leading-none text-on-dark">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[0.78rem] font-medium leading-tight text-on-dark-secondary">
              {stat.label}
            </p>
            <p className="text-[0.7rem] leading-tight text-on-dark-muted">
              {stat.caption}
            </p>
          </div>
        ))}
      </div>

      <div
        className="card-in mt-3 rounded-xl border border-on-dark-hairline bg-white/[0.04] p-4"
        style={{ animationDelay: "0.55s" }}
      >
        <div className="flex items-baseline justify-between">
          <p className="text-[0.78rem] font-medium text-on-dark-secondary">
            Weekly time reclaimed
          </p>
          <p className="nums text-xl text-on-dark">
            5.5 <span className="text-sm text-on-dark-muted">hrs</span>
          </p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-pill bg-white/10">
          <div
            className="bar-fill h-full rounded-pill bg-gradient-to-r from-accent to-accent-teal"
            style={{ ["--fill" as string]: "0.78" }}
          />
        </div>
        <p className="mt-2 text-[0.7rem] text-on-dark-muted">
          Illustrative. Your numbers depend on what we build together.
        </p>
      </div>
    </div>
  );
}

function InboxIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h5l1.5 2.5h5L21 12" />
      <path d="M3 12V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" />
      <path d="M3 12v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}
