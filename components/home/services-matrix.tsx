"use client";

import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { MonoLabel } from "@/components/ui/mono-label";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";

/**
 * The five offers as a hairline matrix (not cards). Every value comes straight
 * from SERVICES: category (eyebrow), name, one-line tagline, priceLabel, href.
 * Rows are real links; the entry consult tracks as a consult click, the rest as
 * service views.
 */
export function ServicesMatrix() {
  return (
    <div className="divide-y divide-white/[0.08] overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.02]">
      {SERVICES.map((service) => {
        const isConsult = service.slug === "ai-clarity-consult";
        return (
          <Link
            key={service.slug}
            href={service.href}
            onClick={() =>
              isConsult
                ? trackEvent("consult_clicked", { source: "services_matrix" })
                : trackEvent("service_viewed", { slug: service.slug })
            }
            className="group grid items-center gap-x-5 gap-y-2 px-6 py-[22px] transition-colors duration-150 hover:bg-white/[0.03] sm:grid-cols-[140px_1fr_auto_32px]"
          >
            <MonoLabel
              className={cn(
                "text-[10.5px] tracking-[0.1em]",
                isConsult ? "text-accent-onDark" : "text-white/50",
              )}
            >
              {service.eyebrow}
            </MonoLabel>

            <div>
              <span className="block font-display text-[20px] leading-tight text-white">
                {service.name}
              </span>
              <span className="mt-0.5 block text-[13px] leading-snug text-white/55">
                {service.tagline}
              </span>
            </div>

            <span className="nums whitespace-nowrap font-display text-[1.35rem] text-accent-onDark">
              {service.priceLabel}
            </span>

            <span
              className="hidden text-right text-white/50 transition-transform duration-150 group-hover:translate-x-0.5 sm:block"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
