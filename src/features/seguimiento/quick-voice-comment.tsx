"use client";

import { useEffect, useRef, useState, useSyncExternalStore, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCommentAction } from "./actions";
import type { Student } from "./types";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>>; resultIndex: number }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
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

export function QuickVoiceComment({ students }: { students: Student[] }) {
  const supported = useSyncExternalStore(
    () => () => {},
    () => getSpeechRecognition() !== null,
    () => false,
  );
  const router = useRouter();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [pending, setPending] = useState<{ text: string; student: Student | null } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const transcriptRef = useRef("");
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const SILENCE_MS = 5000;

  function clearSilenceTimer() {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }

  function armSilenceTimer() {
    clearSilenceTimer();
    silenceTimerRef.current = setTimeout(() => {
      if (recRef.current) stopAndProcess();
    }, SILENCE_MS);
  }

  useEffect(() => {
    return () => {
      clearSilenceTimer();
      recRef.current?.stop();
    };
  }, []);

  function stopAndProcess() {
    clearSilenceTimer();
    recRef.current?.stop();
    recRef.current = null;
    setListening(false);
    const text = transcriptRef.current.trim();
    transcriptRef.current = "";
    setTranscript("");
    if (!text) return;
    const student = detectStudent(text, students);
    if (student) {
      save(student.id, extractComment(text, student));
    } else {
      setPending({ text, student: null });
    }
  }

  function start() {
    const Ctor = getSpeechRecognition();
    if (!Ctor) return;
    setError(null);
    setPending(null);
    transcriptRef.current = "";
    setTranscript("");
    const rec = new Ctor();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "es-ES";
    rec.onresult = (event) => {
      let full = "";
      for (let i = 0; i < event.results.length; i++) {
        const t = event.results[i]?.[0]?.transcript;
        if (t) full += t;
      }
      transcriptRef.current = full;
      setTranscript(full);
      armSilenceTimer();
    };
    rec.onerror = (e) => {
      clearSilenceTimer();
      setListening(false);
      recRef.current = null;
      if (e.error !== "no-speech" && e.error !== "aborted") {
        setError("No se pudo usar el micrófono. Comprueba los permisos del navegador.");
      }
    };
    rec.onend = () => {
      // if ended naturally while we think we're listening, process
      if (recRef.current === rec) {
        clearSilenceTimer();
        recRef.current = null;
        setListening(false);
        const text = transcriptRef.current.trim();
        transcriptRef.current = "";
        setTranscript("");
        if (text) {
          const student = detectStudent(text, students);
          if (student) save(student.id, extractComment(text, student));
          else setPending({ text, student: null });
        }
      }
    };
    recRef.current = rec;
    try {
      rec.start();
      setListening(true);
      armSilenceTimer();
    } catch {
      setError("No se pudo iniciar el dictado por voz.");
      recRef.current = null;
    }
  }

  function toggle() {
    if (listening) stopAndProcess();
    else start();
  }

  function save(studentId: string, text: string) {
    const date = toDateKey(new Date());
    startTransition(async () => {
      try {
        await createCommentAction({ studentId, date, text });
        setPending(null);
        setError(null);
        router.refresh();
      } catch {
        setError("No se pudo guardar el comentario.");
      }
    });
  }

  if (!supported) return null;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          disabled={isPending || students.length === 0}
          aria-label={listening ? "Detener dictado" : "Añadir comentario por voz"}
          aria-pressed={listening}
          title={listening ? "Detener dictado" : "Añadir comentario por voz"}
          className={[
            "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
            listening
              ? "border-red-400 bg-red-50 text-red-600 hover:bg-red-100"
              : "border-accent/30 bg-accent-soft text-accent hover:bg-accent/15",
            isPending || students.length === 0 ? "opacity-50 cursor-not-allowed" : "",
          ].join(" ")}
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
            <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z" />
          </svg>
        </button>
        <p className="text-sm text-muted">
          {listening
            ? "Escuchando... di el comentario y el nombre del alumno. Pulsa para terminar o se cerrará tras unos segundos sin voz."
            : "Pulsa el micrófono para dictar un comentario y asignarlo a un alumno hoy."}
        </p>
      </div>

      {listening && transcript ? (
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
