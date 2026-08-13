import { Home, BookOpen, Puzzle, CalendarDays, LayoutGrid } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const tabs = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/devotions", label: "Devotions", icon: BookOpen, end: false },
  { to: "/game", label: "Game", icon: Puzzle, end: false },
  { to: "/calendar", label: "Calendar", icon: CalendarDays, end: false },
  { to: "/more", label: "More", icon: LayoutGrid, end: false },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-border bg-card px-2 py-3">
      {tabs.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className="flex flex-col items-center gap-1 px-2 text-muted-foreground"
          activeClassName="text-primary"
        >
          <Icon className="h-5 w-5" />
          <span className="text-[11px] font-medium">{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
