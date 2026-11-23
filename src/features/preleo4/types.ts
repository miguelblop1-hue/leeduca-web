export const PRELEO_BLOCK_IDS = [
  "conciencia",
  "vocabulario",
  "comprension",
  "fluidez",
] as const;

export type PreleoBlockId = (typeof PRELEO_BLOCK_IDS)[number];

export const VISUAL_IDS = [
  "copa",
  "lapiz",
  "casa",
  "cama",
  "gato",
  "pato",
  "perro",
  "mesa",
  "queso",
  "vaca",
  "pan",
  "flor",
  "mariposa",
  "regalo",
  "globo",
  "helado",
  "luna",
  "pelota",
  "sol",
] as const;

export type VisualId = (typeof VISUAL_IDS)[number];

export type VisualCredit = {
  author: string;
  license: string;
  sourceUrl: string;
};

export type PreleoVisual = {
  id: VisualId;
  word: string;
  syllables: string[];
  image: string;
  category: "animal" | "food" | "object" | "nature";
  credit: VisualCredit;
};

export type PreleoExercise = {
  id: string;
  title: string;
  options: [VisualId, VisualId, VisualId];
  correct: VisualId;
  teacherNote?: string;
  source: "curated" | "ai";
};

export type PreleoActivity = {
  id: string;
  blockId: PreleoBlockId;
  title: string;
  subtitle: string;
  objective: string;
  standard: string;
  exercises: PreleoExercise[];
};

export type PreleoBlock = {
  id: PreleoBlockId;
  title: string;
  subtitle: string;
  activities: PreleoActivity[];
};
