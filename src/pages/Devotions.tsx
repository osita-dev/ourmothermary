import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { sessions } from "@/data/sessions";
import { DevotionCard } from "@/components/home/DevotionCard";
import { BottomNav } from "@/components/home/BottomNav";

export default function Devotions() {
  const navigate = useNavigate();

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
        <h1 className="font-heading text-xl font-semibold text-foreground">
          All Devotions
        </h1>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 px-5 sm:grid-cols-3 md:grid-cols-4">
        {sessions.map((session) => (
          <DevotionCard key={session.id} session={session} />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
