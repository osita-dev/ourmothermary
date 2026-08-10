import { forwardRef } from "react";
import type { Step } from "@/types";
import { getPrayerById } from "@/data/prayers";

interface PrayerSectionProps {
  step: Extract<Step, { type: "prayer" }>;
}

// One prayer, rendered as a labeled section in the continuous scroll —
// no button, no page change. The section's own DOM node is what the
// scroll-spy (IntersectionObserver) in SessionPlayer watches.
export const PrayerSection = forwardRef<HTMLDivElement, PrayerSectionProps>(
  ({ step }, ref) => {
    const prayer = getPrayerById(step.prayerId);
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
          <p className="whitespace-pre-line text-base leading-relaxed text-foreground/90">
            {prayer?.body_en}
          </p>
        </div>
      </section>
    );
  }
);
PrayerSection.displayName = "PrayerSection";