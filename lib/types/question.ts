import type { Difficulty } from "@/components/shared/difficulty-badge"

export interface Question {
  id: string
  subject: string
  topic: string
  stem: string
  options: string[]
  correctIndex: number
  explanation: string
  difficulty: Difficulty
}
