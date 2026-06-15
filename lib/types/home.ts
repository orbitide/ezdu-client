import type { Difficulty } from "@/components/shared/difficulty-badge"
import type { RankTier } from "@/lib/types/user"

export interface StudyPlanItem {
  id: string
  title: string
  subject: string
  durationMinutes: number
  completed: boolean
}

export interface RecommendedQuiz {
  id: string
  title: string
  subject: string
  questionCount: number
  difficulty: Difficulty
  xpReward: number
}

export interface UpcomingModelTest {
  id: string
  title: string
  examGroup: string
  scheduledFor: string
  durationMinutes: number
}

export interface LeaderboardEntry {
  id: string
  rank: number
  name: string
  xp: number
  rankTier: RankTier
  isCurrentUser?: boolean
}

export interface HomeGridItem {
  id: string
  label: string
  href: string
  icon: string
}
