import { Menu, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@/context/NotificationContext";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  return (
    <header className="flex items-center justify-between px-5 pt-5">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-card"
      >
        <Menu className="h-5 w-5 text-primary" />
      </button>

      <button
        type="button"
        onClick={() => navigate("/notifications")}
        aria-label="Notifications"
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-card shadow-card"
      >
        <Bell className="h-5 w-5 text-primary" />
        {unreadCount > 0 && (
          <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-accent" />
        )}
      </button>
    </header>
  );
}
