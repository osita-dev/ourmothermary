export type ScheduleEntry =
  | {
      type: "weekly";
      sessionId: string;
      weekday: number;
      label_en: string;
    }
  | {
      type: "date-range";
      sessionId: string;
      start: string;
      end: string;
      label_en: string;
    }
  | {
      type: "single-date";
      sessionId: string;
      date: string;
      label_en: string;
    };
