import { Quote } from "lucide-react";

export function QuoteCard() {
  return (
    <div className="relative mx-5 mt-7 overflow-hidden rounded-3xl bg-card p-5">
      <Quote className="h-6 w-6 text-accent" fill="currentColor" />
      <p className="mt-1 font-heading text-lg font-medium leading-snug text-foreground">
        Never be afraid of loving the Blessed Virgin too much.
      </p>
      <p className="mt-1 text-sm font-medium text-accent-dark">— St. Alphonsus Liguori</p>
    </div>
  );
}
