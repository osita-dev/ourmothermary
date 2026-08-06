import { useMemo, useState } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { differenceInCalendarDays } from "date-fns";
import { useNotifications } from "@/context/NotificationContext";
import { FilterTabs, type FilterValue } from "@/components/notifications/FilterTabs";
import { NotificationCard } from "@/components/notifications/NotificationCard";
import { BottomNav } from "@/components/home/BottomNav";
import type { AppNotification } from "@/types";

function groupLabel(notification: AppNotification): "Today" | "This Week" | "Earlier" {
  const days = differenceInCalendarDays(new Date(), new Date(notification.timestamp));
  if (days <= 0) return "Today";
  if (days <= 7) return "This Week";
  return "Earlier";
}

export default function Notifications() {
  const navigate = useNavigate();
  const { notifications, markAsRead } = useNotifications();
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered = useMemo(
    () =>
      filter === "all"
        ? notifications
        : notifications.filter((n) => n.category === filter),
    [notifications, filter]
  );

  const groups = useMemo(() => {
    const order: Array<"Today" | "This Week" | "Earlier"> = ["Today", "This Week", "Earlier"];
    const map = new Map<string, AppNotification[]>();
    for (const n of filtered) {
      const label = groupLabel(n);
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(n);
    }
    return order
      .filter((label) => map.has(label))
      .map((label) => ({ label, items: map.get(label)! }));
  }, [filtered]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="flex items-center justify-between px-5 pt-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-card"
        >
          <ArrowLeft className="h-5 w-5 text-primary" />
        </button>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-b from-primary/10 to-accent/20">
          <Heart className="h-7 w-7 text-primary" strokeWidth={1.5} />
        </div>
      </div>

      <div className="px-5 pt-3">
        <h1 className="font-heading text-3xl font-semibold text-foreground">
          Notifications
        </h1>
        <p className="text-sm text-muted-foreground">
          Stay connected with your prayer journey.
        </p>
      </div>

      <div className="mt-5">
        <FilterTabs value={filter} onChange={setFilter} />
      </div>

      <div className="mt-4 space-y-6 px-5">
        {groups.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No notifications yet.
          </p>
        )}
        {groups.map(({ label, items }) => (
          <div key={label}>
            <h2 className="mb-2 font-heading text-sm font-semibold text-foreground">
              {label}
            </h2>
            <div className="space-y-3">
              {items.map((n) => (
                <NotificationCard key={n.id} notification={n} onRead={markAsRead} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
