export type Student = {
  id: string;
  name: string;
  createdAt: string;
};

export type StudentComment = {
  id: string;
  studentId: string;
  /** Day the comment belongs to, YYYY-MM-DD (local) */
  date: string;
  text: string;
  /** ISO timestamp when the comment was added */
  createdAt: string;
};

export type SeguimientoData = {
  students: Student[];
  comments: StudentComment[];
};
