"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCommentAction } from "./actions";
import { transcribeAudioAction } from "./transcribe-action";
import type { Student } from "./types";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const ACCENT_MAP: Record<string, string> = {
  a: "aáàäâ", e: "eéèëê", i: "iíìïî", o: "oóòöô", u: "uúùüû", n: "nñ",
  A: "AÁÀÄÂ", E: "EÉÈËÊ", I: "IÍÌÏÎ", O: "OÓÒÖÔ", U: "UÚÙÜÛ", N: "NÑ",
};

function accentInsensitivePattern(s: string) {
  return Array.from(s)
    .map((ch) => {
      const base = ch.normalize("NFD").replace(/\p{Diacritic}/gu, "");
      const group = ACCENT_MAP[base] ?? ACCENT_MAP[base.toLowerCase()];
      if (!group) return escapeRegExp(ch);
      const chars = group.split("").map(escapeRegExp).join("");
      return `[${chars}]`;
    })
    .join("");
}

function detectStudent(transcript: string, students: Student[]): Student | null {
  const t = ` ${normalize(transcript)} `;
  const matches = students.filter((s) => {
    const name = normalize(s.name);
    if (!name) return false;
    if (t.includes(` ${name} `)) return true;
    const tokens = name.split(" ").filter((tok) => tok.length >= 3);
    return tokens.some((tok) => t.includes(` ${tok} `));
  });
  return matches.length === 1 ? matches[0] : null;
}

function extractComment(transcript: string, student: Student): string {
  let t = ` ${transcript.trim()} `;

  // Remove student name (accent-insensitive)
  const nameParts = student.name.trim().split(/\s+/).filter(Boolean);
  if (nameParts.length > 0) {
    const namePattern = nameParts.map(accentInsensitivePattern).join("\\s+");
    t = t.replace(new RegExp(`\\b${namePattern}\\b`, "giu"), " ");
  }

  // Remove common voice-command scaffolding
  t = t.replace(/^\s*(añade|añadir|agrega|agregar|pon|ponle|ponme|asigna|asignar|guarda|guardar|crea|crear|escribe|escribir|registra|registrar|anota|anotar|mete|meter)\s+/iu, " ");
  t = t.replace(/\b(este|un|el|la)\s+(comentario|nota|observaci[oó]n)\b/giu, " ");
  t = t.replace(/^\s*(comentario|nota|observaci[oó]n)\s+/iu, " ");
  t = t.replace(/^\s*(para|a|al|de)\s+/iu, " ");
  t = t.replace(/^\s*(para|a|al|de)\s+/iu, " ");
  t = t.replace(/\s+(para|a|al|de)\s*$/iu, " ");

  t = t.replace(/\s+/g, " ").trim();
  t = t.replace(/^[,.:;¿?¡!\-\s]+|[,.:;¿?¡!\-\s]+$/g, "").trim();

  if (t.length >= 2) return t;
  // Fallback: remove only the name from original
  let fallback = ` ${transcript.trim()} `;
  if (nameParts.length > 0) {
    const namePattern = nameParts.map(accentInsensitivePattern).join("\\s+");
    fallback = fallback.replace(new RegExp(`\\b${namePattern}\\b`, "giu"), " ");
  }
  fallback = fallback.replace(/\s+/g, " ").trim();
  return fallback || transcript.trim();
}

function canRecordAudio() {
  return typeof window !== "undefined" && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== "undefined";
}

function pickMimeType() {
  if (typeof MediaRecorder === "undefined") return "";
  const candidates = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
  for (const c of candidates) {
    if (MediaRecorder.isTypeSupported(c)) return c;
  }
  return "";
}

