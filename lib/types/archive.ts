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
