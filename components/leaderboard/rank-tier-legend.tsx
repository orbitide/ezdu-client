import { Card, CardContent } from "@/components/ui/card"
import { RankBadge } from "@/components/shared/rank-badge"
import { RANK_TIERS } from "@/lib/utils/rank"

export function RankTierLegend() {
  return (
    <Card>
      <CardContent className="flex flex-wrap gap-2 py-4">
        {RANK_TIERS.map((tier) => (
          <RankBadge key={tier} tier={tier} />
        ))}
      </CardContent>
    </Card>
  )
}
