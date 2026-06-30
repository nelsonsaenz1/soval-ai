"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";

type Path = {
  key: "personal" | "business";
  kicker: string;
  title: string;
  description: string;
  covers: string[];
  cta: { label: string; href: string };
  icon: ReactNode;
};

const PATHS: Path[] = [
  {
    key: "personal",
    kicker: "For your life",
    title: "Personal AI Assistant",
    description:
      "For life admin, personal productivity, research, learning, household coordination, inboxes, and decision support.",
    covers: [
      "Inbox & calendar",
      "Research & learning",
      "Household coordination",
      "Decision support",
    ],
    cta: { label: "Build my assistant", href: "/services/personal-ai-assistant" },
    icon: <PersonIcon />,
  },
  {
    key: "business",
    kicker: "For your business",
    title: "Business Workflow Automation",
    description:
      "For leads, follow-up, admin, documents, reporting, client communication, and internal operations.",
    covers: [
      "Leads & follow-up",
      "Documents & reporting",
      "Client communication",
      "Internal operations",
    ],
    cta: { label: "Automate my workflow", href: "/services/business-workflow-audit" },
    icon: <WorkflowIcon />,
  },
];

export function PathChooser() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {PATHS.map((path) => (
        <Link
          key={path.key}
          href={path.cta.href}
          onClick={() => trackEvent("path_chosen", { path: path.key })}
          className={cn(
            "group relative flex flex-col rounded-2xl border border-hairline bg-surface p-7 shadow-soft sm:p-9",
            "transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
            "hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lift",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="flex size-12 items-center justify-center rounded-xl bg-accent-light text-accent">
              {path.icon}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {path.kicker}
            </span>
          </div>

          <h3 className="mt-6 font-display text-h2 text-heading">{path.title}</h3>
          <p className="mt-3 max-w-md text-pretty text-secondary">
            {path.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {path.covers.map((item) => (
              <li
                key={item}
                className="rounded-pill bg-warm px-3 py-1 text-xs font-medium text-secondary"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <span className="inline-flex h-11 items-center gap-2 rounded-pill bg-accent px-6 text-[0.95rem] font-medium text-accent-foreground shadow-soft transition-[background-color,box-shadow] duration-150 group-hover:bg-accent-hover group-hover:shadow-lift">
              {path.cta.label}
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </div>
        </Link>
      ))}
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
