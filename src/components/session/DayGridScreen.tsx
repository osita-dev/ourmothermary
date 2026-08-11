import { ArrowLeft } from "lucide-react";
import type { Session } from "@/types";

interface DayGridScreenProps {
  session: Session;
  onBack: () => void;
  onSelectDay: (dayNumber: number) => void;
}

// Shown instead of the linear scroll when a session's kind is
// "day-select" — a 3x3 grid of day boxes rather than a scroll.
export function DayGridScreen({ session, onBack, onSelectDay }: DayGridScreenProps) {
  const Icon = session.icon;
  const days = session.days ?? [];

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
      </div>

      <div className="mt-4 flex justify-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-b from-primary/10 to-accent/20">
          <Icon className="h-12 w-12 text-primary" strokeWidth={1.5} />
        </div>
      </div>

      <div className="mt-5 px-6 text-center">
        <h1 className="font-heading text-2xl font-semibold text-foreground">{session.title_en}</h1>
        <p className="text-sm text-muted-foreground">{session.subtitle_en}</p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {session.description_en}
        </p>
      </div>

      <p className="mt-6 px-6 text-center font-heading text-sm font-semibold text-accent-dark">
        Choose a day to begin
      </p>

      <div className="mx-auto mt-4 grid max-w-xs grid-cols-3 gap-3 px-6">
        {days.map((day) => (
          <button
            key={day.dayNumber}
            type="button"
            onClick={() => onSelectDay(day.dayNumber)}
            className="flex aspect-square flex-col items-center justify-center rounded-2xl bg-secondary/70 font-heading text-lg font-bold text-foreground"
          >
            {day.dayNumber}
          </button>
        ))}
      </div>
    </div>
  );
}