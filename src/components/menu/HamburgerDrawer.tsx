import { useNavigate } from "react-router-dom";
import { Heart, Bell, Settings, Info, ChevronRight } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useNotifications } from "@/context/NotificationContext";
import { menuItems } from "@/data/menu-items";

interface HamburgerDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HamburgerDrawer({ open, onOpenChange }: HamburgerDrawerProps) {
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();

  const go = (to: string) => {
    onOpenChange(false);
    navigate(to);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="flex w-[85%] max-w-sm flex-col gap-0 overflow-y-auto bg-card p-0 sm:max-w-sm"
      >
        <SheetTitle className="sr-only">Main menu</SheetTitle>
        <div className="px-6 pb-4 pt-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-b from-primary/10 to-accent/20">
            <Heart className="h-10 w-10 text-primary" strokeWidth={1.5} />
          </div>
          <h2 className="mt-4 font-heading text-2xl font-semibold text-foreground">Welcome!</h2>
          <p className="text-base text-muted-foreground">
            Our Mother of Perpetual Help,
            <br />
            pray for us. <Heart className="inline h-4 w-4 text-accent" fill="currentColor" />
          </p>
        </div>

        <div className="flex-1 px-3">
          {menuItems.map(({ label, icon: Icon, to }) => (
            <button
              key={label}
              type="button"
              onClick={() => go(to)}
              className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left hover:bg-secondary"
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="flex-1 font-heading text-base font-medium text-foreground">
                {label}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}

          <button
            type="button"
            onClick={() => go("/notifications")}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left hover:bg-secondary"
          >
            <Bell className="h-5 w-5 text-primary" />
            <span className="flex-1 font-heading text-base font-medium text-foreground">
              Reminders
            </span>
            {unreadCount > 0 && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
          </button>

          <div className="my-2 border-t border-border" />

          <button
            type="button"
            onClick={() => go("/more")}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left hover:bg-secondary"
          >
            <Settings className="h-5 w-5 text-primary" />
            <span className="flex-1 font-heading text-base font-medium text-foreground">
              Settings
            </span>
          </button>
          <button
            type="button"
            onClick={() => go("/more")}
            className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left hover:bg-secondary"
          >
            <Info className="h-5 w-5 text-primary" />
            <span className="flex-1 font-heading text-base font-medium text-foreground">
              About
            </span>
          </button>
        </div>

        <div className="m-4 flex items-center gap-3 rounded-2xl bg-primary p-4">
          <Heart className="h-6 w-6 text-accent" fill="currentColor" />
          <div>
            <p className="font-heading text-sm font-semibold text-primary-foreground">
              Pray without ceasing.
            </p>
            <p className="text-xs text-primary-foreground/70">— 1 Thessalonians 5:17</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
