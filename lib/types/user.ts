export type RankTier =
  | "novice"
  | "apprentice"
  | "adept"
  | "expert"
  | "master"
  | "grandmaster"
  | "champion"
  | "legend"
  | "mythic"

export interface AvatarConfig {
  skinTone: string
  hairStyle: string
  hairColor: string
  outfit: string
  accessory: string
  background: string
}

export interface User {
  id: string
  name: string
  username: string
  email: string
  examGroup: string
  className: string
  avatar: AvatarConfig
}

export interface ProgressSummary {
  coins: number
  xp: number
  level: number
  streakDays: number
  rankTier: RankTier
}
