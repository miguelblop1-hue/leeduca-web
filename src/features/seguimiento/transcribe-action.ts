"use server";

const GROQ_TRANSCRIBE_ENDPOINT = "https://api.groq.com/openai/v1/audio/transcriptions";
const DEFAULT_MODEL = "whisper-large-v3-turbo";
const REQUEST_TIMEOUT_MS = 45_000;

export async function transcribeAudioAction(formData: FormData): Promise<{ text: string } | { error: string }> {
  const apiKey = process.env.GROQ_API_KEY?.trim();
  if (!apiKey) {
    return { error: "AI_NOT_CONFIGURED" };
  }

  const audio = formData.get("audio");
  if (!(audio instanceof File) || audio.size === 0) {
    return { error: "NO_AUDIO" };
  }

  const model = process.env.GROQ_WHISPER_MODEL?.trim() || DEFAULT_MODEL;
  const body = new FormData();
  body.append("file", audio, audio.name || "audio.webm");
  body.append("model", model);
  body.append("language", "es");
  body.append("response_format", "json");
  body.append("temperature", "0");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(GROQ_TRANSCRIBE_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body,
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("Groq transcription failed", response.status, text.slice(0, 300));
      return { error: "TRANSCRIBE_FAILED" };
    }

    const data = (await response.json()) as { text?: string };
    const text = typeof data.text === "string" ? data.text.trim() : "";
    if (!text) return { error: "EMPTY_TRANSCRIPT" };
    return { text };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return { error: "TRANSCRIBE_TIMEOUT" };
    }
    console.error("Groq transcription error", error);
    return { error: "TRANSCRIBE_FAILED" };
  } finally {
    clearTimeout(timeout);
  }
}
