export type ExerciseArea =
  | "phonological"
  | "vocabulary"
  | "comprehension"
  | "memory"
  | "morphosyntax"
  | "alphabetic";

export type ExerciseType = "choice" | "memory";

export type ExerciseOption = {
  value: string;
  label: string;
  visual?: string;
  image?: string;
};

export type ExerciseStimulus = {
  label: string;
  visual?: string;
  image?: string;
};

export type LocalizedExercise = {
  prompt: string;
  teacherNote?: string;
  stimulus?: ExerciseStimulus;
  options?: Array<string | ExerciseOption>;
  sequence?: string[];
  correct: string | string[];
  feedback?: string;
};

export type Exercise = {
  id: string;
  area: ExerciseArea;
  type: ExerciseType;
  es: LocalizedExercise;
  en: LocalizedExercise;
};
