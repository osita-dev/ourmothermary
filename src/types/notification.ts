import type { LucideIcon } from "lucide-react";

export type NotificationCategory = "reminder" | "event" | "announcement";
export type NotificationSource = "calendar" | "action";

export interface AppNotification {
  id: string;
  category: NotificationCategory;
  source: NotificationSource;
  title_en: string;
  message_en: string;
  timestamp: string;
  read: boolean;
  icon: LucideIcon;
}
