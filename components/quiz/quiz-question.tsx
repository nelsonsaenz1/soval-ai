import type { QuizQuestion as QuizQuestionType } from "@/lib/quiz/types";
import { cn } from "@/lib/cn";

const LETTERS = ["A", "B", "C", "D", "E", "F", "G"];

export function QuizQuestion({
  question,
  selectedId,
  onSelect,
}: {
  question: QuizQuestionType;
  selectedId: string | undefined;
  onSelect: (optionId: string) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-7">
      <legend className="flex flex-col gap-3">
        <span className="eyebrow">{question.category}</span>
        <span className="text-h2 font-semibold text-balance">
          {question.prompt}
        </span>
      </legend>

      <div className="grid gap-2.5">
        {question.options.map((option, i) => {
          const selected = option.id === selectedId;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onSelect(option.id)}
              className={cn(
                "group flex items-center gap-4 rounded-xl border bg-surface px-4 py-3.5 text-left",
                "transition-[transform,border-color,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
                "active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                selected
                  ? "border-accent bg-accent-soft shadow-soft"
                  : "border-border hover:border-border-strong hover:bg-surface-muted",
              )}
            >
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-lg border font-mono text-sm font-medium transition-colors duration-150",
                  selected
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border-strong bg-surface text-muted-foreground group-hover:border-foreground/30",
                )}
              >
                {LETTERS[i] ?? i + 1}
              </span>
              <span className="text-[0.975rem] text-foreground">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
