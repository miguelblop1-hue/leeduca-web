import { generateJsonCompletion } from "@/lib/ai/client";
import type { Exercise, ExerciseArea, ExerciseType, LocalizedExercise } from "./types";

export type GenerateExercisesInput = {
  theme: string;
  age: "3" | "4" | "5";
  difficulty: "easy" | "medium" | "hard";
  count: number;
  area: ExerciseArea | "mixed";
};

const AREAS: ExerciseArea[] = [
  "phonological",
  "vocabulary",
  "comprehension",
  "memory",
  "morphosyntax",
  "alphabetic",
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function normalizeArea(value: unknown, fallback: ExerciseArea): ExerciseArea {
  return typeof value === "string" && (AREAS as string[]).includes(value)
    ? (value as ExerciseArea)
    : fallback;
}

function normalizeType(value: unknown): ExerciseType {
  return value === "memory" ? "memory" : "choice";
}

function normalizeOptions(value: unknown): LocalizedExercise["options"] | undefined {
  if (!Array.isArray(value)) return undefined;
  const options = value
    .map((opt) => {
      if (typeof opt === "string") {
        const s = opt.trim();
        return s ? s : null;
      }
      if (isRecord(opt)) {
        const label = asString(opt.label) ?? asString(opt.value);
        const v = asString(opt.value) ?? label;
        if (!label || !v) return null;
        const visual = asString(opt.visual);
        const image = asString(opt.image);
        // Only allow emoji-like visuals; ignore remote image URLs for safety/simplicity
        const safeImage =
          image && image.startsWith("/") ? image : undefined;
        return {
          value: v,
          label,
          ...(visual ? { visual } : {}),
          ...(safeImage ? { image: safeImage } : {}),
        };
      }
      return null;
    })
    .filter((o): o is NonNullable<typeof o> => o !== null);
  return options.length >= 2 ? options : undefined;
}

function normalizeSequence(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const seq = value.map((v) => asString(v)).filter((v): v is string => !!v);
  return seq.length >= 2 ? seq : undefined;
}

function normalizeCorrect(
  value: unknown,
  options: LocalizedExercise["options"],
): string | string[] | undefined {
  const optionValues = (options ?? []).map((o) =>
    typeof o === "string" ? o : o.value,
  );
  if (Array.isArray(value)) {
    const arr = value.map((v) => asString(v)).filter((v): v is string => !!v);
    const valid = arr.filter((v) => optionValues.length === 0 || optionValues.includes(v));
    return valid.length ? valid : arr.length ? arr : undefined;
  }
  const s = asString(value);
  if (!s) return undefined;
  return s;
}

function normalizeLocalized(
  value: unknown,
  fallbackPrompt: string,
): LocalizedExercise | null {
  if (!isRecord(value)) return null;
  const prompt = asString(value.prompt) ?? fallbackPrompt;
  const options = normalizeOptions(value.options);
  const sequence = normalizeSequence(value.sequence);
  const correct = normalizeCorrect(value.correct, options);
  if (!correct) return null;
  if ((!options || options.length < 2) && !sequence) return null;

  const stimulusRaw = isRecord(value.stimulus) ? value.stimulus : null;
  const stimulusLabel = stimulusRaw ? asString(stimulusRaw.label) : undefined;
  const stimulus = stimulusLabel
    ? {
        label: stimulusLabel,
        ...(asString(stimulusRaw?.visual) ? { visual: asString(stimulusRaw?.visual) } : {}),
        ...(asString(stimulusRaw?.image)?.startsWith("/")
          ? { image: asString(stimulusRaw?.image) }
          : {}),
      }
    : undefined;

  return {
    prompt,
    ...(asString(value.teacherNote) ? { teacherNote: asString(value.teacherNote) } : {}),
    ...(stimulus ? { stimulus } : {}),
    ...(options ? { options } : {}),
    ...(sequence ? { sequence } : {}),
    correct,
    ...(asString(value.feedback) ? { feedback: asString(value.feedback) } : {}),
  };
}

function normalizeExercise(
  raw: unknown,
  index: number,
  fallbackArea: ExerciseArea,
): Exercise | null {
  if (!isRecord(raw)) return null;
  const id = asString(raw.id) ?? `gen-${Date.now()}-${index}`;
  const area = normalizeArea(raw.area, fallbackArea);
  const type = normalizeType(raw.type);
  const es = normalizeLocalized(raw.es, "Ejercicio");
  const en = normalizeLocalized(raw.en, "Exercise");
  if (!es || !en) return null;
  // For memory type ensure sequence exists
  if (type === "memory" && (!es.sequence || !en.sequence)) return null;
  return { id, area, type, es, en };
}

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (!match) throw new Error("AI_INVALID_JSON");
    return JSON.parse(match[0]);
  }
}

