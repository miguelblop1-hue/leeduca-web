import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const seguimientoStudent = sqliteTable(
  "seguimiento_student",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  },
  (table) => [
    index("seguimiento_student_created_idx").on(table.createdAt),
    index("seguimiento_student_sort_idx").on(table.sortOrder),
  ],
);

export const seguimientoComment = sqliteTable(
  "seguimiento_comment",
  {
    id: text("id").primaryKey(),
    studentId: text("student_id")
      .notNull()
      .references(() => seguimientoStudent.id, { onDelete: "cascade" }),
    /** Day the comment belongs to, YYYY-MM-DD */
    date: text("date").notNull(),
    text: text("text").notNull(),
    /** When the comment was added */
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  },
  (table) => [
    index("seguimiento_comment_student_date_idx").on(table.studentId, table.date),
    index("seguimiento_comment_student_idx").on(table.studentId),
  ],
);
