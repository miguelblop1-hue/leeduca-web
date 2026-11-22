import type { SeguimientoData, Student, StudentComment } from "./types";

const STORAGE_KEY = "leeduca-seguimiento-v1";

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createDefaultData(): SeguimientoData {
  const now = new Date().toISOString();
  return {
    students: [
      { id: uid(), name: "Lucía", createdAt: now },
      { id: uid(), name: "Mateo", createdAt: now },
      { id: uid(), name: "Sofía", createdAt: now },
    ],
    comments: [],
  };
}

export function loadSeguimientoData(): SeguimientoData {
  if (typeof window === "undefined") return createDefaultData();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const defaults = createDefaultData();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
      return defaults;
    }
    const parsed = JSON.parse(raw) as Partial<SeguimientoData>;
    const students = Array.isArray(parsed.students)
      ? parsed.students.filter(
          (s): s is Student =>
            !!s &&
            typeof s === "object" &&
            typeof (s as Student).id === "string" &&
            typeof (s as Student).name === "string",
        )
      : [];
    const comments = Array.isArray(parsed.comments)
      ? parsed.comments.filter(
          (c): c is StudentComment =>
            !!c &&
            typeof c === "object" &&
            typeof (c as StudentComment).id === "string" &&
            typeof (c as StudentComment).studentId === "string" &&
            typeof (c as StudentComment).date === "string" &&
            typeof (c as StudentComment).text === "string" &&
            typeof (c as StudentComment).createdAt === "string",
        )
      : [];
    return { students, comments };
  } catch {
    const defaults = createDefaultData();
    return defaults;
  }
}

export function saveSeguimientoData(data: SeguimientoData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addStudent(data: SeguimientoData, name: string): SeguimientoData {
  const trimmed = name.trim();
  if (!trimmed) return data;
  const student: Student = {
    id: uid(),
    name: trimmed.slice(0, 80),
    createdAt: new Date().toISOString(),
  };
  const next = { ...data, students: [...data.students, student] };
  saveSeguimientoData(next);
  return next;
}

export function addComment(
  data: SeguimientoData,
  input: { studentId: string; date: string; text: string },
): SeguimientoData {
  const text = input.text.trim();
  if (!text) return data;
  const comment: StudentComment = {
    id: uid(),
    studentId: input.studentId,
    date: input.date,
    text: text.slice(0, 1000),
    createdAt: new Date().toISOString(),
  };
  const next = { ...data, comments: [...data.comments, comment] };
  saveSeguimientoData(next);
  return next;
}

export function deleteStudent(data: SeguimientoData, studentId: string): SeguimientoData {
  const next = {
    ...data,
    students: data.students.filter((s) => s.id !== studentId),
    comments: data.comments.filter((c) => c.studentId !== studentId),
  };
  saveSeguimientoData(next);
  return next;
}

export function commentsForStudentOnDate(
  data: SeguimientoData,
  studentId: string,
  date: string,
): StudentComment[] {
  return data.comments
    .filter((c) => c.studentId === studentId && c.date === date)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export function commentDatesForStudent(data: SeguimientoData, studentId: string): Set<string> {
  const dates = new Set<string>();
  for (const c of data.comments) {
    if (c.studentId === studentId) dates.add(c.date);
  }
  return dates;
}
