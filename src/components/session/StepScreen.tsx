import { ArrowLeft, MoreHorizontal, ChevronRight } from "lucide-react";
import type { Session, Step } from "@/types";
import { getPrayerById } from "@/data/prayers";
import { StepIndicator } from "./StepIndicator";

interface StepScreenProps {
  session: Session;
  step: Extract<Step, { type: "prayer" }>;
  stepIndex: number;
  onBack: () => void;
  onContinue: () => void;
  continueLabel?: string;
}

export function StepScreen({
  session,
  step,
  stepIndex,
  onBack,
  onContinue,
  continueLabel = "Continue",
}: StepScreenProps) {
  const prayer = getPrayerById(step.prayerId);
  const Icon = step.icon;

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <div className="flex items-center justify-between px-5 pt-5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-card"
        >
          <ArrowLeft className="h-5 w-5 text-primary" />
        </button>
        <h2 className="font-heading text-base font-semibold text-foreground">{session.title_en}</h2>
        <button
          type="button"
          aria-label="More options"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-card"
        >
          <MoreHorizontal className="h-5 w-5 text-primary" />
        </button>
      </div>

      <StepIndicator totalSteps={session.steps.length} currentIndex={stepIndex} />

      <div className="mt-8 flex flex-1 flex-col items-center px-6 text-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-b from-primary/10 to-accent/20">
          <Icon className="h-12 w-12 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
          {step.stepNumber}. {step.title_en}
        </h3>
        <div className="my-3 h-0.5 w-10 rounded-full bg-accent" />
        <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90">
          {prayer?.body_en}
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-0 bg-background px-5 pb-6 pt-3">
        <button
          type="button"
          onClick={onContinue}
          className="flex w-full items-center justify-center gap-1 rounded-full bg-primary py-4 font-heading text-base font-semibold text-primary-foreground"
        >
          {continueLabel}
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
