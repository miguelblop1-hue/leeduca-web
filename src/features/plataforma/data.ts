export const individualAges = ["3", "4", "5"] as const;
export const collectiveAges = ["6", "7", "8", "9", "10", "11"] as const;

export const preleoPrograms = [
  "universal",
  "intensificacion",
  "repaso",
  "paleta",
] as const;

export type PreleoProgram = (typeof preleoPrograms)[number];
