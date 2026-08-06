import type { NestedFlow } from "@/types";

export const nestedFlows: NestedFlow[] = [
  {
    id: "rosary-joyful",
    title_en: "The Holy Rosary",
    subtitle_en: "Joyful Mysteries",
    items: [
      { id: "annunciation", title_en: "The Annunciation", body_en: "We meditate on the angel Gabriel's visit to Mary, announcing that she would be the Mother of God. We pray for the virtue of humility." },
      { id: "visitation", title_en: "The Visitation", body_en: "We meditate on Mary's visit to her cousin Elizabeth, who was carrying St. John the Baptist. We pray for the virtue of charity toward our neighbor." },
      { id: "nativity", title_en: "The Nativity", body_en: "We meditate on the birth of Our Lord Jesus Christ in Bethlehem. We pray for the virtue of poverty of spirit and detachment from material things." },
      { id: "presentation", title_en: "The Presentation", body_en: "We meditate on the presentation of the Child Jesus in the Temple. We pray for the virtue of obedience." },
      { id: "finding-in-the-temple", title_en: "The Finding in the Temple", body_en: "We meditate on the finding of the Child Jesus among the teachers in the Temple after three days. We pray for the virtue of piety and perseverance in seeking Christ." },
    ],
  },
];

export function getNestedFlowById(id: string): NestedFlow | undefined {
  return nestedFlows.find((f) => f.id === id);
}
