"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { SeguimientoData, Student } from "./types";
import {
  addComment,
  addStudent,
  commentsForStudentOnDate,
  deleteStudent,
  loadSeguimientoData,
} from "./storage";

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
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Comentario</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            maxLength={1000}
            placeholder="Escribe una observación sobre el alumno..."
            className="w-full rounded-xl border border-border bg-surface-sunken/30 px-3 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
            autoFocus
          />
        </label>
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
};

function CalendarModal({ student, data, onClose, onAddComment }: CalendarModalProps) {
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
    () => commentsForStudentOnDate(data, student.id, selectedDate),
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
                    <p className="text-sm whitespace-pre-wrap">{c.text}</p>
                    <p className="mt-1 text-xs text-muted">
                      Añadido el {formatDayMonth(c.date)} · {formatTime(c.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-border/60 pt-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium">Añadir comentario en este día</span>
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  rows={3}
                  maxLength={1000}
                  placeholder="Escribe un comentario para este día..."
                  className="w-full rounded-xl border border-border bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </label>
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

export function StudentTracker() {
  const [data, setData] = useState<SeguimientoData | null>(null);
  const [newName, setNewName] = useState("");
  const [commentStudent, setCommentStudent] = useState<Student | null>(null);
  const [calendarStudent, setCalendarStudent] = useState<Student | null>(null);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setData(loadSeguimientoData());
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const todayKey = toDateKey(new Date());

  function handleAddStudent() {
    const name = newName.trim();
    if (!name || !data) return;
    setData(addStudent(data, name));
    setNewName("");
  }

  function handleSaveComment(studentId: string, date: string, text: string) {
    if (!data) return;
    setData(addComment(data, { studentId, date, text }));
  }

  function handleDeleteStudent(studentId: string) {
    if (!data) return;
    const student = data.students.find((s) => s.id === studentId);
    if (!student) return;
    const ok = window.confirm(
      `¿Eliminar a ${student.name} y todos sus comentarios? Esta acción no se puede deshacer.`,
    );
    if (!ok) return;
    setData(deleteStudent(data, studentId));
    if (commentStudent?.id === studentId) setCommentStudent(null);
    if (calendarStudent?.id === studentId) setCalendarStudent(null);
  }

  if (!data) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted">Cargando seguimiento…</p>
      </Card>
    );
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
            return (
              <Card key={student.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold">{student.name}</p>
                  <p className="text-sm text-muted">
                    {commentCount === 0
                      ? "Sin comentarios"
                      : commentCount === 1
                        ? "1 comentario"
                        : `${commentCount} comentarios`}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCommentStudent(student)}
                    className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-surface px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-sunken"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-accent" aria-hidden="true">
                      <path d="M3.5 4.75A1.75 1.75 0 0 1 5.25 3h9.5A1.75 1.75 0 0 1 16.5 4.75v7.5a1.75 1.75 0 0 1-1.75 1.75H6.56l-2.22 2.22A.75.75 0 0 1 3 15.69V4.75Z" />
                    </svg>
                    Añadir comentario
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarStudent(student)}
                    className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-surface px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-sunken"
                    aria-label={`Ver agenda de ${student.name}`}
                    title="Ver agenda"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-accent" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A1.75 1.75 0 0 1 17 5.75v9.5A1.75 1.75 0 0 1 15.25 17H4.75A1.75 1.75 0 0 1 3 15.25v-9.5A1.75 1.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                    </svg>
                    Agenda
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteStudent(student.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-danger/30 bg-surface px-3 py-2 text-sm font-medium text-danger transition-colors hover:bg-danger/10"
                    aria-label={`Eliminar a ${student.name}`}
                    title="Eliminar alumno"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022 1.005 11.36A2.75 2.75 0 0 0 7.759 19h4.482a2.75 2.75 0 0 0 2.74-2.508l1.005-11.36.149.022a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                    </svg>
                    Eliminar
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
        />
      ) : null}
    </div>
  );
}
