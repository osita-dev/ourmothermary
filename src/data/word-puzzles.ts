import type { WordPuzzle } from "@/types/game";

// 5 starter puzzles to prove the mechanic. Same shape scales cleanly to
// hundreds/thousands later — just add more entries here.
export const wordPuzzles: WordPuzzle[] = [
  {
    id: "puzzle-1",
    category: "Blessed Virgin Mary",
    sentenceBefore: "Mary visited",
    sentenceAfter: ".",
    answer: "ELIZABETH",
    distractorLetters: ["R", "O"],
    fact: "Elizabeth was Mary's cousin, whom Mary visited after the Annunciation.",
  },
  {
    id: "puzzle-2",
    category: "Jesus",
    sentenceBefore: "Jesus was born in",
    sentenceAfter: ".",
    answer: "BETHLEHEM",
    distractorLetters: ["X", "Q", "R"],
    fact: "Bethlehem, meaning 'house of bread,' is a small town south of Jerusalem.",
  },
  {
    id: "puzzle-3",
    category: "Bible",
    sentenceBefore: "The Bible begins with",
    sentenceAfter: ".",
    answer: "GENESIS",
    distractorLetters: ["T", "R", "L"],
    fact: "Genesis means 'origin' — it opens with the story of creation.",
  },
  {
    id: "puzzle-4",
    category: "Blessed Virgin Mary",
    sentenceBefore: "Mary's song is called the",
    sentenceAfter: ".",
    answer: "MAGNIFICAT",
    distractorLetters: ["E", "R", "O"],
    fact: "The Magnificat is Mary's hymn of praise, spoken during the Visitation.",
  },
  {
    id: "puzzle-5",
    category: "Sacraments",
    sentenceBefore: "Jesus gave us the",
    sentenceAfter: ".",
    answer: "EUCHARIST",
    distractorLetters: ["N", "B", "L"],
    fact: "The Eucharist was instituted by Jesus at the Last Supper.",
  },
];