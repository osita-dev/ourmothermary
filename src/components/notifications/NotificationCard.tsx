import { format } from "date-fns";
import type { AppNotification } from "@/types";

const categoryBg: Record<AppNotification["category"], string> = {
  reminder: "bg-card-sage",
  event: "bg-card-blue",
  announcement: "bg-card-gold",
};

interface NotificationCardProps {
  notification: AppNotification;
  onRead: (id: string) => void;
}

export function NotificationCard({ notification, onRead }: NotificationCardProps) {
  const Icon = notification.icon;

  return (
    <button
      type="button"
      onClick={() => onRead(notification.id)}
      className="flex w-full items-start gap-3 rounded-3xl bg-card p-4 text-left shadow-card"
    >
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${categoryBg[notification.category]}`}>
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-heading text-sm font-semibold text-foreground">{notification.title_en}</p>
          <span className="shrink-0 text-xs text-muted-foreground">
            {format(new Date(notification.timestamp), "h:mm a")}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-muted-foreground">{notification.message_en}</p>
      </div>
      {!notification.read && <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-accent" />}
    </button>
  );
}