export function QuickVoiceComment({ students }: { students: Student[] }) {
  const router = useRouter();
  const [supported, setSupported] = useState(false);
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [pending, setPending] = useState<{ text: string; student: Student | null } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only capability detection
    setSupported(canRecordAudio());
    return () => {
      mediaRecorderRef.current?.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  async function startRecording() {
    setError(null);
    setPending(null);
    setTranscript("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = pickMimeType();
      const rec = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        mediaRecorderRef.current = null;
        setRecording(false);
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" });
        chunksRef.current = [];
        if (blob.size < 1024) {
          setError("No se detectó audio. Inténtalo de nuevo.");
          return;
        }
        await transcribeBlob(blob);
      };
      mediaRecorderRef.current = rec;
      rec.start();
      setRecording(true);
    } catch {
      setError("No se pudo acceder al micrófono. Comprueba los permisos del navegador.");
      setRecording(false);
    }
  }

  async function transcribeBlob(blob: Blob) {
    setTranscribing(true);
    setError(null);
    try {
      const ext = blob.type.includes("mp4") ? "mp4" : blob.type.includes("ogg") ? "ogg" : "webm";
      const file = new File([blob], `comentario.${ext}`, { type: blob.type || "audio/webm" });
      const fd = new FormData();
      fd.append("audio", file);
      const result = await transcribeAudioAction(fd);
      if ("error" in result) {
        if (result.error === "AI_NOT_CONFIGURED") {
          setError("Transcripción no configurada (falta GROQ_API_KEY en el servidor).");
        } else if (result.error === "EMPTY_TRANSCRIPT") {
          setError("No se entendió el audio. Inténtalo de nuevo.");
        } else {
          setError("No se pudo transcribir el audio. Inténtalo de nuevo.");
        }
        return;
      }
      const text = result.text.trim();
      setTranscript(text);
      if (!text) return;
      const student = detectStudent(text, students);
      if (student) {
        save(student.id, extractComment(text, student));
      } else {
        setPending({ text, student: null });
      }
    } finally {
      setTranscribing(false);
    }
  }

  function stopRecording() {
    const rec = mediaRecorderRef.current;
    if (rec && rec.state !== "inactive") rec.stop();
  }

  function toggle() {
    if (transcribing || isPending) return;
    if (recording) stopRecording();
    else void startRecording();
  }

  function save(studentId: string, text: string) {
    const date = toDateKey(new Date());
    startTransition(async () => {
      try {
        await createCommentAction({ studentId, date, text });
        setPending(null);
        setError(null);
        setTranscript("");
        router.refresh();
      } catch {
        setError("No se pudo guardar el comentario.");
      }
    });
  }

  if (!supported) return null;

  const busy = transcribing || isPending;

  return (
    <div className="space-y-3">
      <div className="flex flex-col items-center gap-3 text-center">
        <button
          type="button"
          onClick={toggle}
          disabled={busy || students.length === 0}
          aria-label={recording ? "Detener grabación" : "Añadir comentario por voz"}
          aria-pressed={recording}
          title={recording ? "Detener grabación" : "Añadir comentario por voz"}
          className={[
            "inline-flex h-20 w-20 items-center justify-center rounded-full border transition-colors sm:h-24 sm:w-24",
            recording
              ? "border-red-400 bg-red-50 text-red-600 hover:bg-red-100"
              : "border-accent/30 bg-accent-soft text-accent hover:bg-accent/15",
            busy || students.length === 0 ? "opacity-50 cursor-not-allowed" : "",
          ].join(" ")}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden="true">
            <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
            <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z" />
          </svg>
        </button>
        <p className="max-w-xl text-sm text-muted">
          {recording
            ? "Grabando... di el comentario y el nombre del alumno. Pulsa para terminar."
            : transcribing
              ? "Transcribiendo audio con Groq..."
              : "Pulsa el micrófono para dictar un comentario y asignarlo a un alumno hoy."}
        </p>
      </div>

      {transcript && !pending ? (
        <p className="rounded-xl border border-border/60 bg-surface-sunken/30 px-3 py-2 text-sm text-muted">
          <span className="font-medium text-foreground">Transcripción: </span>{transcript}
        </p>
      ) : null}

      {error ? <p className="text-sm text-danger">{error}</p> : null}
      {isPending ? <p className="text-sm text-muted">Guardando comentario...</p> : null}

      {pending ? (
        <div className="rounded-xl border border-accent/20 bg-accent-soft/30 p-4 space-y-3">
          <p className="text-sm font-medium text-foreground">¿A qué alumno va asignado este comentario?</p>
          <p className="text-sm text-muted whitespace-pre-wrap">“{pending.text}”</p>
          <div className="flex flex-wrap gap-2">
            {students.map((s) => (
              <button
                key={s.id}
                type="button"
                disabled={isPending}
                onClick={() => save(s.id, extractComment(pending.text, s))}
                className="rounded-lg border border-border/70 bg-surface px-3 py-1.5 text-sm font-medium hover:bg-surface-sunken disabled:opacity-50"
              >
                {s.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPending(null)}
              className="rounded-lg border border-border/70 px-3 py-1.5 text-sm text-muted hover:bg-surface-sunken"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
