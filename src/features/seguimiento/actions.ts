"use server";

import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { seguimientoComment, seguimientoStudent } from "@/lib/db/schema";
import type { SeguimientoData, Student, StudentComment } from "./types";

function uid(): string {
  return crypto.randomUUID();
}

function toStudent(row: typeof seguimientoStudent.$inferSelect): Student {
  return {
    id: row.id,
    name: row.name,
    createdAt: row.createdAt.toISOString(),
  };
}

function toComment(row: typeof seguimientoComment.$inferSelect): StudentComment {
  return {
    id: row.id,
    studentId: row.studentId,
    date: row.date,
    text: row.text,
    createdAt: row.createdAt.toISOString(),
  };
}

export async function getSeguimientoData(): Promise<SeguimientoData> {
  const [students, comments] = await Promise.all([
    db
      .select()
      .from(seguimientoStudent)
      .orderBy(asc(seguimientoStudent.sortOrder), asc(seguimientoStudent.createdAt)),
    db.select().from(seguimientoComment).orderBy(asc(seguimientoComment.createdAt)),
  ]);

  // Seed default students if DB is empty (first use / fresh DB)
  if (students.length === 0 && comments.length === 0) {
    const now = new Date();
    const defaults = [
      { id: uid(), name: "Lucía", sortOrder: 0, createdAt: now },
      { id: uid(), name: "Mateo", sortOrder: 1, createdAt: now },
      { id: uid(), name: "Sofía", sortOrder: 2, createdAt: now },
    ];
    await db.insert(seguimientoStudent).values(defaults);
    return {
      students: defaults.map(toStudent),
      comments: [],
    };
  }

  return {
    students: students.map(toStudent),
    comments: comments.map(toComment),
  };
}

export async function createStudentAction(name: string): Promise<SeguimientoData> {
  const trimmed = name.trim().slice(0, 80);
  if (trimmed) {
    const existing = await db
      .select({ sortOrder: seguimientoStudent.sortOrder })
      .from(seguimientoStudent);
    const maxOrder = existing.reduce((m, r) => Math.max(m, r.sortOrder ?? 0), -1);
    await db.insert(seguimientoStudent).values({
      id: uid(),
      name: trimmed,
      sortOrder: maxOrder + 1,
      createdAt: new Date(),
    });
  }
  return getSeguimientoData();
}

export async function createCommentAction(input: {
  studentId: string;
  date: string;
  text: string;
}): Promise<SeguimientoData> {
  const text = input.text.trim().slice(0, 1000);
  if (text && input.studentId && /^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    await db.insert(seguimientoComment).values({
      id: uid(),
      studentId: input.studentId,
      date: input.date,
      text,
      createdAt: new Date(),
    });
  }
  return getSeguimientoData();
}

export async function deleteStudentAction(studentId: string): Promise<SeguimientoData> {
  if (studentId) {
    await db.delete(seguimientoStudent).where(eq(seguimientoStudent.id, studentId));
  }
  return getSeguimientoData();
}

export async function reorderStudentsAction(orderedIds: string[]): Promise<SeguimientoData> {
  if (Array.isArray(orderedIds) && orderedIds.length > 0) {
    await Promise.all(
      orderedIds.map((id, index) =>
        db
          .update(seguimientoStudent)
          .set({ sortOrder: index })
          .where(eq(seguimientoStudent.id, id)),
      ),
    );
  }
  return getSeguimientoData();
}
