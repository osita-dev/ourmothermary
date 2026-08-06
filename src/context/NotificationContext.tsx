import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { CheckCircle2 } from "lucide-react";
import type { AppNotification } from "@/types";
import { generateCalendarNotifications } from "@/lib/notifications-engine";

const ACTION_STORAGE_KEY = "moph.notifications.actions";
const READ_STORAGE_KEY = "moph.notifications.read";

interface NotificationContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  pushActionNotification: (
    notification: Omit<AppNotification, "id" | "source" | "read" | "timestamp">
  ) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

function loadActionNotifications(): AppNotification[] {
  try {
    const raw = localStorage.getItem(ACTION_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Omit<AppNotification, "icon">[];
    return parsed.map((n) => ({ ...n, icon: CheckCircle2 }));
  } catch {
    return [];
  }
}

function loadReadIds(): Set<string> {
  try {
    const raw = localStorage.getItem(READ_STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [actionNotifications, setActionNotifications] = useState<AppNotification[]>(() =>
    loadActionNotifications()
  );
  const [readIds, setReadIds] = useState<Set<string>>(() => loadReadIds());

  useEffect(() => {
    try {
      localStorage.setItem(ACTION_STORAGE_KEY, JSON.stringify(actionNotifications));
    } catch {
      // ignore
    }
  }, [actionNotifications]);

  useEffect(() => {
    try {
      localStorage.setItem(READ_STORAGE_KEY, JSON.stringify([...readIds]));
    } catch {
      // ignore
    }
  }, [readIds]);

  const calendarNotifications = useMemo(() => generateCalendarNotifications(new Date()), []);

  const notifications = useMemo<AppNotification[]>(() => {
    const merged = [...calendarNotifications, ...actionNotifications].map((n) => ({
      ...n,
      read: readIds.has(n.id),
    }));
    return merged.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [calendarNotifications, actionNotifications, readIds]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id: string) => {
    setReadIds((prev) => new Set(prev).add(id));
  }, []);

  const markAllAsRead = useCallback(() => {
    setReadIds((prev) => {
      const next = new Set(prev);
      notifications.forEach((n) => next.add(n.id));
      return next;
    });
  }, [notifications]);

  const pushActionNotification = useCallback(
    (notification: Omit<AppNotification, "id" | "source" | "read" | "timestamp">) => {
      const entry: AppNotification = {
        ...notification,
        id: `action-${Date.now()}`,
        source: "action",
        read: false,
        timestamp: new Date().toISOString(),
      };
      setActionNotifications((prev) => [entry, ...prev]);
    },
    []
  );

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead, pushActionNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications(): NotificationContextValue {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}
