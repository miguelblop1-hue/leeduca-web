import type { PreleoExercise, VisualId } from "./types";

export const DEFAULT_SESSION_SIZE = 8;
export const MAX_SESSION_SIZE = 10;

function hash(value: string): number {
  let result = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    result ^= value.charCodeAt(i);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}

/** Orden estable de las tres opciones: evita sesgos de posición sin romper el SSR. */
export function orderOptions(exercise: PreleoExercise): VisualId[] {
  const options = [...exercise.options];
  let seed = hash(`${exercise.id}:${exercise.correct}`);
  for (let i = options.length - 1; i > 0; i -= 1) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
}

export function buildSession(
  curated: PreleoExercise[],
  generated: PreleoExercise[] = [],
  count = DEFAULT_SESSION_SIZE,
): PreleoExercise[] {
  const size = Math.min(MAX_SESSION_SIZE, Math.max(1, Math.round(count)));
  const seen = new Set<string>();
  const session: PreleoExercise[] = [];

  for (const exercise of [...curated, ...generated]) {
    if (session.length >= size) break;
    if (seen.has(exercise.id)) continue;
    seen.add(exercise.id);
    session.push(exercise);
  }

  return session;
}
