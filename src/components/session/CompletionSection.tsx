import { forwardRef } from "react";
import { CheckCircle2, Heart, Home, RotateCcw, Timer } from "lucide-react";

interface CompletionSectionProps {
  sessionTitle: string;
  elapsedSeconds: number;
  onBackHome: () => void;
  onPrayAgain: () => void;
}

function formatElapsed(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// The natural end of the scroll, not a separate screen/route — reaching
// the bottom of the flow *is* finishing the prayer.
export const CompletionSection = forwardRef<HTMLDivElement, CompletionSectionProps>(
  ({ sessionTitle, elapsedSeconds, onBackHome, onPrayAgain }, ref) => {
    return (
      <section
        ref={ref}
        data-step-section
        className="scroll-mt-28 flex flex-col items-center px-6 pb-16 pt-10 text-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>

        <h1 className="mt-6 font-heading text-2xl font-semibold text-foreground">
          Prayer Complete!
        </h1>
        <Heart className="mt-2 h-5 w-5 text-accent" fill="currentColor" />

        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          Thank you for praying with us. May Our Mother of Perpetual Help watch over you and your
          loved ones.
        </p>

        <div className="mt-6 flex w-full items-center justify-center gap-3 rounded-3xl bg-secondary/60 py-5">
          <Timer className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">You prayed for</p>
            <p className="font-heading text-2xl font-bold text-foreground">
              {formatElapsed(elapsedSeconds)}{" "}
              <span className="text-sm font-normal text-muted-foreground">minutes</span>
            </p>
          </div>
        </div>

        <div className="mt-8 w-full space-y-3">
          <button
            type="button"
            onClick={onBackHome}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 font-heading text-base font-semibold text-primary-foreground"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </button>
          <button
            type="button"
            onClick={onPrayAgain}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-border py-4 font-heading text-base font-semibold text-foreground"
          >
            <RotateCcw className="h-5 w-5" />
            Pray Again — {sessionTitle}
          </button>
        </div>
      </section>
    );
  }
);
CompletionSection.displayName = "CompletionSection";