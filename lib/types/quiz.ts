export type QuizType = "model" | "mock" | "quick" | "archive" | "preset"

export interface QuizConfig {
  id: string
  type: QuizType
  title: string
  questionIds: string[]
  durationSeconds: number
  xpReward: number
  coinReward: number
}

export interface QuizAnswer {
  questionId: string
  selectedIndex: number | null
  flagged: boolean
}

export interface QuizResult {
  quizId: string
  total: number
  correct: number
  incorrect: number
  skipped: number
  xpEarned: number
  coinsEarned: number
  timeTakenSeconds: number
  answers: QuizAnswer[]
}
