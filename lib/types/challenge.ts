export type ChallengeStatus = "idle" | "correct" | "wrong" | "finished"

export interface ChallengeSession {
  topicId: string
  questionIds: string[]
  currentIndex: number
  status: ChallengeStatus
  wrongOptionIndexes: number[]
  hasGuessedWronglyThisQuestion: boolean
  streak: number
  maxStreak: number
  everGuessedWrong: boolean
  startedAt: number | null
}

export interface ChallengeResult {
  topicId: string
  totalQuestions: number
  maxStreak: number
  timeTakenSeconds: number
}
