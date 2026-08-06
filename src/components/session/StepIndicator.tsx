import { Check } from "lucide-react";

interface StepIndicatorProps {
  totalSteps: number;
  currentIndex: number;
}

export function StepIndicator({ totalSteps, currentIndex }: StepIndicatorProps) {
  const percent = totalSteps > 1 ? (currentIndex / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="px-5 pt-2">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: totalSteps }, (_, i) => {
          const isDone = i < currentIndex;
          const isCurrent = i === currentIndex;
          return (
            <div
              key={i}
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                isDone
                  ? "bg-primary text-primary-foreground"
                  : isCurrent
                    ? "bg-accent text-primary"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              {isDone ? <Check className="h-3 w-3" /> : i + 1}
            </div>
          );
        })}
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
