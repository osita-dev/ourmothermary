import type { LucideIcon } from "lucide-react";

export type Step =
  | {
    type: "prayer";
    stepNumber: number;
    title_en: string;
    prayerId: string;
    icon: LucideIcon;
  }
  | {
    type: "nested";
    stepNumber: number;
    title_en: string;
    nestedFlowId: string;
    icon: LucideIcon;
  };

export interface NovenaDay {
  dayNumber: number;
  title_en: string;
  body_en: string;
}

export type CardColorToken =
  | "sage"
  | "gold"
  | "lavender"
  | "coral"
  | "blue"
  | "peach"
  | "mint"
  | "olive";

export interface Session {
  id: string;
  title_en: string;
  subtitle_en: string;
  estimatedMinutes: number;
  focusTheme_en: string;
  description_en: string;
  colorToken: CardColorToken;
  icon: LucideIcon;
  kind?: "linear" | "day-select"; 
  steps: Step[];
  days?: NovenaDay[]; 
}
