export interface StudyPlanItem {
  id: string
  subject: string
  topic: string
  durationMinutes: number
  done: boolean
}

export interface SubjectRotation {
  day: string
  subjects: string[]
}
