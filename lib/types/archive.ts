export interface ArchiveNode {
  id: string
  subjectId: string
  parentId?: string
  name: string
  examIds?: string[]
}

export interface ArchiveExam {
  id: string
  title: string
  examGroup: string
  year: number
  board: string
  questionCount: number
  durationMinutes: number
  xpReward: number
  coinReward: number
  attempted: boolean
}

export interface ArchiveInstitute {
  id: string
  name: string
}
