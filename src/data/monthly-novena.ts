import type { NovenaDay } from "@/types";

export const monthlyNovenaDays: NovenaDay[] = [
  {
    dayNumber: 1,
    title_en: "Day 1 — [Placeholder Title]",
    body_en:
      "[Placeholder reading for Day 1. Replace this with the real write-up for this day.]",
  },
  {
    dayNumber: 2,
    title_en: "Day 2 — [Placeholder Title]",
    body_en:
      "[Placeholder reading for Day 2. Replace this with the real write-up for this day.]",
  },
  {
    dayNumber: 3,
    title_en: "Day 3 — [Placeholder Title]",
    body_en:
      "[Placeholder reading for Day 3. Replace this with the real write-up for this day.]",
  },
  {
    dayNumber: 4,
    title_en: "Day 4 — [Placeholder Title]",
    body_en:
      "[Placeholder reading for Day 4. Replace this with the real write-up for this day.]",
  },
  {
    dayNumber: 5,
    title_en: "Day 5 — [Placeholder Title]",
    body_en:
      "[Placeholder reading for Day 5. Replace this with the real write-up for this day.]",
  },
  {
    dayNumber: 6,
    title_en: "Day 6 — [Placeholder Title]",
    body_en:
      "[Placeholder reading for Day 6. Replace this with the real write-up for this day.]",
  },
  {
    dayNumber: 7,
    title_en: "Day 7 — [Placeholder Title]",
    body_en:
      "[Placeholder reading for Day 7. Replace this with the real write-up for this day.]",
  },
  {
    dayNumber: 8,
    title_en: "Day 8 — [Placeholder Title]",
    body_en:
      "[Placeholder reading for Day 8. Replace this with the real write-up for this day.]",
  },
  {
    dayNumber: 9,
    title_en: "Day 9 — [Placeholder Title]",
    body_en:
      "[Placeholder reading for Day 9. Replace this with the real write-up for this day.]",
  },
];

export function getMonthlyNovenaDay(dayNumber: number): NovenaDay | undefined {
  return monthlyNovenaDays.find((d) => d.dayNumber === dayNumber);
}