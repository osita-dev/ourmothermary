import { forwardRef } from "react";
import { getTilePosition } from "@/lib/game-utils";

interface LetterTileProps {
  letter: string;
  index: number;
  total: number;
  selected: boolean;
}

// A single scattered tile. Positioned via transform so the drag hit-testing
// in GameBoard can read its on-screen rect directly.
export const LetterTile = forwardRef<HTMLDivElement, LetterTileProps>(
  ({ letter, index, total, selected }, ref) => {
    const { x, y } = getTilePosition(index, total);

    return (
      <div
        ref={ref}
        data-game-tile
        style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
        className={`absolute left-1/2 top-1/2 flex h-14 w-14 select-none items-center justify-center rounded-2xl font-heading text-xl font-bold shadow-card transition-colors ${
          selected
            ? "bg-primary text-primary-foreground"
            : "bg-card text-foreground"
        }`}
      >
        {letter}
      </div>
    );
  }
);
LetterTile.displayName = "LetterTile";