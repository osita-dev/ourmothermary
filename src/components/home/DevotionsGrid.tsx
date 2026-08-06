import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sessions } from "@/data/sessions";
import { DevotionCard } from "./DevotionCard";

export function DevotionsGrid() {
  const navigate = useNavigate();

  return (
    <div className="mt-7 px-5">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold text-foreground">Explore Devotions</h2>
        <button
          type="button"
          onClick={() => navigate("/devotions")}
          className="flex items-center gap-0.5 text-sm font-medium text-accent-dark"
        >
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {sessions.map((session) => (
          <DevotionCard key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}
