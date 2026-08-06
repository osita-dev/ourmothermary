import { ArrowLeft, Clock, ListChecks, Compass, ChevronRight, Bookmark } from "lucide-react";
import type { Session } from "@/types";

interface SessionIntroProps {
  session: Session;
  onBack: () => void;
  onStart: () => void;
}

export function SessionIntro({ session, onBack, onStart }: SessionIntroProps) {
  const Icon = session.icon;

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="flex items-center justify-between px-5 pt-5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-card"
        >
          <ArrowLeft className="h-5 w-5 text-primary" />
        </button>
        <button
          type="button"
          aria-label="Bookmark"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-card"
        >
          <Bookmark className="h-5 w-5 text-primary" />
        </button>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-gradient-to-b from-primary/10 to-accent/20">
          <Icon className="h-14 w-14 text-primary" strokeWidth={1.5} />
        </div>
      </div>

      <div className="mt-6 px-6 text-center">
        <h1 className="font-heading text-2xl font-semibold text-foreground">{session.title_en}</h1>
        <p className="text-sm text-muted-foreground">{session.subtitle_en}</p>
      </div>

      <div className="mx-5 mt-5 flex items-center justify-around rounded-3xl bg-secondary/60 py-4">
        <div className="flex flex-col items-center gap-1">
          <Clock className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground">Estimated Time</span>
          <span className="font-heading text-sm font-semibold text-foreground">
            {session.estimatedMinutes} min
          </span>
        </div>
        <div className="h-10 w-px bg-border" />
        <div className="flex flex-col items-center gap-1">
          <ListChecks className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground">Steps</span>
          <span className="font-heading text-sm font-semibold text-foreground">
            {session.steps.length}
          </span>
        </div>
        <div className="h-10 w-px bg-border" />
        <div className="flex flex-col items-center gap-1">
          <Compass className="h-5 w-5 text-primary" />
          <span className="text-xs text-muted-foreground">Focus</span>
          <span className="font-heading text-sm font-semibold text-foreground">
            {session.focusTheme_en}
          </span>
        </div>
      </div>

      <p className="mx-6 mt-5 text-center text-sm leading-relaxed text-muted-foreground">
        {session.description_en}
      </p>

      <div className="px-5">
        <button
          type="button"
          onClick={onStart}
          className="mt-6 flex w-full items-center justify-center gap-1 rounded-full bg-primary py-4 font-heading text-base font-semibold text-primary-foreground"
        >
          Start Prayer
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
