export interface GameTile {
  tileId: number;
  letter: string;
}

// Fisher–Yates shuffle — used fresh each time a puzzle loads.
function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Builds the shuffled tile pool for a puzzle: every letter of the answer
// (duplicates kept as separate tiles, e.g. "SMELL" needs two L tiles) plus
// the distractor letters, all shuffled together.
export function buildTilePool(answer: string, distractors: string[]): GameTile[] {
  const letters = [...answer.split(""), ...distractors];
  return shuffle(letters).map((letter, i) => ({ tileId: i, letter }));
}

// Deterministic scattered-circle layout so tiles don't overlap and don't
// re-jitter on every re-render (position is a pure function of index/total).
export function getTilePosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radiusX = 118;
  const radiusY = 96;
  const jitter = ((index * 53) % 24) - 12;
  const x = Math.cos(angle) * (radiusX + jitter);
  const y = Math.sin(angle) * (radiusY + jitter);
  return { x, y };
}