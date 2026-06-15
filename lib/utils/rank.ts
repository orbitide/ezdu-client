import type { RankTier } from "@/lib/types/user"

export const RANK_TIERS: RankTier[] = [
  "novice",
  "apprentice",
  "adept",
  "expert",
  "master",
  "grandmaster",
  "champion",
  "legend",
  "mythic",
]

export const RANK_LABELS: Record<RankTier, string> = {
  novice: "Novice",
  apprentice: "Apprentice",
  adept: "Adept",
  expert: "Expert",
  master: "Master",
  grandmaster: "Grandmaster",
  champion: "Champion",
  legend: "Legend",
  mythic: "Mythic",
}

export function rankColorVar(tier: RankTier) {
  return `var(--color-rank-${tier})`
}
