// Fully isolated from the prayer/novena data model — this feature does not
// import Prayer/Session/Step, and nothing in the prayer side imports this.
export interface WordPuzzle {
  id: string;
  category: string;
  sentenceBefore: string;
  sentenceAfter: string;
  answer: string; // uppercase letters only, e.g. "ELIZABETH"
  distractorLetters: string[]; // extra letters mixed into the tile pool
  fact?: string; // shown after a correct completion
}