import { Bell, Clock, CalendarDays, Megaphone } from "lucide-react";
import type { NotificationCategory } from "@/types";

export type FilterValue = "all" | NotificationCategory;

const filters: { value: FilterValue; label: string; icon: typeof Bell }[] = [
  { value: "all", label: "All", icon: Bell },
  { value: "reminder", label: "Reminders", icon: Clock },
  { value: "event", label: "Events", icon: CalendarDays },
  { value: "announcement", label: "Announcements", icon: Megaphone },
];

interface FilterTabsProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
}

export function FilterTabs({ value, onChange }: FilterTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-5 pb-1">
      {filters.map(({ value: v, label, icon: Icon }) => {
        const active = v === value;
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium ${
              active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
