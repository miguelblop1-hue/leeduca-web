const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const REQUEST_TIMEOUT_MS = 45_000;

export type AiConfig = {
  endpoint: string;
  apiKey: string;
  model: string;
};

export function getAiConfig(): AiConfig | null {
  const groqKey = process.env.GROQ_API_KEY?.trim();
  if (groqKey) {
    return {
      endpoint: GROQ_ENDPOINT,
      apiKey: groqKey,
      model:
        process.env.GROQ_MODEL?.trim() ||
        process.env.EXERCISES_AI_MODEL?.trim() ||
        "openai/gpt-oss-120b",
    };
  }
  const openaiKey = process.env.OPENAI_API_KEY?.trim();
  if (openaiKey) {
    return {
      endpoint: OPENAI_ENDPOINT,
      apiKey: openaiKey,
      model:
        process.env.OPENAI_MODEL?.trim() ||
        process.env.EXERCISES_AI_MODEL?.trim() ||
        "gpt-4o-mini",
    };
  }
  return null;
}

export function isAiConfigured(): boolean {
  return getAiConfig() !== null;
}

export async function generateJsonCompletion(params: {
  system: string;
  prompt: string;
  temperature?: number;
}): Promise<string> {
  const config = getAiConfig();
  if (!config) {
    throw new Error("AI_NOT_CONFIGURED");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(config.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.model,
        temperature: params.temperature ?? 0.7,
        messages: [
          { role: "system", content: params.system },
          { role: "user", content: params.prompt },
        ],
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`AI_REQUEST_FAILED:${response.status}:${text.slice(0, 200)}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };
    const content = data.choices?.[0]?.message?.content;
    if (!content || typeof content !== "string") {
      throw new Error("AI_EMPTY_RESPONSE");
    }
    return content;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("AI_TIMEOUT");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
