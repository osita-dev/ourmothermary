import { forwardRef } from "react";
import type { Step } from "@/types";
import { getNestedFlowById } from "@/data/nested-flows";

const mysteries = [
  { name: "Joyful Mysteries", days: "Monday & Saturday", color: "bg-card-coral" },
  { name: "Sorrowful Mysteries", days: "Tuesday & Friday", color: "bg-card-lavender" },
  { name: "Glorious Mysteries", days: "Wednesday & Sunday", color: "bg-card-gold" },
  { name: "Luminous Mysteries", days: "Thursday", color: "bg-card-blue" },
];

interface RosarySectionProps {
  step: Extract<Step, { type: "nested" }>;
}

// The Rosary used to branch into its own separate stepper screen. Now it's
// just another section in the scroll — the mysteries are simply listed one
// after another, in place, like the rest of the flow.
export const RosarySection = forwardRef<HTMLDivElement, RosarySectionProps>(
  ({ step }, ref) => {
    const flow = getNestedFlowById(step.nestedFlowId);
    const Icon = step.icon;

    return (
      <section ref={ref} data-step-section className="scroll-mt-28 px-6 py-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-primary/10 to-accent/20">
            <Icon className="h-9 w-9 text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="mt-4 font-heading text-xl font-semibold text-foreground">
            {step.stepNumber}. {step.title_en}
          </h3>
          <div className="my-3 h-0.5 w-10 rounded-full bg-accent" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            We now meditate on the mysteries of the Holy Rosary.
          </p>
        </div>

        <div className="mt-5 space-y-2">
          {mysteries.map((m) => (
            <div key={m.name} className={`flex items-center justify-between rounded-2xl px-4 py-3 ${m.color}`}>
              <span className="font-heading text-sm font-semibold text-foreground">{m.name}</span>
              <span className="text-xs text-muted-foreground">{m.days}</span>
            </div>
          ))}
        </div>

        {flow && (
          <div className="mt-6 space-y-6">
            <p className="text-center font-heading text-sm font-semibold text-accent-dark">
              {flow.subtitle_en}
            </p>
            {flow.items.map((item, i) => (
              <div key={item.id} className="flex gap-4 rounded-3xl bg-secondary/50 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div>
                  <p className="font-heading text-base font-semibold text-foreground">
                    {item.title_en}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/80">{item.body_en}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
);
RosarySection.displayName = "RosarySection";