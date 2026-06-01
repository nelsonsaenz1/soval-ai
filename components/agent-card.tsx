import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { AgentCapability } from "@/lib/site-copy";

function initials(name: string) {
  return name
    .replace(/&/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function AgentCard({
  agent,
  detailed = false,
  featured = false,
  className,
}: {
  agent: AgentCapability;
  detailed?: boolean;
  featured?: boolean;
  className?: string;
}) {
  const showExamples = detailed || featured;
  return (
    <Card interactive className={cn("flex h-full flex-col", className)}>
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft font-mono text-sm font-semibold text-accent-strong">
          {initials(agent.name)}
        </span>
        {featured ? (
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-subtle-foreground">
            Lead specialist
          </span>
        ) : null}
      </div>
      <h3
        className={cn(
          "mt-4 font-semibold",
          featured ? "text-h3" : "text-base",
        )}
      >
        {agent.name}
      </h3>
      <p
        className={cn(
          "mt-2 leading-relaxed text-muted-foreground",
          featured ? "text-[0.975rem] max-w-md" : "text-sm",
        )}
      >
        {agent.summary}
      </p>
      {showExamples ? (
        <ul className="mt-5 flex flex-col gap-2.5 border-t border-border pt-5">
          {agent.examples.map((example) => (
            <li
              key={example}
              className="flex items-start gap-2.5 text-sm text-muted-foreground"
            >
              <svg
                viewBox="0 0 16 16"
                className="mt-1 h-3.5 w-3.5 shrink-0 text-accent"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.5 8.5l2.5 2.5 6-6"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{example}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </Card>
  );
}
