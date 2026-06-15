export interface ActivityDay {
  date: string
  label: string
  questionsAnswered: number
}

export interface SubjectMastery {
  subjectId: string
  subjectName: string
  accuracy: number
  questionsAnswered: number
  topics: TopicMastery[]
}

export interface TopicMastery {
  topicId: string
  topicName: string
  accuracy: number
  questionsAnswered: number
}

export interface QuizAttempt {
  id: string
  quizId: string
  title: string
  type: "model" | "mock" | "quick" | "archive" | "preset"
  date: string
  total: number
  correct: number
  incorrect: number
  skipped: number
  xpEarned: number
  coinsEarned: number
  timeTakenSeconds: number
}

export interface MistakeQuestion {
  questionId: string
  attemptId: string
  attemptTitle: string
  date: string
}
