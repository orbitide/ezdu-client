export interface Subject {
  id: string
  name: string
  icon: string
  topicCount: number
  questionCount: number
}

export interface Topic {
  id: string
  subjectId: string
  name: string
  questionCount: number
}
