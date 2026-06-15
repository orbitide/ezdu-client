import { Crown } from "lucide-react"
import { cn } from "@/lib/utils"
import { RANK_LABELS, rankColorVar } from "@/lib/utils/rank"
import type { RankTier } from "@/lib/types/user"

export function RankBadge({
  tier,
  className,
}: {
  tier: RankTier
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-semibold text-white",
        className
      )}
      style={{ backgroundColor: rankColorVar(tier) }}
    >
      <Crown className="size-4" />
      {RANK_LABELS[tier]}
    </span>
  )
}
