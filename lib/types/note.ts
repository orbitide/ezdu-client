export interface Note {
  id: string
  title: string
  subject: string
  content: string
  lessonId?: string
  updatedAt: string
}

export interface Highlight {
  id: string
  noteId: string
  text: string
}
