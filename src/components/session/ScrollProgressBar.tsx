interface ScrollProgressBarProps {
  activeIndex: number;
  totalSteps: number;
}

// Passive progress display — reflects where the person is in the scroll,
// nothing to tap. Replaces the old numbered/clickable stepper.
export function ScrollProgressBar({ activeIndex, totalSteps }: ScrollProgressBarProps) {
  const percent = totalSteps > 1 ? (activeIndex / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="px-5 pb-2 pt-1">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Step {Math.min(activeIndex + 1, totalSteps)} of {totalSteps}
        </span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}