interface BlankRowProps {
  answerLength: number;
  currentLetters: string[]; // letters selected so far, in order
  status: "playing" | "correct" | "wrong";
}

// The live preview row: fills in as the player drags across tiles,
// flashes red on a wrong attempt, turns green on success.
export function BlankRow({ answerLength, currentLetters, status }: BlankRowProps) {
  return (
    <div className={`flex justify-center gap-1.5 ${status === "wrong" ? "animate-pulse" : ""}`}>
      {Array.from({ length: answerLength }, (_, i) => {
        const letter = currentLetters[i];
        return (
          <div
            key={i}
            className={`flex h-10 w-8 items-center justify-center rounded-lg border-2 font-heading text-lg font-bold ${
              status === "correct"
                ? "border-primary bg-primary text-primary-foreground"
                : status === "wrong"
                  ? "border-destructive bg-destructive/10 text-destructive"
                  : letter
                    ? "border-accent bg-card text-foreground"
                    : "border-border bg-card/50 text-transparent"
            }`}
          >
            {letter ?? "_"}
          </div>
        );
      })}
    </div>
  );
}