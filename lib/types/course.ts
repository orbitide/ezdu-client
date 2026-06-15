export type LessonContentType = "video" | "text" | "interactive"

export interface ExplainerStep {
  title: string
  body: string
}

export interface Lesson {
  id: string
  chapterId: string
  title: string
  contentType: LessonContentType
  durationMinutes: number
  videoUrl?: string
  textContent?: string
  explainerSteps?: ExplainerStep[]
  xpReward: number
  completed: boolean
}

export interface Chapter {
  id: string
  courseId: string
  title: string
  order: number
  lessonIds: string[]
  linkedQuizId?: string
}

export interface FlashcardDeckCard {
  id: string
  front: string
  back: string
}

export interface FlashcardDeck {
  id: string
  courseId: string
  title: string
  cards: FlashcardDeckCard[]
}

export interface Course {
  id: string
  title: string
  description: string
  examGroup: string
  subject: string
  coverColor: string
  chapterIds: string[]
  totalLessons: number
  enrolled: boolean
  progressPercent: number
}
