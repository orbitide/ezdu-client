export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
  progress?: { current: number; target: number }
}

export interface Friend {
  id: string
  username: string
  name: string
  level: number
  rankTier: string
  online: boolean
}
