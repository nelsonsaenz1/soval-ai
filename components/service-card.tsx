import Link from "next/link";
import type { Service } from "@/lib/services";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function ServiceCard({
  service,
  detailed = false,
}: {
  service: Service;
  detailed?: boolean;
}) {
  return (
    <Card interactive className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3">
        <Badge variant="neutral">{service.eyebrow}</Badge>
        <span className="nums text-sm font-semibold text-accent">
          {service.priceLabel}
        </span>
      </div>

      <h3 className="mt-4 font-display text-h3 text-heading">{service.name}</h3>
      <p className="mt-2 text-pretty text-secondary">{service.summary}</p>

      {detailed ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <FitList title="Best fit" items={service.bestFit} good />
          <FitList title="Not a fit" items={service.notFit} />
        </div>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6">
        <Button href={service.cta.href} size="sm">
          {service.cta.label}
        </Button>
        {service.hasPage ? (
          <Link
            href={service.href}
            className="text-sm font-medium text-accent hover:underline"
          >
            Learn more →
          </Link>
        ) : null}
      </div>
    </Card>
  );
}

function FitList({
  title,
  items,
  good = false,
}: {
  title: string;
  items: string[];
  good?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
        {title}
      </p>
      <ul className="mt-2.5 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-secondary">
            <span
              className={cn(
                "mt-0.5 shrink-0",
                good ? "text-accent" : "text-muted",
              )}
              aria-hidden="true"
            >
              {good ? "✓" : "—"}
            </span>
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
