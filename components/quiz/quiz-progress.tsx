function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function QuizProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between font-mono text-[0.72rem] uppercase tracking-[0.1em] text-subtle-foreground">
        <span className="tabular-nums">
          Question {pad(current)} / {pad(total)}
        </span>
        <span className="tabular-nums">{pct}%</span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-accent"
          style={{
            width: `${pct}%`,
            transition: "width 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        />
      </div>
    </div>
  );
}
