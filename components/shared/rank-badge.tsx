import Image from "next/image"
import { cn } from "@/lib/utils"
import { RANK_LABELS, leagueIconUrl } from "@/lib/utils/rank"
import type { RankTier } from "@/lib/types/user"

export function RankBadge({
  tier,
  className,
}: {
  tier: RankTier
  className?: string
}) {
  return (
    <span className={cn("inline-flex items-center justify-center", className)} title={RANK_LABELS[tier]}>
      <Image src={leagueIconUrl(tier)} alt={RANK_LABELS[tier]} width={32} height={36} />
    </span>
  )
}
