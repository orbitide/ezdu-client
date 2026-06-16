export type StudyPlanMode = "manual" | "auto"
export type StudyPlanItemStatus = "pending" | "completed"
export type StudyPlanStatus = "active" | "completed" | "expired"

export interface StudyPlanItem {
  lessonId: string
  lessonName: string
  subjectId: string
  subjectName: string
  date: string
  dayNumber: number
  status: StudyPlanItemStatus
  lessonMasteryPercent: number
  durationMinutes: number
}

export interface StudyPlanDay {
  dayNumber: number
  date: string
  dailyMinutes: number
  items: StudyPlanItem[]
}

export interface StudyPlan {
  id: string
  mode: StudyPlanMode
  duration: 7 | 30
  dailyMinutes: number
  status: StudyPlanStatus
  createdAt: string
  expiresAt: string
  days: StudyPlanDay[]
}

export interface SubjectRotation {
  day: string
  subjects: string[]
}

export interface LessonOption {
  lessonId: string
  lessonName: string
  subjectId: string
  subjectName: string
  masteryPercent: number
}
