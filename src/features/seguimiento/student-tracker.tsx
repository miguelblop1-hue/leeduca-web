"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore, useTransition, type PointerEvent } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { SeguimientoData, Student } from "./types";
import {
  createCommentAction,
  createStudentAction,
  deleteCommentAction,
  deleteStudentAction,
  renameStudentAction,
  reorderStudentsAction,
} from "./actions";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function toDateKey(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function parseDateKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function startOfWeekMonday(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() + days);
  return d;
}

function courseStartFor(date: Date): Date {
  const year = date.getMonth() >= 8 ? date.getFullYear() : date.getFullYear() - 1;
  return new Date(year, 8, 1); // Sept 1
}

function formatLongDate(key: string): string {
  const d = parseDateKey(key);
  return d.toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
}

function formatDayMonth(key: string): string {
  const d = parseDateKey(key);
  return d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}

const WEEKDAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie"];

type ModalProps = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
};

function Modal({ title, onClose, children, wide }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={cn(
          "max-h-[calc(100dvh-2rem)] w-full overflow-auto rounded-2xl border border-border/70 bg-surface p-5 shadow-[var(--shadow-card)] sm:p-6",
          wide ? "max-w-4xl" : "max-w-xl",
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border/70 text-muted transition-colors hover:bg-surface-sunken hover:text-foreground"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
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

function VoiceDictationButton({
  onTranscript,
  className,
}: {
  onTranscript: (text: string) => void;
  className?: string;
}) {
  const supported = useSyncExternalStore(
    () => () => {},
    () => getSpeechRecognition() !== null,
    () => false,
  );
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  function toggle() {
    const Ctor = getSpeechRecognition();
    if (!Ctor) return;
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = new Ctor();
    rec.continuous = true;
    rec.interimResults = false;
    rec.lang = "es-ES";
    rec.onresult = (event) => {
      let chunk = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i]?.[0]?.transcript;
        if (transcript) chunk += transcript;
      }
      const trimmed = chunk.trim();
      if (trimmed) onTranscript(trimmed);
    };
    rec.onerror = () => {
      setListening(false);
      recognitionRef.current = null;
    };
    rec.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };
    recognitionRef.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
      recognitionRef.current = null;
    }
  }

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      title={listening ? "Detener dictado por voz" : "Dictar comentario por voz"}
      aria-label={listening ? "Detener dictado por voz" : "Dictar comentario por voz"}
      aria-pressed={listening}
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border transition-colors",
        listening
          ? "border-red-400 bg-red-50 text-red-600 hover:bg-red-100"
          : "border-border/70 text-muted hover:bg-surface-sunken hover:text-foreground",
        className,
      )}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M7 4a3 3 0 0 1 6 0v6a3 3 0 1 1-6 0V4Z" />
        <path d="M5.5 9.643a.75.75 0 0 0-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-1.5v-1.546A6.001 6.001 0 0 0 16 10v-.357a.75.75 0 0 0-1.5 0V10a4.5 4.5 0 0 1-9 0v-.357Z" />
      </svg>
      {listening ? <span className="sr-only">Escuchando</span> : null}
    </button>
  );
}

type AddCommentModalProps = {
  student: Student;
  initialDate: string;
  onClose: () => void;
  onSave: (text: string, date: string) => void;
};

function AddCommentModal({ student, initialDate, onClose, onSave }: AddCommentModalProps) {
  const [text, setText] = useState("");
  return (
    <Modal title={`Añadir comentario · ${student.name}`} onClose={onClose}>
      <div className="space-y-4">
        <p className="text-sm text-muted">
          Fecha del comentario: <span className="font-medium text-foreground">{formatLongDate(initialDate)}</span>
        </p>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="seguimiento-comment-text" className="text-sm font-medium">Comentario</label>
            <VoiceDictationButton
              onTranscript={(t) =>
                setText((prev) => {
                  const sep = prev && !/\s$/.test(prev) ? " " : "";
                  return (prev + sep + t).slice(0, 1000);
                })
              }
            />
          </div>
          <textarea
            id="seguimiento-comment-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            maxLength={1000}
            placeholder="Escribe o dicta una observación sobre el alumno..."
            className="w-full rounded-xl border border-border bg-surface-sunken/30 px-3 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            autoFocus
          />
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border/70 px-4 py-2 text-sm font-medium hover:bg-surface-sunken"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              const t = text.trim();
              if (!t) return;
              onSave(t, initialDate);
            }}
            disabled={!text.trim()}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              text.trim()
                ? "bg-accent text-on-accent hover:bg-accent-strong"
                : "cursor-not-allowed bg-accent/40 text-on-accent/70",
            )}
          >
            Guardar comentario
          </button>
        </div>
      </div>
    </Modal>
  );
}

