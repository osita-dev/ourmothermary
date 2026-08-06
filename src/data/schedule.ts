import type { ScheduleEntry } from "@/types";

export const schedule: ScheduleEntry[] = [
  { type: "weekly", sessionId: "weekly-novena", weekday: 3, label_en: "Weekly Novena Day" },
  { type: "date-range", sessionId: "st-alphonsus-novena", start: "07-23", end: "07-31", label_en: "St. Alphonsus Novena" },
  { type: "date-range", sessionId: "st-gerard-novena", start: "10-08", end: "10-16", label_en: "St. Gerard Novena" },
  { type: "single-date", sessionId: "feast-days-events", date: "07-31", label_en: "Feast of St. Alphonsus Liguori" },
  { type: "single-date", sessionId: "feast-days-events", date: "10-16", label_en: "Feast of St. Gerard Majella" },
  { type: "single-date", sessionId: "feast-days-events", date: "06-27", label_en: "Feast of Our Mother of Perpetual Help" },
];
