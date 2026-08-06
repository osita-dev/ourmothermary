import { useNavigate } from "react-router-dom";
import type { Session } from "@/types";
import { useProgress } from "@/context/ProgressContext";

const colorClassMap: Record<Session["colorToken"], string> = {
  sage: "bg-card-sage",
  gold: "bg-card-gold",
  lavender: "bg-card-lavender",
  coral: "bg-card-coral",
  blue: "bg-card-blue",
  peach: "bg-card-peach",
  mint: "bg-card-mint",
  olive: "bg-card-olive",
};

interface DevotionCardProps {
  session: Session;
}

export function DevotionCard({ session }: DevotionCardProps) {
  const navigate = useNavigate();
  const { getProgress } = useProgress();
  const progress = getProgress(session.id);
  const Icon = session.icon;

  const percent = progress
    ? Math.round((progress.currentStepIndex / session.steps.length) * 100)
    : 0;

  return (
    <button
      type="button"
      onClick={() => navigate(`/session/${session.id}`)}
      className={`flex flex-col items-center gap-2 rounded-3xl p-4 text-center ${colorClassMap[session.colorToken]}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-card/70">
        <Icon className="h-6 w-6 text-primary" strokeWidth={1.75} />
      </div>
      <p className="font-heading text-sm font-semibold leading-tight text-foreground">
        {session.title_en}
      </p>
      {progress && percent > 0 && (
        <div className="h-1 w-full overflow-hidden rounded-full bg-foreground/10">
          <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
        </div>
      )}
    </button>
  );
}
