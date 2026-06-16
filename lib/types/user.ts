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
  hairType: string
  hairColor: string
  headwearType: string
  hatColor: string
  accessoriesType: string
  glassesColor: string
  facialHairType: string
  facialHairColor: string
  clotheType: string
  clotheColor: string
  graphicType: string
  eyeType: string
  eyebrowType: string
  mouthType: string
  skinColor: string
  backgroundColor: string
}

export interface SocialCounts {
  following: number
  followers: number
}

export interface User {
  id: string
  name: string
  username: string
  email: string
  examGroup: string
  className: string
  avatar: AvatarConfig
  isPremium?: boolean
  streakFreezeCount?: number
  leagueName?: string
  socialCounts?: SocialCounts
}

export interface ProgressSummary {
  coins: number
  xp: number
  level: number
  streakDays: number
  rankTier: RankTier
  isPremium: boolean
}
