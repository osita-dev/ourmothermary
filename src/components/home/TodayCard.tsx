import { CalendarDays, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatFullDate } from "@/lib/date-utils";
import { useSchedule } from "@/context/ScheduleContext";

export function TodayCard() {
  const navigate = useNavigate();
  const { today, featuredSessionId, featuredLabel } = useSchedule();

  return (
    <div className="mx-5 mt-6 flex items-center justify-between rounded-3xl bg-secondary/70 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary">
          <CalendarDays className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Today is</p>
          <p className="font-heading text-base font-semibold text-foreground">
            {formatFullDate(today)}
          </p>
          <p className="text-sm font-medium text-accent-dark">{featuredLabel}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate(`/session/${featuredSessionId}`)}
        className="flex items-center gap-1 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
      >
        Start Prayer
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
