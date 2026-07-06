"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { MonoLabel } from "@/components/ui/mono-label";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";

type Path = {
  key: "personal" | "business";
  kicker: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  icon: ReactNode;
  /** Accent family: personal = ocean, business = teal. */
  tint: "accent" | "teal";
};

const PATHS: Path[] = [
  {
    key: "personal",
    kicker: "For your life",
    title: "Personal AI Assistant",
    description:
      "For life admin, personal productivity, research, learning, household coordination, inboxes, and decision support.",
    cta: { label: "Build my assistant", href: "/services/personal-ai-assistant" },
    icon: <PersonIcon />,
    tint: "accent",
  },
  {
    key: "business",
    kicker: "For your business",
    title: "Business Workflow Automation",
    description:
      "For leads, follow-up, admin, documents, reporting, client communication, and internal operations.",
    cta: { label: "Automate my workflow", href: "/services/business-workflow-audit" },
    icon: <WorkflowIcon />,
    tint: "teal",
  },
];

export function PathChooser() {
  return (
    <div className="grid gap-[22px] md:grid-cols-2">
      {PATHS.map((path) => {
        const teal = path.tint === "teal";
        return (
          <Link
            key={path.key}
            href={path.cta.href}
            onClick={() => trackEvent("path_chosen", { path: path.key })}
            className={cn(
              "group flex flex-col rounded-[20px] border border-hairline bg-surface p-[34px] shadow-lift",
              "transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
              "hover:-translate-y-0.5 hover:shadow-raise",
              teal ? "hover:border-accent-teal/40" : "hover:border-accent/40",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            )}
          >
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "flex size-[46px] items-center justify-center rounded-[13px]",
                  teal ? "bg-[#eaf3f0] text-accent-teal" : "bg-accent-light text-accent",
                )}
              >
                {path.icon}
              </span>
              <MonoLabel className="text-[10.5px] tracking-[0.12em] text-muted">
                {path.kicker}
              </MonoLabel>
            </div>

            <h3 className="mt-[22px] font-display text-[27px] leading-tight text-heading">
              {path.title}
            </h3>
            <p className="mt-3 max-w-md text-pretty text-[15.5px] leading-[1.55] text-secondary">
              {path.description}
            </p>

            <div className="mt-auto pt-6">
              <span
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-pill px-[22px] text-[14.5px] font-semibold text-white shadow-soft transition-[background-color,box-shadow] duration-150 group-hover:shadow-lift",
                  teal
                    ? "bg-accent-teal group-hover:bg-accent-teal/90"
                    : "bg-accent group-hover:bg-accent-hover",
                )}
              >
                {path.cta.label}
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" />
    </svg>
  );
}

function WorkflowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
      <path d="M10 6.5h5a2 2 0 0 1 2 2V14" />
    </svg>
  );
}
