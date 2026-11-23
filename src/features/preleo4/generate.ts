import { generateJsonCompletion } from "@/lib/ai/client";
import { getPreleoActivity } from "./catalog";
import { visualCatalog, isVisualId } from "./image-catalog";
import type { PreleoExercise, VisualId } from "./types";

export type GeneratePreleoInput = {
  activityId: string;
  count: number;
  theme?: string;
};

const MAX_GENERATED = 6;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function asCleanString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > 0 && clean.length <= max ? clean : null;
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

function validateRaw(raw: unknown, index: number): PreleoExercise | null {
  if (!isRecord(raw)) return null;

  const title = asCleanString(raw.title, 100);
  if (!title || title.length < 5) return null;

  if (!Array.isArray(raw.options) || raw.options.length !== 3) return null;
  const options: VisualId[] = [];
  for (const candidate of raw.options) {
    if (!isVisualId(candidate) || options.includes(candidate)) return null;
    options.push(candidate);
  }

  if (!isVisualId(raw.correct) || !options.includes(raw.correct)) return null;
  const answerWord = asCleanString(raw.answerWord, 40);
  if (!answerWord) return null;
  const expectedWord = normalizeText(visualCatalog[raw.correct].word);
  if (normalizeText(answerWord) !== expectedWord) return null;
  if (!normalizeText(title).includes(expectedWord)) return null;

  const teacherNote = asCleanString(raw.teacherNote, 180) ?? undefined;

  return {
    id: `ai-${Date.now()}-${index}`,
    title,
    options: [options[0], options[1], options[2]],
    correct: raw.correct,
    ...(teacherNote ? { teacherNote } : {}),
    source: "ai",
  };
}

const catalogDescription = Object.values(visualCatalog)
  .map((visual) => `- ${visual.id}: "${visual.word}" (${visual.category})`)
  .join("\n");

export async function generatePreleoExercises(
  input: GeneratePreleoInput,
): Promise<PreleoExercise[]> {
  const activity = getPreleoActivity(input.activityId);
  if (!activity) throw new Error("AI_INVALID_INPUT");

  const count = Math.min(MAX_GENERATED, Math.max(3, Math.round(input.count || 4)));
  const theme = input.theme?.replace(/\s+/g, " ").trim().slice(0, 100) || "";

  const system = `Eres un maestro de Educación Infantil (4 años) que crea actividades PRELEO.
Devuelve SOLO un objeto JSON válido, sin markdown ni comentarios, con esta forma exacta:
{"exercises":[{"title":"Señala la copa","options":["copa","pato","casa"],"correct":"copa","answerWord":"copa","teacherNote":"Pide que nombre la imagen."}]}

Reglas obligatorias:
- Escribe todo en español sencillo, adecuado a 4 años.
- "options" debe tener exactamente 3 IDs distintos de la lista permitida. No inventes IDs, palabras ni imágenes.
- "correct" debe ser uno de esos 3 IDs.
- "answerWord" debe ser exactamente la palabra española del objeto "correct" según la lista permitida (sin tildes también vale).
- "title" es la única instrucción que ve el niño o la niña: debe ser muy corta (5-100 caracteres), empezar con un verbo como "Señala", "Elige" o "Busca" e incluir la palabra de "answerWord". Sin puntuación excesiva ni emojis.
- "teacherNote" es opcional (máximo 180 caracteres), una pauta breve para el adulto.
- Varía los objetos entre ejercicios. No repitas exactamente la misma combinación de opciones.

Lista permitida de IDs (solo se pueden usar estos):
${catalogDescription}`;

  const prompt = `Actividad: "${activity.title}" (${activity.subtitle}).
Objetivo: ${activity.objective}.
${theme ? `Tematización opcional: ${theme}.` : ""}
Genera ${count} ejercicios nuevos siguiendo el objetivo de la actividad y las reglas anteriores.`;

  const raw = await generateJsonCompletion({ system, prompt, temperature: 0.8 });
  const parsed = extractJson(raw);
  const list = isRecord(parsed) && Array.isArray(parsed.exercises) ? parsed.exercises : [];
  const seen = new Set<string>();
  const exercises: PreleoExercise[] = [];

  list.forEach((item, index) => {
    const exercise = validateRaw(item, index);
    if (!exercise) return;
    const signature = `${[...exercise.options].sort().join("|")}:${exercise.correct}:${normalizeText(exercise.title)}`;
    if (seen.has(signature)) return;
    seen.add(signature);
    exercises.push(exercise);
  });

  if (exercises.length < 3) throw new Error("AI_NO_VALID_EXERCISES");
  return exercises;
}
