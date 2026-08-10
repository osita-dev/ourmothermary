import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { getSessionById } from "@/data/sessions";
import { useProgress } from "@/context/ProgressContext";
import { useNotifications } from "@/context/NotificationContext";
import { SessionIntro } from "@/components/session/SessionIntro";
import { PrayerSection } from "@/components/session/PrayerSection";
import { RosarySection } from "@/components/session/RosarySection";
import { CompletionSection } from "@/components/session/CompletionSection";
import { ScrollProgressBar } from "@/components/session/ScrollProgressBar";

type Phase = "intro" | "flow";

export default function SessionPlayer() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { getProgress, setStepIndex, resetProgress } = useProgress();
  const { pushActionNotification } = useNotifications();

  const session = sessionId ? getSessionById(sessionId) : undefined;
  const savedProgress = sessionId ? getProgress(sessionId) : undefined;

  const startsResumed =
    !!savedProgress && !savedProgress.completed && savedProgress.currentStepIndex > 0;

  const [phase, setPhase] = useState<Phase>(startsResumed ? "flow" : "intro");
  const [activeIndex, setActiveIndex] = useState(startsResumed ? savedProgress!.currentStepIndex : 0);
  const [completionElapsed, setCompletionElapsed] = useState<number | null>(null);

  const startTimeRef = useRef<number>(Date.now());
  const hasNotifiedCompletion = useRef(false);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const completionRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const hasScrolledToResume = useRef(false);

  const totalSteps = session?.steps.length ?? 0;

  const handleComplete = useCallback(() => {
    if (hasNotifiedCompletion.current || !session) return;
    hasNotifiedCompletion.current = true;
    setCompletionElapsed(Math.max(0, Math.round((Date.now() - startTimeRef.current) / 1000)));
    setStepIndex(session.id, totalSteps - 1, totalSteps);
    pushActionNotification({
      category: "announcement",
      title_en: "Great job!",
      message_en: `You have completed ${session.title_en}. May Our Mother of Perpetual Help bless you.`,
      icon: CheckCircle2,
    });
  }, [session, totalSteps, setStepIndex, pushActionNotification]);

  // Scroll-spy: watch every prayer section + the completion sentinel.
  // Whichever section is most visible near the top becomes "active" —
  // this replaces the old Continue-button step advancement entirely.
  useEffect(() => {
    if (phase !== "flow" || !session) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === completionRef.current) {
            if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
              handleComplete();
            }
            continue;
          }
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            const idx = sectionRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) {
              setActiveIndex(idx);
              setStepIndex(session.id, idx, totalSteps);
            }
          }
        }
      },
      { threshold: [0.4], rootMargin: "-15% 0px -35% 0px" }
    );

    sectionRefs.current.forEach((el) => el && observer.observe(el));
    if (completionRef.current) observer.observe(completionRef.current);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, session, totalSteps, handleComplete, setStepIndex]);

  // On resume, jump straight to the saved section (no smooth animation —
  // this should feel like "picking up where you left off", not a scroll).
  useEffect(() => {
    if (phase === "flow" && startsResumed && !hasScrolledToResume.current) {
      hasScrolledToResume.current = true;
      requestAnimationFrame(() => {
        sectionRefs.current[activeIndex]?.scrollIntoView({ block: "start" });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background px-6 text-center">
        <p className="font-heading text-lg font-semibold text-foreground">
          This devotion could not be found.
        </p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="rounded-full bg-primary px-6 py-3 font-heading text-sm font-semibold text-primary-foreground"
        >
          Back to Home
        </button>
      </div>
    );
  }

  const handleStart = () => {
    startTimeRef.current = Date.now();
    setActiveIndex(0);
    setStepIndex(session.id, 0, totalSteps);
    setPhase("flow");
  };

  const handlePrayAgain = () => {
    resetProgress(session.id);
    hasNotifiedCompletion.current = false;
    hasScrolledToResume.current = true; // don't re-trigger resume-scroll
    startTimeRef.current = Date.now();
    setCompletionElapsed(null);
    setActiveIndex(0);
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (phase === "intro") {
    return <SessionIntro session={session} onBack={() => navigate(-1)} onStart={handleStart} />;
  }

  return (
    <div ref={scrollContainerRef} className="min-h-screen bg-background">
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-5 pt-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Back"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-card"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
          </button>
          <h2 className="font-heading text-base font-semibold text-foreground">
            {session.title_en}
          </h2>
          <button
            type="button"
            aria-label="More options"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-card"
          >
            <MoreHorizontal className="h-5 w-5 text-primary" />
          </button>
        </div>
        <ScrollProgressBar activeIndex={activeIndex} totalSteps={totalSteps} />
      </div>

      <div className="divide-y divide-border/60">
        {session.steps.map((step, i) => (
          <div
            key={`${step.type}-${step.stepNumber}`}
            ref={(el) => {
              sectionRefs.current[i] = el;
            }}
          >
            {step.type === "prayer" ? (
              <PrayerSection step={step} />
            ) : (
              <RosarySection step={step} />
            )}
          </div>
        ))}
      </div>

      <CompletionSection
        ref={completionRef}
        sessionTitle={session.title_en}
        elapsedSeconds={completionElapsed ?? 0}
        onBackHome={() => navigate("/")}
        onPrayAgain={handlePrayAgain}
      />
    </div>
  );
}