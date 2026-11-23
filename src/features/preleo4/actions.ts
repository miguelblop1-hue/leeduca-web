"use server";

import { requireUser } from "@/lib/auth/guard";
import { isAiConfigured } from "@/lib/ai/client";
import { generatePreleoExercises } from "./generate";
import { getPreleoActivity } from "./catalog";
import type { PreleoExercise } from "./types";

export type GeneratePreleoState =
  | { ok: true; exercises: PreleoExercise[] }
  | { ok: false; error: string };

export async function generatePreleoAction(input: {
  activityId?: unknown;
  count?: unknown;
  theme?: unknown;
}): Promise<GeneratePreleoState> {
  try {
    requireUser();
  } catch {
    return { ok: false, error: "unauthorized" };
  }

  if (!isAiConfigured()) {
    return { ok: false, error: "not_configured" };
  }

  const activityId = typeof input.activityId === "string" ? input.activityId : "";
  if (!getPreleoActivity(activityId)) {
    return { ok: false, error: "invalid_input" };
  }
  const rawCount = typeof input.count === "number" ? input.count : Number(input.count);
  const count = Number.isFinite(rawCount) ? Math.min(6, Math.max(3, Math.round(rawCount))) : 4;
  const theme = typeof input.theme === "string" ? input.theme.slice(0, 100) : "";

  try {
    const exercises = await generatePreleoExercises({ activityId, count, theme });
    return { ok: true, exercises };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[generatePreleoAction]", message);

    if (message === "AI_TIMEOUT") return { ok: false, error: "timeout" };
    if (message === "AI_NOT_CONFIGURED") return { ok: false, error: "not_configured" };
    if (message === "AI_NO_VALID_EXERCISES" || message === "AI_INVALID_JSON") {
      return { ok: false, error: "invalid_response" };
    }
    if (message.startsWith("AI_REQUEST_FAILED:")) {
      const status = Number(message.split(":")[1]);
      if (status === 401 || status === 403) return { ok: false, error: "unauthorized" };
      if (status === 429) return { ok: false, error: "rate_limit" };
      if (status === 400 || status === 404) return { ok: false, error: "bad_request" };
      return { ok: false, error: "request_failed" };
    }
    return { ok: false, error: "unknown" };
  }
}
