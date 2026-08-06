import { ArrowLeft, MoreHorizontal, ChevronRight } from "lucide-react";
import type { Session, Step } from "@/types";
import { StepIndicator } from "./StepIndicator";

const mysteries = [
  { name: "Joyful Mysteries", days: "Monday & Saturday", color: "bg-card-coral" },
  { name: "Sorrowful Mysteries", days: "Tuesday & Friday", color: "bg-card-lavender" },
  { name: "Glorious Mysteries", days: "Wednesday & Sunday", color: "bg-card-gold" },
  { name: "Luminous Mysteries", days: "Thursday", color: "bg-card-blue" },
];

interface NestedFlowIntroProps {
  session: Session;
  step: Extract<Step, { type: "nested" }>;
  stepIndex: number;
  onBack: () => void;
  onBeginRosary: () => void;
}

export function NestedFlowIntro({
  session,
  step,
  stepIndex,
  onBack,
  onBeginRosary,
}: NestedFlowIntroProps) {
  const Icon = step.icon;

  return (
    <div className="min-h-screen bg-background pb-10">
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

      <div className="mt-6 flex flex-col items-center px-6 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-primary/10 to-accent/20">
          <Icon className="h-11 w-11 text-primary" strokeWidth={1.5} />
        </div>
        <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">
          {step.stepNumber}. {step.title_en}
        </h3>
        <div className="my-3 h-0.5 w-10 rounded-full bg-accent" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          We now meditate on the mysteries of the Holy Rosary.
        </p>
      </div>

      <div className="mt-4 space-y-2 px-5">
        {mysteries.map((m) => (
          <div key={m.name} className={`flex items-center justify-between rounded-2xl px-4 py-3 ${m.color}`}>
            <span className="font-heading text-sm font-semibold text-foreground">{m.name}</span>
            <span className="text-xs text-muted-foreground">{m.days}</span>
          </div>
        ))}
      </div>

      <div className="px-5">
        <button
          type="button"
          onClick={onBeginRosary}
          className="mt-6 flex w-full items-center justify-center gap-1 rounded-full bg-primary py-4 font-heading text-base font-semibold text-primary-foreground"
        >
          Begin Rosary
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
