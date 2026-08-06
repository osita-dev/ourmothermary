import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
} from "date-fns";
import { getActiveEntriesToday } from "@/lib/date-utils";
import { getSessionById } from "@/data/sessions";
import { BottomNav } from "@/components/home/BottomNav";

const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];

export default function CalendarPage() {
  const navigate = useNavigate();
  const [cursor, setCursor] = useState(new Date());
  const [selected, setSelected] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfMonth(cursor);
    const end = endOfMonth(cursor);
    return eachDayOfInterval({ start, end });
  }, [cursor]);

  const leadingBlanks = getDay(startOfMonth(cursor));

  const selectedEntries = getActiveEntriesToday(selected);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="flex items-center justify-between px-5 pt-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-card"
        >
          <ArrowLeft className="h-5 w-5 text-primary" />
        </button>
        <h1 className="font-heading text-lg font-semibold text-foreground">
          Calendar
        </h1>
        <div className="h-11 w-11" />
      </div>

      <div className="mx-5 mt-4 rounded-3xl bg-card p-4 shadow-card">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setCursor((c) => subMonths(c, 1))}
            aria-label="Previous month"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
          >
            <ChevronLeft className="h-4 w-4 text-primary" />
          </button>
          <p className="font-heading text-base font-semibold text-foreground">
            {format(cursor, "MMMM yyyy")}
          </p>
          <button
            type="button"
            onClick={() => setCursor((c) => addMonths(c, 1))}
            aria-label="Next month"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
          >
            <ChevronRight className="h-4 w-4 text-primary" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-y-2 text-center">
          {weekdayLabels.map((w, i) => (
            <span key={`${w}-${i}`} className="text-xs font-medium text-muted-foreground">
              {w}
            </span>
          ))}

          {Array.from({ length: leadingBlanks }, (_, i) => (
            <span key={`blank-${i}`} />
          ))}

          {days.map((day) => {
            const hasEntries = getActiveEntriesToday(day).length > 0;
            const isSelected = isSameDay(day, selected);
            const inMonth = isSameMonth(day, cursor);
            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => setSelected(day)}
                className={`mx-auto flex h-9 w-9 flex-col items-center justify-center rounded-full text-sm ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : inMonth
                      ? "text-foreground"
                      : "text-muted-foreground/40"
                }`}
              >
                {format(day, "d")}
                {hasEntries && (
                  <span
                    className={`mt-0.5 h-1 w-1 rounded-full ${isSelected ? "bg-accent" : "bg-accent-dark"}`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 px-5">
        <h2 className="font-heading text-base font-semibold text-foreground">
          {format(selected, "EEEE, MMMM d")}
        </h2>

        <div className="mt-3 space-y-2">
          {selectedEntries.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No scheduled devotions on this day.
            </p>
          )}
          {selectedEntries.map((entry) => {
            const session = getSessionById(entry.sessionId);
            if (!session) return null;
            return (
              <button
                key={`${entry.sessionId}-${entry.label_en}`}
                type="button"
                onClick={() => navigate(`/session/${session.id}`)}
                className="flex w-full items-center justify-between rounded-2xl bg-card p-4 text-left shadow-card"
              >
                <div>
                  <p className="font-heading text-sm font-semibold text-foreground">
                    {entry.label_en}
                  </p>
                  <p className="text-xs text-muted-foreground">{session.title_en}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            );
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
