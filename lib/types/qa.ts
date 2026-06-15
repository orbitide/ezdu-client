export interface QaAnswer {
  id: string
  author: string
  body: string
  timeAgo: string
  accepted?: boolean
}

export interface QaQuestion {
  id: string
  title: string
  body: string
  subject: string
  author: string
  timeAgo: string
  answerCount: number
  answers: QaAnswer[]
  lessonId?: string
}
