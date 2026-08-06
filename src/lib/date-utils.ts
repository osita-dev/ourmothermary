import { addDays, format, isSameDay } from "date-fns";
import type { ScheduleEntry } from "@/types";
import { schedule } from "@/data/schedule";

export function getGreeting(date: Date = new Date()): string {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 22) return "Good Evening";
  return "Good Night";
}

export function formatFullDate(date: Date = new Date()): string {
  return format(date, "EEEE, MMMM d");
}

function toMonthDay(date: Date): string {
  return format(date, "MM-dd");
}

function isMonthDayInRange(mmdd: string, start: string, end: string): boolean {
  return mmdd >= start && mmdd <= end;
}

export function isEntryActiveOn(entry: ScheduleEntry, date: Date): boolean {
  if (entry.type === "weekly") {
    return date.getDay() === entry.weekday;
  }
  const mmdd = toMonthDay(date);
  if (entry.type === "date-range") {
    return isMonthDayInRange(mmdd, entry.start, entry.end);
  }
  return mmdd === entry.date;
}

export function getActiveEntriesToday(date: Date = new Date()): ScheduleEntry[] {
  return schedule.filter((entry) => isEntryActiveOn(entry, date));
}

export function getFeaturedSessionId(date: Date = new Date()): {
  sessionId: string;
  label: string;
} {
  const active = getActiveEntriesToday(date);
  const dated = active.find((e) => e.type !== "weekly");
  if (dated) return { sessionId: dated.sessionId, label: dated.label_en };
  const weekly = active.find((e) => e.type === "weekly");
  if (weekly) return { sessionId: weekly.sessionId, label: weekly.label_en };
  return { sessionId: "weekly-novena", label: "Weekly Novena" };
}

export function startsTomorrow(entry: ScheduleEntry, today: Date = new Date()): boolean {
  const tomorrow = addDays(today, 1);
  const mmddTomorrow = toMonthDay(tomorrow);
  if (entry.type === "date-range") return entry.start === mmddTomorrow;
  if (entry.type === "single-date") return entry.date === mmddTomorrow;
  return false;
}

export function daysUntil(entry: ScheduleEntry, today: Date = new Date()): number | null {
  if (entry.type !== "single-date") return null;
  for (let i = 0; i <= 365; i++) {
    const candidate = addDays(today, i);
    if (toMonthDay(candidate) === entry.date) return i;
  }
  return null;
}

export function isToday(date: Date, reference: Date = new Date()): boolean {
  return isSameDay(date, reference);
}
