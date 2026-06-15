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
  novice: "নভিস",
  apprentice: "অ্যাপ্রেন্টিস",
  adept: "এডেপ্ট",
  expert: "এক্সপার্ট",
  master: "মাস্টার",
  grandmaster: "গ্র্যান্ডমাস্টার",
  champion: "চ্যাম্পিয়ন",
  legend: "লিজেন্ড",
  mythic: "মিথিক",
}

export function rankColorVar(tier: RankTier) {
  return `var(--color-rank-${tier})`
}

export const LEAGUE_TIERS: RankTier[] = [
  "novice",
  "apprentice",
  "adept",
  "expert",
  "master",
  "grandmaster",
  "champion",
]

export const RANK_LEAGUE_ORDER: Record<RankTier, number> = {
  novice: 1,
  apprentice: 2,
  adept: 3,
  expert: 4,
  master: 5,
  grandmaster: 6,
  champion: 7,
  legend: 7,
  mythic: 7,
}

export function leagueIconUrl(tier: RankTier) {
  return `/league/${RANK_LEAGUE_ORDER[tier]}.svg`
}

export function leagueIconUrlByOrder(order: number) {
  return `/league/${order}.svg`
}

export const LEAGUE_NAMES: Record<number, string> = {
  1: "Bronze",
  2: "Silver",
  3: "Gold",
  4: "Platinum",
  5: "Diamond",
  6: "Emerald",
  7: "Mythic",
}
