"use client";

import * as React from "react";

export function ScoreGauge({
  score,
  band,
}: {
  score: number;
  band: string;
}) {
  const size = 220;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // Animate the ring fill on mount. Under reduced motion the global CSS
    // collapses the transition duration, so the ring simply jumps to final.
    const id = requestAnimationFrame(() => setProgress(score));
    return () => cancelAnimationFrame(id);
  }, [score]);

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Agent Fit Score ${score} out of 100, ${band}`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition:
              "stroke-dashoffset 1.1s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-[3.25rem] font-semibold leading-none tracking-tight tabular-nums">
          {score}
        </span>
        <span className="mt-1.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-subtle-foreground">
          out of 100
        </span>
        <span className="mt-2 text-sm font-medium text-accent-strong">
          {band}
        </span>
      </div>
    </div>
  );
}
