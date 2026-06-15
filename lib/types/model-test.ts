export interface ModelTest {
  id: string
  title: string
  examGroup: string
  questionCount: number
  durationMinutes: number
  xpReward: number
  coinReward: number
  attempted: boolean
}

export interface PresetSet {
  id: string
  title: string
  description: string
  questionCount: number
  durationMinutes: number
  xpReward: number
  coinReward: number
}