type CalendarModalProps = {
  student: Student;
  data: SeguimientoData;
  onClose: () => void;
  onAddComment: (date: string, text: string) => void;
  onDeleteComment: (commentId: string) => void;
};

function CalendarModal({ student, data, onClose, onAddComment, onDeleteComment }: CalendarModalProps) {
  const today = useMemo(() => new Date(), []);
  const todayKey = toDateKey(today);
  const courseStart = useMemo(() => courseStartFor(today), [today]);
  const minWeekStart = useMemo(() => startOfWeekMonday(courseStart), [courseStart]);
  const currentWeekStart = useMemo(() => startOfWeekMonday(today), [today]);

  const [weekStart, setWeekStart] = useState<Date>(() => startOfWeekMonday(new Date()));
  const [selectedDate, setSelectedDate] = useState<string>(todayKey);
  const [draft, setDraft] = useState("");

  const weekDays = useMemo(
    () => Array.from({ length: 5 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  );

  const canGoBack = weekStart.getTime() > minWeekStart.getTime();
  const canGoForward = weekStart.getTime() < currentWeekStart.getTime();

  const selectedComments = useMemo(
    () => commentsForStudentOnDateLocal(data, student.id, selectedDate),
    [data, student.id, selectedDate],
  );

  const commentDates = useMemo(() => {
    const set = new Set<string>();
    for (const c of data.comments) {
      if (c.studentId === student.id) set.add(c.date);
    }
    return set;
  }, [data.comments, student.id]);

  function goBack() {
    if (!canGoBack) return;
    const prev = addDays(weekStart, -7);
    setWeekStart(prev.getTime() < minWeekStart.getTime() ? minWeekStart : prev);
  }

  function goForward() {
    if (!canGoForward) return;
    const next = addDays(weekStart, 7);
    setWeekStart(next.getTime() > currentWeekStart.getTime() ? currentWeekStart : next);
  }

  function saveForSelectedDay() {
    const t = draft.trim();
    if (!t) return;
    onAddComment(selectedDate, t);
    setDraft("");
  }

  const weekEnd = addDays(weekStart, 4);
  const rangeLabel = `${weekStart.toLocaleDateString("es-ES", { day: "numeric", month: "short" })} - ${weekEnd.toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}`;

  return (
    <Modal title={`Agenda · ${student.name}`} onClose={onClose} wide>
      <div className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted">Semana (lunes a viernes) · curso desde 1 de septiembre</p>
            <p className="font-medium">{rangeLabel}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goBack}
              disabled={!canGoBack}
              className={cn(
                "inline-flex h-9 items-center rounded-lg border px-3 text-sm font-medium transition-colors",
                canGoBack
                  ? "border-border/70 hover:bg-surface-sunken"
                  : "cursor-not-allowed border-border/40 text-muted/50",
              )}
            >
              ← Anterior
            </button>
            <button
              type="button"
              onClick={goForward}
              disabled={!canGoForward}
              className={cn(
                "inline-flex h-9 items-center rounded-lg border px-3 text-sm font-medium transition-colors",
                canGoForward
                  ? "border-border/70 hover:bg-surface-sunken"
                  : "cursor-not-allowed border-border/40 text-muted/50",
              )}
            >
              Siguiente →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {weekDays.map((day, i) => {
            const key = toDateKey(day);
            const isToday = key === todayKey;
            const isSelected = key === selectedDate;
            const hasComments = commentDates.has(key);
            const isFuture = key > todayKey;
            const isBeforeCourse = key < toDateKey(courseStart);
            const isDisabled = isFuture || isBeforeCourse;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (isDisabled) return;
                  setSelectedDate(key);
                }}
                disabled={isDisabled}
                className={cn(
                  "flex min-h-[88px] flex-col items-center justify-center rounded-xl border p-2 text-center transition-colors sm:min-h-[100px]",
                  isSelected && "border-accent bg-accent/10 ring-2 ring-accent/20",
                  !isSelected && !isDisabled && "border-border/70 bg-surface hover:bg-surface-sunken/50",
                  isToday && !isSelected && "border-accent/40",
                  isDisabled && "cursor-not-allowed border-border/40 bg-surface-sunken/20 text-muted/40",
                )}
              >
                <span className="text-[11px] font-medium uppercase tracking-wide text-muted">
                  {WEEKDAY_LABELS[i]}
                </span>
                <span
                  className={cn(
                    "mt-1 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold sm:h-10 sm:w-10 sm:text-base",
                    isToday && "bg-accent text-on-accent",
                    !isToday && hasComments && "bg-accent/15 text-accent",
                    !isToday && !hasComments && "text-foreground",
                  )}
                >
                  {day.getDate()}
                </span>
                <span className="mt-1 text-[11px] text-muted">
                  {hasComments ? "Comentario(s)" : isDisabled ? "" : "—"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl border border-border/70 bg-surface-sunken/20 p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-muted">Día seleccionado</p>
              <p className="font-semibold">{formatLongDate(selectedDate)}</p>
            </div>
            {selectedDate === todayKey ? (
              <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent">Hoy</span>
            ) : null}
          </div>

          <div className="space-y-3">
            {selectedComments.length === 0 ? (
              <p className="text-sm text-muted">No hay comentarios en este día.</p>
            ) : (
              <ul className="space-y-2">
                {selectedComments.map((c) => (
                  <li key={c.id} className="rounded-lg border border-border/60 bg-surface px-3 py-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <p className="min-w-0 flex-1 text-sm whitespace-pre-wrap">{c.text}</p>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm("¿Eliminar este comentario? Esta acción no se puede deshacer.")) {
                            onDeleteComment(c.id);
                          }
                        }}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-danger/30 text-danger transition-colors hover:bg-danger/10"
                        aria-label="Eliminar comentario"
                        title="Eliminar comentario"
                      >
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                          <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022 1.005 11.36A2.75 2.75 0 0 0 7.759 19h4.482a2.75 2.75 0 0 0 2.74-2.508l1.005-11.36.149.022a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      Añadido el {formatDayMonth(c.date)} · {formatTime(c.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-border/60 pt-3">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-2">
                  <label htmlFor="seguimiento-day-comment-text" className="text-sm font-medium">Añadir comentario en este día</label>
                  <VoiceDictationButton
                    onTranscript={(t) =>
                      setDraft((prev) => {
                        const sep = prev && !/\s$/.test(prev) ? " " : "";
                        return (prev + sep + t).slice(0, 1000);
                      })
                    }
                  />
                </div>
                <textarea
                  id="seguimiento-day-comment-text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                  maxLength={1000}
                  placeholder="Escribe o dicta un comentario para este día..."
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={saveForSelectedDay}
                  disabled={!draft.trim()}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                    draft.trim()
                      ? "bg-accent text-on-accent hover:bg-accent-strong"
                      : "cursor-not-allowed bg-accent/40 text-on-accent/70",
                  )}
                >
                  Guardar comentario
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function commentsForStudentOnDateLocal(
  data: SeguimientoData,
  studentId: string,
  date: string,
) {
  return data.comments
    .filter((c) => c.studentId === studentId && c.date === date)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function StudentTracker({ initialData }: { initialData: SeguimientoData }) {
  const [data, setData] = useState<SeguimientoData>(initialData);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync server-refreshed data
    setData(initialData);
  }, [initialData]);
  const [commentStudent, setCommentStudent] = useState<Student | null>(null);
  const [calendarStudent, setCalendarStudent] = useState<Student | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [, startTransition] = useTransition();

  const todayKey = toDateKey(new Date());

  function handleAddStudent() {
    const name = newName.trim();
    if (!name) return;
    setNewName("");
    startTransition(async () => {
      const next = await createStudentAction(name);
      setData(next);
    });
  }

  function handleSaveComment(studentId: string, date: string, text: string) {
    startTransition(async () => {
      const next = await createCommentAction({ studentId, date, text });
      setData(next);
    });
  }

  function handleDeleteComment(commentId: string) {
    startTransition(async () => {
      const next = await deleteCommentAction(commentId);
      setData(next);
    });
  }

  function handleDeleteStudent(studentId: string) {
    const student = data.students.find((s) => s.id === studentId);
    if (!student) return;
    const ok = window.confirm(
      `¿Eliminar a ${student.name} y todos sus comentarios? Esta acción no se puede deshacer.`,
    );
    if (!ok) return;
    if (commentStudent?.id === studentId) setCommentStudent(null);
    if (calendarStudent?.id === studentId) setCalendarStudent(null);
    if (editingId === studentId) {
      setEditingId(null);
      setEditingName("");
    }
    startTransition(async () => {
      const next = await deleteStudentAction(studentId);
      setData(next);
    });
  }

  function handleRenameStudent(studentId: string) {
    const name = editingName.trim();
    if (!name) return;
    setEditingId(null);
    setEditingName("");
    startTransition(async () => {
      const next = await renameStudentAction(studentId, name);
      setData(next);
    });
  }

  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragIdRef = useRef<string | null>(null);
  const dragOverIdRef = useRef<string | null>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  function persistOrder(ordered: typeof data.students) {
    setData({ ...data, students: ordered });
    startTransition(async () => {
      const next = await reorderStudentsAction(ordered.map((s) => s.id));
      setData(next);
    });
  }

  function handlePointerDown(e: PointerEvent, id: string) {
    if (e.button !== 0) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragIdRef.current = id;
    dragOverIdRef.current = null;
    setDragId(id);
    setDragOverId(null);
  }

  function handlePointerMove(e: PointerEvent) {
    const activeId = dragIdRef.current;
    if (!activeId) return;
    let over: string | null = null;
    for (const [id, el] of cardRefs.current.entries()) {
      if (id === activeId) continue;
      const rect = el.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        const mid = rect.top + rect.height / 2;
        over = id;
        // if moving past midpoint, still target this card; ordering logic handles direction
        void mid;
        break;
      }
    }
    if (over) {
      dragOverIdRef.current = over;
      setDragOverId(over);
    }
  }

  function handlePointerUp(e: PointerEvent) {
    const activeId = dragIdRef.current;
    const over = dragOverIdRef.current;
    if (activeId && over && activeId !== over) {
      const from = data.students.findIndex((s) => s.id === activeId);
      const to = data.students.findIndex((s) => s.id === over);
      if (from >= 0 && to >= 0) {
        const ordered = [...data.students];
        const [moved] = ordered.splice(from, 1);
        ordered.splice(to, 0, moved);
        persistOrder(ordered);
      }
    }
    dragIdRef.current = null;
    dragOverIdRef.current = null;
    setDragId(null);
    setDragOverId(null);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  }

  function handleDragEnd() {
    dragIdRef.current = null;
    dragOverIdRef.current = null;
    setDragId(null);
    setDragOverId(null);
  }

  return (
    <div className="space-y-6">
      <Card className="space-y-4 p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold">Alumnado</h2>
          <p className="text-sm text-muted">
            Añade alumnos y registra comentarios con fecha. Los datos se guardan en este navegador (localStorage).
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex-1">
            <span className="sr-only">Nombre del alumno</span>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddStudent();
                }
              }}
              placeholder="Nombre del alumno"
              maxLength={80}
              className="w-full rounded-xl border border-border bg-surface-sunken/30 px-3 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>
          <button
            type="button"
            onClick={handleAddStudent}
            disabled={!newName.trim()}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-medium transition-colors sm:shrink-0",
              newName.trim()
                ? "bg-accent text-on-accent hover:bg-accent-strong"
                : "cursor-not-allowed bg-accent/40 text-on-accent/70",
            )}
          >
            Añadir alumno
          </button>
        </div>
      </Card>

      <div className="grid gap-3">
        {data.students.length === 0 ? (
          <Card className="p-5 text-sm text-muted">No hay alumnos todavía. Añade el primero arriba.</Card>
        ) : (
          data.students.map((student) => {
            const commentCount = data.comments.filter((c) => c.studentId === student.id).length;
            const isDragging = dragId === student.id;
            const isDragOver = dragOverId === student.id && dragId !== student.id;
            const isEditing = editingId === student.id;
            return (
              <Card
                key={student.id}
                ref={(el) => {
                  if (el) cardRefs.current.set(student.id, el);
                  else cardRefs.current.delete(student.id);
                }}
                className={cn(
                  "flex flex-row flex-wrap items-center justify-between gap-3 p-4 transition-all sm:p-5",
                  isDragging && "opacity-50",
                  isDragOver && "border-accent/60 ring-2 ring-accent/20",
                )}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <button
                    type="button"
                    onPointerDown={(e) => handlePointerDown(e, student.id)}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handleDragEnd}
                    aria-label={`Arrastrar para reordenar a ${student.name}`}
                    title="Mantén pulsado y arrastra para reordenar"
                    className="inline-flex h-9 w-9 shrink-0 cursor-grab touch-none items-center justify-center rounded-md border border-border/70 text-muted transition-colors hover:bg-surface-sunken hover:text-foreground active:cursor-grabbing"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                    </svg>
                  </button>
                  <div className="min-w-0 flex-1">
                    {isEditing ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleRenameStudent(student.id);
                            }
                            if (e.key === "Escape") {
                              setEditingId(null);
                              setEditingName("");
                            }
                          }}
                          maxLength={80}
                          autoFocus
                          className="min-w-0 flex-1 rounded-lg border border-border bg-surface-sunken/30 px-3 py-1.5 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                        />
                        <button
                          type="button"
                          onClick={() => handleRenameStudent(student.id)}
                          disabled={!editingName.trim()}
                          className={cn(
                            "rounded-lg px-3 py-1.5 text-xs font-medium",
                            editingName.trim()
                              ? "bg-accent text-on-accent hover:bg-accent-strong"
                              : "cursor-not-allowed bg-accent/40 text-on-accent/70",
                          )}
                        >
                          Guardar
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(null);
                            setEditingName("");
                          }}
                          className="rounded-lg border border-border/70 px-3 py-1.5 text-xs font-medium hover:bg-surface-sunken"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <div className="flex min-w-0 items-center gap-2">
                        <p className="truncate text-base font-semibold">{student.name}</p>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(student.id);
                            setEditingName(student.name);
                          }}
                          aria-label={`Editar nombre de ${student.name}`}
                          title="Editar nombre"
                          className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-sunken hover:text-foreground"
                        >
                          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                            <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                          </svg>
                        </button>
                      </div>
                    )}
                    <p className="text-sm text-muted">
                      {commentCount === 0
                        ? "Sin comentarios"
                        : commentCount === 1
                          ? "1 comentario"
                          : `${commentCount} comentarios`}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCommentStudent(student)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-surface text-accent transition-colors hover:bg-surface-sunken"
                    aria-label={`Añadir comentario a ${student.name}`}
                    title="Añadir comentario"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path d="M3.5 4.75A1.75 1.75 0 0 1 5.25 3h9.5A1.75 1.75 0 0 1 16.5 4.75v7.5a1.75 1.75 0 0 1-1.75 1.75H6.56l-2.22 2.22A.75.75 0 0 1 3 15.69V4.75Z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarStudent(student)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-surface text-accent transition-colors hover:bg-surface-sunken"
                    aria-label={`Ver agenda de ${student.name}`}
                    title="Agenda"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A1.75 1.75 0 0 1 17 5.75v9.5A1.75 1.75 0 0 1 15.25 17H4.75A1.75 1.75 0 0 1 3 15.25v-9.5A1.75 1.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteStudent(student.id)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-danger/30 bg-surface text-danger transition-colors hover:bg-danger/10"
                    aria-label={`Eliminar a ${student.name}`}
                    title="Eliminar alumno"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022 1.005 11.36A2.75 2.75 0 0 0 7.759 19h4.482a2.75 2.75 0 0 0 2.74-2.508l1.005-11.36.149.022a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {commentStudent ? (
        <AddCommentModal
          student={commentStudent}
          initialDate={todayKey}
          onClose={() => setCommentStudent(null)}
          onSave={(text, date) => {
            handleSaveComment(commentStudent.id, date, text);
            setCommentStudent(null);
          }}
        />
      ) : null}

      {calendarStudent ? (
        <CalendarModal
          student={calendarStudent}
          data={data}
          onClose={() => setCalendarStudent(null)}
          onAddComment={(date, text) => {
            handleSaveComment(calendarStudent.id, date, text);
          }}
          onDeleteComment={handleDeleteComment}
        />
      ) : null}
    </div>
  );
}
