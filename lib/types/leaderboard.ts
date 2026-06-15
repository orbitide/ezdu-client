import type { RankTier } from "@/lib/types/user"

export interface LeaderboardUser {
  id: string
  username: string
  name: string
  rank: number
  xp: number
  rankTier: RankTier
  level: number
  isCurrentUser?: boolean
}
