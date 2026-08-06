import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { getSessionById } from "@/data/sessions";
import { getNestedFlowById } from "@/data/nested-flows";
import { useProgress } from "@/context/ProgressContext";
import { useNotifications } from "@/context/NotificationContext";
import { SessionIntro } from "@/components/session/SessionIntro";
import { StepScreen } from "@/components/session/StepScreen";
import { NestedFlowIntro } from "@/components/session/NestedFlowIntro";
import { NestedFlowScreen } from "@/components/session/NestedFlowScreen";
import { CompletionScreen } from "@/components/session/CompletionScreen";

type Phase = "intro" | "step" | "nestedIntro" | "nestedPlay" | "complete";

export default function SessionPlayer() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { getProgress, setStepIndex, resetProgress } = useProgress();
  const { pushActionNotification } = useNotifications();

  const session = sessionId ? getSessionById(sessionId) : undefined;
  const savedProgress = sessionId ? getProgress(sessionId) : undefined;

  // Resume directly into the saved step if progress already exists;
  // otherwise show the Session Intro first.
  const startsResumed = !!savedProgress && !savedProgress.completed && savedProgress.currentStepIndex > 0;

  const [phase, setPhase] = useState<Phase>(startsResumed ? "step" : "intro");
  const [stepIndex, setStepIndexState] = useState(
    startsResumed ? savedProgress!.currentStepIndex : 0
  );
  const [nestedItemIndex, setNestedItemIndex] = useState(0);

  const startTimeRef = useRef<number>(Date.now());
  const hasNotifiedCompletion = useRef(false);

  const currentStep = session?.steps[stepIndex];
  const nestedFlow =
    currentStep?.type === "nested" ? getNestedFlowById(currentStep.nestedFlowId) : undefined;

  const elapsedSeconds = useMemo(
    () => Math.max(0, Math.round((Date.now() - startTimeRef.current) / 1000)),
    // Recomputed only when we actually reach the completion screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [phase === "complete"]
  );

  useEffect(() => {
    if (phase === "complete" && !hasNotifiedCompletion.current && session) {
      hasNotifiedCompletion.current = true;
      pushActionNotification({
        category: "announcement",
        title_en: "Great job!",
        message_en: `You have completed ${session.title_en}. May Our Mother of Perpetual Help bless you.`,
        icon: CheckCircle2,
      });
    }
  }, [phase, session, pushActionNotification]);

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

  const goBackOut = () => navigate(-1);

  const advancePastStep = () => {
    const nextIndex = stepIndex + 1;
    if (nextIndex >= session.steps.length) {
      setStepIndex(session.id, session.steps.length - 1, session.steps.length);
      setPhase("complete");
      return;
    }
    setStepIndex(session.id, nextIndex, session.steps.length);
    setStepIndexState(nextIndex);
    const next = session.steps[nextIndex];
    setPhase(next.type === "nested" ? "nestedIntro" : "step");
  };

  const handleStart = () => {
    startTimeRef.current = Date.now();
    setStepIndexState(0);
    setStepIndex(session.id, 0, session.steps.length);
    const first = session.steps[0];
    setPhase(first.type === "nested" ? "nestedIntro" : "step");
  };

  const handlePrayAgain = () => {
    resetProgress(session.id);
    hasNotifiedCompletion.current = false;
    startTimeRef.current = Date.now();
    setNestedItemIndex(0);
    setStepIndexState(0);
    const first = session.steps[0];
    setPhase(first.type === "nested" ? "nestedIntro" : "step");
  };

  if (phase === "intro") {
    return <SessionIntro session={session} onBack={goBackOut} onStart={handleStart} />;
  }

  if (phase === "complete") {
    return (
      <CompletionScreen
        sessionTitle={session.title_en}
        elapsedSeconds={elapsedSeconds}
        onBackHome={() => navigate("/")}
        onPrayAgain={handlePrayAgain}
      />
    );
  }

  if (phase === "nestedIntro" && currentStep?.type === "nested") {
    return (
      <NestedFlowIntro
        session={session}
        step={currentStep}
        stepIndex={stepIndex}
        onBack={goBackOut}
        onBeginRosary={() => {
          setNestedItemIndex(0);
          setPhase("nestedPlay");
        }}
      />
    );
  }

  if (phase === "nestedPlay" && nestedFlow) {
    return (
      <NestedFlowScreen
        flow={nestedFlow}
        itemIndex={nestedItemIndex}
        onBack={() => setPhase("nestedIntro")}
        onPrevious={() => setNestedItemIndex((i) => Math.max(0, i - 1))}
        onNext={() => {
          if (nestedItemIndex >= nestedFlow.items.length - 1) {
            advancePastStep();
          } else {
            setNestedItemIndex((i) => i + 1);
          }
        }}
      />
    );
  }

  if (currentStep?.type === "prayer") {
    return (
      <StepScreen
        session={session}
        step={currentStep}
        stepIndex={stepIndex}
        onBack={goBackOut}
        onContinue={advancePastStep}
      />
    );
  }

  return null;
}
