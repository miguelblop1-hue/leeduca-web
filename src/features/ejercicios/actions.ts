"use server";

import { generateExercises, type GenerateExercisesInput } from "./generate";
import type { Exercise } from "./types";
import { isAiConfigured } from "@/lib/ai/client";

export type GenerateExercisesState =
  | { ok: true; exercises: Exercise[] }
  | { ok: false; error: string };

const AREAS = new Set([
  "mixed",
  "phonological",
  "vocabulary",
  "comprehension",
  "memory",
  "morphosyntax",
  "alphabetic",
]);
const AGES = new Set(["3", "4", "5"]);
const DIFFICULTIES = new Set(["easy", "medium", "hard"]);

function sanitizeInput(input: {
  theme?: unknown;
  age?: unknown;
  difficulty?: unknown;
  count?: unknown;
  area?: unknown;
}): GenerateExercisesInput | null {
  const theme = typeof input.theme === "string" ? input.theme.trim().slice(0, 120) : "";
  const age = typeof input.age === "string" && AGES.has(input.age) ? (input.age as "3" | "4" | "5") : null;
  const difficulty =
    typeof input.difficulty === "string" && DIFFICULTIES.has(input.difficulty)
      ? (input.difficulty as "easy" | "medium" | "hard")
      : null;
  const area =
    typeof input.area === "string" && AREAS.has(input.area)
      ? (input.area as GenerateExercisesInput["area"])
      : "mixed";
  const rawCount = typeof input.count === "number" ? input.count : Number(input.count);
  const count = Number.isFinite(rawCount) ? Math.min(10, Math.max(3, Math.round(rawCount))) : 6;

  if (!theme || !age || !difficulty) return null;
  return { theme, age, difficulty, count, area };
}

export async function generateExercisesAction(input: {
  theme?: unknown;
  age?: unknown;
  difficulty?: unknown;
  count?: unknown;
  area?: unknown;
}): Promise<GenerateExercisesState> {
  if (!isAiConfigured()) {
    return { ok: false, error: "not_configured" };
  }

  const sanitized = sanitizeInput(input);
  if (!sanitized) {
    return { ok: false, error: "invalid_input" };
  }

  try {
    const exercises = await generateExercises(sanitized);
    return { ok: true, exercises };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[generateExercisesAction]", message);

    if (message === "AI_TIMEOUT") return { ok: false, error: "timeout" };
    if (message.startsWith("AI_REQUEST_FAILED:")) {
      const parts = message.split(":");
      const status = Number(parts[1]);
      if (status === 401 || status === 403) return { ok: false, error: "unauthorized" };
      if (status === 429) return { ok: false, error: "rate_limit" };
      if (status === 400 || status === 404) return { ok: false, error: "bad_request" };
      return { ok: false, error: "request_failed" };
    }
    if (message === "AI_INVALID_JSON" || message === "AI_NO_VALID_EXERCISES" || message === "AI_EMPTY_RESPONSE") {
      return { ok: false, error: "invalid_response" };
    }
    if (message === "AI_NOT_CONFIGURED") {
      return { ok: false, error: "not_configured" };
    }
    return { ok: false, error: "unknown" };
  }
}
