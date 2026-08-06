import {
  Home,
  Sparkles,
  BookOpen,
  CalendarDays,
  Crown,
  Flower2,
  Heart,
  Sunrise,
  Star,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
  label: string;
  icon: LucideIcon;
  to: string;
}

// Single source of truth for the "full" navigation list — the hamburger
// drawer renders this as a slide-in, the bottom nav's "More" tab renders
// the same list as a full page. Same routes, two presentations.
export const menuItems: MenuItem[] = [
  { label: "Home", icon: Home, to: "/" },
  { label: "Today's Devotion", icon: Sparkles, to: "/session/weekly-novena" },
  { label: "Prayer Collection", icon: BookOpen, to: "/session/prayer-collection" },
  { label: "Calendar", icon: CalendarDays, to: "/calendar" },
  { label: "Feast Days", icon: Crown, to: "/session/feast-days-events" },
  { label: "Novenas", icon: Flower2, to: "/devotions" },
  { label: "Consecration", icon: Heart, to: "/session/consecration-preparation" },
  { label: "Retreats", icon: Sunrise, to: "/session/retreats" },
  { label: "Favorites", icon: Star, to: "/devotions" },
];
