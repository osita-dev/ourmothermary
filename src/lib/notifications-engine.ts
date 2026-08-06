import { CalendarDays, Bell, HeartHandshake } from "lucide-react";
import type { AppNotification } from "@/types";
import { schedule } from "@/data/schedule";
import { getSessionById } from "@/data/sessions";
import {
  getActiveEntriesToday,
  startsTomorrow,
  daysUntil,
} from "@/lib/date-utils";

export function generateCalendarNotifications(
  today: Date = new Date()
): AppNotification[] {
  const notifications: AppNotification[] = [];

  for (const entry of getActiveEntriesToday(today)) {
    const session = getSessionById(entry.sessionId);
    if (!session) continue;
    notifications.push({
      id: `active-${entry.sessionId}-${entry.label_en}`,
      category: "reminder",
      source: "calendar",
      title_en: `${session.title_en} is now available`,
      message_en: `Join the ${session.title_en} to ${session.subtitle_en}.`,
      timestamp: today.toISOString(),
      read: false,
      icon: HeartHandshake,
    });
  }

  for (const entry of schedule) {
    if (entry.type === "weekly") continue;
    if (startsTomorrow(entry, today)) {
      const session = getSessionById(entry.sessionId);
      if (!session) continue;
      notifications.push({
        id: `tomorrow-${entry.sessionId}-${entry.label_en}`,
        category: "event",
        source: "calendar",
        title_en: `${entry.label_en} begins tomorrow`,
        message_en: `Prepare your heart. ${entry.label_en} starts tomorrow.`,
        timestamp: today.toISOString(),
        read: false,
        icon: CalendarDays,
      });
    }
  }

  for (const entry of schedule) {
    if (entry.type !== "single-date") continue;
    const days = daysUntil(entry, today);
    if (days !== null && days > 0 && days <= 3) {
      notifications.push({
        id: `upcoming-${entry.sessionId}-${entry.date}`,
        category: "announcement",
        source: "calendar",
        title_en: `${entry.label_en} in ${days} day${days > 1 ? "s" : ""}`,
        message_en: `Mark your calendar — ${entry.label_en} is coming up.`,
        timestamp: today.toISOString(),
        read: false,
        icon: Bell,
      });
    }
  }

  return notifications;
}
