import { createContext, useContext, useMemo, type ReactNode } from "react";
import { getFeaturedSessionId, getActiveEntriesToday } from "@/lib/date-utils";
import { schedule } from "@/data/schedule";
import type { ScheduleEntry } from "@/types";

interface ScheduleContextValue {
  today: Date;
  featuredSessionId: string;
  featuredLabel: string;
  activeEntriesToday: ScheduleEntry[];
  fullSchedule: ScheduleEntry[];
}

const ScheduleContext = createContext<ScheduleContextValue | undefined>(undefined);

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const value = useMemo<ScheduleContextValue>(() => {
    const today = new Date();
    const featured = getFeaturedSessionId(today);
    return {
      today,
      featuredSessionId: featured.sessionId,
      featuredLabel: featured.label,
      activeEntriesToday: getActiveEntriesToday(today),
      fullSchedule: schedule,
    };
  }, []);

  return <ScheduleContext.Provider value={value}>{children}</ScheduleContext.Provider>;
}

export function useSchedule(): ScheduleContextValue {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error("useSchedule must be used within ScheduleProvider");
  return ctx;
}
