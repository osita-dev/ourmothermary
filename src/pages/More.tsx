import { ArrowLeft, Bell, Settings, Info, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { menuItems } from "@/data/menu-items";
import { useNotifications } from "@/context/NotificationContext";
import { BottomNav } from "@/components/home/BottomNav";

export default function More() {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="flex items-center gap-3 px-5 pt-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-card shadow-card"
        >
          <ArrowLeft className="h-5 w-5 text-primary" />
        </button>
        <h1 className="font-heading text-xl font-semibold text-foreground">More</h1>
      </div>

      <div className="mt-4 px-3">
        {menuItems.map(({ label, icon: Icon, to }) => (
          <button
            key={label}
            type="button"
            onClick={() => navigate(to)}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left hover:bg-secondary"
          >
            <Icon className="h-5 w-5 text-primary" />
            <span className="flex-1 font-heading text-base font-medium text-foreground">{label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}

        <button
          type="button"
          onClick={() => navigate("/notifications")}
          className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left hover:bg-secondary"
        >
          <Bell className="h-5 w-5 text-primary" />
          <span className="flex-1 font-heading text-base font-medium text-foreground">Reminders</span>
          {unreadCount > 0 && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
        </button>

        <div className="my-2 border-t border-border" />

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left hover:bg-secondary"
        >
          <Settings className="h-5 w-5 text-primary" />
          <span className="flex-1 font-heading text-base font-medium text-foreground">Settings</span>
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left hover:bg-secondary"
        >
          <Info className="h-5 w-5 text-primary" />
          <span className="flex-1 font-heading text-base font-medium text-foreground">About</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
