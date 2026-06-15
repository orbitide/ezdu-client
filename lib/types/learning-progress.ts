export interface WeakTopic {
  id: string
  subject: string
  topic: string
  masteryPercent: number
  courseId?: string
  chapterId?: string
}

export interface LearningPlanItem {
  id: string
  title: string
  description: string
  durationMinutes: number
  courseId?: string
  lessonId?: string
  done: boolean
}

export interface SubjectCompletion {
  subject: string
  completedLessons: number
  totalLessons: number
}
