import { ArrowLeft, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import type { NestedFlow } from "@/types";

interface NestedFlowScreenProps {
  flow: NestedFlow;
  itemIndex: number;
  onBack: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function NestedFlowScreen({ flow, itemIndex, onBack, onPrevious, onNext }: NestedFlowScreenProps) {
  const item = flow.items[itemIndex];
  const isFirst = itemIndex === 0;
  const isLast = itemIndex === flow.items.length - 1;

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
        <div className="text-center">
          <p className="font-heading text-base font-semibold text-foreground">{flow.title_en}</p>
          <p className="text-xs text-muted-foreground">{flow.subtitle_en}</p>
        </div>
        <button
          type="button"
          aria-label="Settings"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-card shadow-card"
        >
          <Settings className="h-5 w-5 text-primary" />
        </button>
      </div>

      <div className="mt-6 flex flex-1 flex-col items-center px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-primary-foreground">
          {itemIndex + 1}
        </div>
        <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">{item.title_en}</h3>
        <p className="mt-3 text-base leading-relaxed text-foreground/90">{item.body_en}</p>
      </div>

      <div className="fixed inset-x-0 bottom-0 bg-background px-5 pb-6 pt-3">
        <div className="mb-4 flex justify-center gap-2">
          {flow.items.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full ${i === itemIndex ? "bg-primary" : "bg-secondary"}`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onPrevious}
            disabled={isFirst}
            className="flex flex-1 items-center justify-center gap-1 rounded-full border border-border py-4 font-heading text-base font-semibold text-foreground disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>
          <button
            type="button"
            onClick={onNext}
            className="flex flex-1 items-center justify-center gap-1 rounded-full bg-primary py-4 font-heading text-base font-semibold text-primary-foreground"
          >
            {isLast ? "Finish" : "Next"}
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
