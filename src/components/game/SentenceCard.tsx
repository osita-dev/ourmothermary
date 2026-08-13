import type { WordPuzzle } from "@/types/game";
import { BlankRow } from "./BlankRow";

interface SentenceCardProps {
  puzzle: WordPuzzle;
  currentLetters: string[];
  status: "playing" | "correct" | "wrong";
}

export function SentenceCard({ puzzle, currentLetters, status }: SentenceCardProps) {
  return (
    <div className="mx-5 rounded-3xl bg-primary p-6 text-center shadow-card">
      <p className="font-heading text-xl font-medium leading-relaxed text-primary-foreground">
        {puzzle.sentenceBefore}{" "}
        <span className="inline-block w-16 border-b-2 border-dashed border-accent align-middle" />{" "}
        {puzzle.sentenceAfter}
      </p>
      <div className="mt-5">
        <BlankRow answerLength={puzzle.answer.length} currentLetters={currentLetters} status={status} />
      </div>
    </div>
  );
}