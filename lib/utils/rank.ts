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