export async function generateExercises(input: GenerateExercisesInput): Promise<Exercise[]> {
  const count = Math.min(10, Math.max(3, Math.round(input.count || 6)));
  const age = input.age;
  const difficulty = input.difficulty;
  const theme = input.theme.trim().slice(0, 120);
  const area = input.area;

  const system = `You generate educational practice exercises for children (preschool, ages 3-5) in Spanish and English.
Return ONLY a single valid JSON object (no markdown, no code fences, no commentary) with this exact shape:
{
  "exercises": [
    {
      "id": "ex-1",
      "area": "vocabulary",
      "type": "choice",
      "es": { "prompt": "...", "teacherNote": "...", "stimulus": {"label":"...","visual":"🐶"}, "options": [{"value":"perro","label":"perro","visual":"🐶"},{"value":"gato","label":"gato","visual":"🐱"}], "correct": "perro", "feedback": "..." },
      "en": { "prompt": "...", "teacherNote": "...", "stimulus": {"label":"...","visual":"🐶"}, "options": [{"value":"dog","label":"dog","visual":"🐶"},{"value":"cat","label":"cat","visual":"🐱"}], "correct": "dog", "feedback": "..." }
    }
  ]
}
Rules:
- "es" and "en" must both be present and equivalent in meaning (each with prompt, options/sequence as needed, and correct).
- For type "choice": provide 2-4 options and "correct" must exactly match one option's "value". Prefer object options {"value","label","visual"}.
- For type "memory": provide "sequence" (2-4 emojis/items to remember) AND "options" (2-4 possible order strings to choose from) and "correct" matching one option.
- Use "stimulus" when there is a main word/object being compared/counted/sounded out; include a representative emoji in "visual" and the word in "label".
- Use emojis in "visual" for options/stimulus whenever representable (pick the closest fitting emoji if exact one is not obvious). Do NOT invent image URLs.
- Keep language simple, age-appropriate, playful, pedagogically sound for the requested age, safe and inclusive.
- Be creative and flexible: you can generate exercises for ANY reasonable, child-friendly theme/topic the user asks for (everyday life, animals, nature, seasons, food, transport, professions, places, body, emotions, routines, sports, fantasy, space, stories, celebrations, etc.). Adapt the content clearly to that theme, even if it is unusual, as long as it is safe and age-appropriate. Do not fall back to a generic theme when a specific one is provided.
- Vary the situations, items, and question forms across exercises in the set so they feel diverse while staying on theme.`;

  const areaText =
    area === "mixed"
      ? "Mix areas (phonological awareness, vocabulary, oral comprehension, verbal memory, morphosyntax, alphabetic principle) appropriately and show variety."
      : `Focus mainly on area: ${area}.`;

  const difficultyText =
    difficulty === "easy"
      ? "easy (very simple, concrete, few elements)"
      : difficulty === "medium"
        ? "medium (moderate challenge for the age)"
        : "hard (more challenging but still age-appropriate)";

  const prompt = `Create ${count} practice exercises for children aged ${age} years.
Theme/topic: "${theme || "everyday life"}" (interpret this theme creatively and make every exercise clearly related to it; if the theme is abstract, use concrete child-friendly examples).
Difficulty: ${difficultyText}.
${areaText}
Use a mix of "choice" and "memory" exercise types when appropriate.
Make them interactive, visual (use emojis), varied, and clearly tied to the theme. Ensure each exercise has one clear correct answer and natural, correct Spanish and English.`;

  const rawText = await generateJsonCompletion({ system, prompt, temperature: 0.85 });
  const parsed = extractJson(rawText);
  const list = Array.isArray(parsed)
    ? parsed
    : isRecord(parsed) && Array.isArray(parsed.exercises)
      ? parsed.exercises
      : [];

  const fallbackArea: ExerciseArea = area === "mixed" ? "vocabulary" : area;
  const exercises = list
    .map((item, i) => normalizeExercise(item, i, fallbackArea))
    .filter((e): e is Exercise => e !== null)
    .slice(0, count);

  if (exercises.length === 0) {
    throw new Error("AI_NO_VALID_EXERCISES");
  }
  return exercises;
}
