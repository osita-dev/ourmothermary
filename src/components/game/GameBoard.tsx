import { useRef } from "react";
import type { PointerEvent } from "react";
import type { GameTile } from "@/lib/game-utils";
import { getTilePosition } from "@/lib/game-utils";
import { LetterTile } from "./LetterTile";

interface GameBoardProps {
  tiles: GameTile[];
  path: number[];
  onPathChange: (path: number[]) => void;
  onRelease: () => void;
  disabled?: boolean;
}

// Owns the pointer-drag hit-testing: on down/move, checks the live on-screen
// position of every tile against the pointer's coordinates (not relying on
// which DOM element the event technically fired on), so a fast drag across
// gaps between tiles still registers correctly.
export function GameBoard({ tiles, path, onPathChange, onRelease, disabled }: GameBoardProps) {
  const tileRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const isDragging = useRef(false);

  const hitTestTile = (clientX: number, clientY: number): number | null => {
    for (const tile of tiles) {
      const el = tileRefs.current[tile.tileId];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const radius = rect.width / 2 + 8;
      const dx = clientX - cx;
      const dy = clientY - cy;
      if (dx * dx + dy * dy <= radius * radius) return tile.tileId;
    }
    return null;
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    const hit = hitTestTile(e.clientX, e.clientY);
    if (hit === null) return;
    isDragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    onPathChange([hit]);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || disabled) return;
    const hit = hitTestTile(e.clientX, e.clientY);
    if (hit === null) return;

    const existingIndex = path.lastIndexOf(hit);
    if (existingIndex !== -1) {
      // Dragged back onto a tile already in the path — pull back / undo
      // everything selected after it, rather than locking the path in.
      if (existingIndex === path.length - 1) return; // already the tip, no-op
      onPathChange(path.slice(0, existingIndex + 1));
      return;
    }

    // A brand new tile — extend the path forward.
    onPathChange([...path, hit]);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    onRelease();
  };

  // The connecting "rope" — a point per selected tile, in selection order,
  // using the exact same position math the tiles themselves are placed with.
  const linePoints = path
    .map((tileId) => {
      const index = tiles.findIndex((t) => t.tileId === tileId);
      if (index === -1) return null;
      const { x, y } = getTilePosition(index, tiles.length);
      return `${x},${y}`;
    })
    .filter((p): p is string => p !== null)
    .join(" ");

  return (
    <div
      className="relative mx-auto h-64 w-80 touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {tiles.map((tile, i) => (
        <LetterTile
          key={tile.tileId}
          ref={(el) => {
            tileRefs.current[tile.tileId] = el;
          }}
          letter={tile.letter}
          index={i}
          total={tiles.length}
          selected={path.includes(tile.tileId)}
        />
      ))}

      {/* Rendered last so it paints above the tiles, not hidden beneath them. */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="-160 -128 320 256"
      >
        {path.length > 1 && (
          <polyline
            points={linePoints}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}