"use server";

import { and, asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth/guard";
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

async function getSeguimientoDataForUser(userId: string): Promise<SeguimientoData> {
  const [students, comments] = await Promise.all([
    db
      .select()
      .from(seguimientoStudent)
      .where(eq(seguimientoStudent.userId, userId))
      .orderBy(asc(seguimientoStudent.sortOrder), asc(seguimientoStudent.createdAt)),
    db
      .select()
      .from(seguimientoComment)
      .where(eq(seguimientoComment.userId, userId))
      .orderBy(asc(seguimientoComment.createdAt)),
  ]);

  return {
    students: students.map(toStudent),
    comments: comments.map(toComment),
  };
}

export async function getSeguimientoData(): Promise<SeguimientoData> {
  const user = await requireUser();
  return getSeguimientoDataForUser(user.id);
}

export async function createStudentAction(name: string): Promise<SeguimientoData> {
  const user = await requireUser();
  const trimmed = name.trim().slice(0, 80);
  if (trimmed) {
    const existing = await db
      .select({ sortOrder: seguimientoStudent.sortOrder })
      .from(seguimientoStudent)
      .where(eq(seguimientoStudent.userId, user.id));
    const maxOrder = existing.reduce((m, r) => Math.max(m, r.sortOrder ?? 0), -1);
    await db.insert(seguimientoStudent).values({
      id: uid(),
      userId: user.id,
      name: trimmed,
      sortOrder: maxOrder + 1,
      createdAt: new Date(),
    });
  }
  return getSeguimientoDataForUser(user.id);
}

export async function createCommentAction(input: {
  studentId: string;
  date: string;
  text: string;
}): Promise<SeguimientoData> {
  const user = await requireUser();
  const text = input.text.trim().slice(0, 1000);
  if (text && input.studentId && /^\d{4}-\d{2}-\d{2}$/.test(input.date)) {
    const [student] = await db
      .select({ id: seguimientoStudent.id })
      .from(seguimientoStudent)
      .where(and(eq(seguimientoStudent.id, input.studentId), eq(seguimientoStudent.userId, user.id)))
      .limit(1);
    if (student) {
      await db.insert(seguimientoComment).values({
        id: uid(),
        userId: user.id,
        studentId: input.studentId,
        date: input.date,
        text,
        createdAt: new Date(),
      });
    }
  }
  return getSeguimientoDataForUser(user.id);
}

export async function deleteStudentAction(studentId: string): Promise<SeguimientoData> {
  const user = await requireUser();
  if (studentId) {
    await db
      .delete(seguimientoStudent)
      .where(and(eq(seguimientoStudent.id, studentId), eq(seguimientoStudent.userId, user.id)));
  }
  return getSeguimientoDataForUser(user.id);
}

export async function deleteCommentAction(commentId: string): Promise<SeguimientoData> {
  const user = await requireUser();
  if (commentId) {
    await db
      .delete(seguimientoComment)
      .where(and(eq(seguimientoComment.id, commentId), eq(seguimientoComment.userId, user.id)));
  }
  return getSeguimientoDataForUser(user.id);
}

export async function updateCommentAction(commentId: string, text: string): Promise<SeguimientoData> {
  const user = await requireUser();
  const next = text.trim().slice(0, 1000);
  if (commentId && next) {
    await db
      .update(seguimientoComment)
      .set({ text: next })
      .where(and(eq(seguimientoComment.id, commentId), eq(seguimientoComment.userId, user.id)));
  }
  return getSeguimientoDataForUser(user.id);
}

export async function reorderStudentsAction(orderedIds: string[]): Promise<SeguimientoData> {
  const user = await requireUser();
  if (Array.isArray(orderedIds) && orderedIds.length > 0) {
    await Promise.all(
      orderedIds.map((id, index) =>
        db
          .update(seguimientoStudent)
          .set({ sortOrder: index })
          .where(and(eq(seguimientoStudent.id, id), eq(seguimientoStudent.userId, user.id))),
      ),
    );
  }
  return getSeguimientoDataForUser(user.id);
}

export async function renameStudentAction(
  studentId: string,
  name: string,
): Promise<SeguimientoData> {
  const user = await requireUser();
  const trimmed = name.trim().slice(0, 80);
  if (studentId && trimmed) {
    await db
      .update(seguimientoStudent)
      .set({ name: trimmed })
      .where(and(eq(seguimientoStudent.id, studentId), eq(seguimientoStudent.userId, user.id)));
  }
  return getSeguimientoDataForUser(user.id);
}
