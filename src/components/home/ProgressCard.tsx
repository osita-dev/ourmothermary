import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "@/context/ProgressContext";
import { getSessionById } from "@/data/sessions";
import { getPrayerById } from "@/data/prayers";

function ProgressRing({ percent }: { percent: number }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center">
      <svg viewBox="0 0 72 72" className="h-20 w-20 -rotate-90">
        <circle cx="36" cy="36" r={radius} fill="none" stroke="hsl(150 30% 35%)" strokeWidth="6" />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="hsl(38 62% 56%)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-heading text-lg font-bold text-primary-foreground">{percent}%</span>
      </div>
    </div>
  );
}

export function ProgressCard() {
  const navigate = useNavigate();
  const { progressMap } = useProgress();

  const inProgress = useMemo(() => {
    const entries = Object.values(progressMap).filter((p) => !p.completed);
    if (entries.length === 0) return null;
    return entries.sort(
      (a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
    )[0];
  }, [progressMap]);

  if (!inProgress) return null;

  const session = getSessionById(inProgress.sessionId);
  if (!session) return null;

  const percent = Math.round((inProgress.currentStepIndex / session.steps.length) * 100);
  const currentStep = session.steps[inProgress.currentStepIndex];
  const lastLabel =
    currentStep?.type === "prayer"
      ? getPrayerById(currentStep.prayerId)?.title_en ?? currentStep.title_en
      : currentStep?.title_en ?? "";

  return (
    <button
      type="button"
      onClick={() => navigate(`/session/${session.id}`)}
      className="mx-5 mt-4 flex w-[calc(100%-2.5rem)] items-center justify-between rounded-3xl bg-primary p-5 text-left"
    >
      <div className="flex items-center gap-4">
        <ProgressRing percent={percent} />
        <div>
          <p className="text-sm font-medium text-accent">Continue where you left off</p>
          <p className="font-heading text-lg font-semibold text-primary-foreground">
            {session.title_en}
          </p>
          <div className="mt-2 h-1.5 w-40 overflow-hidden rounded-full bg-primary-light">
            <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-1 text-xs text-primary-foreground/70">
            You left off at: <span className="font-semibold">{lastLabel}</span>
          </p>
        </div>
      </div>
    </button>
  );
}
