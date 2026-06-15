export interface Assignment {
  id: string
  title: string
  subject: string
  courseId?: string
  description: string
  dueDate: string
  status: "pending" | "submitted" | "graded"
  grade?: string
  feedback?: string
}
