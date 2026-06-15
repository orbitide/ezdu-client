"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AvatarSvg } from "@/components/avatar/avatar-svg"
import { CoinBalance } from "@/components/shared/coin-balance"
import { XpBadge } from "@/components/shared/xp-badge"
import { StreakBadge } from "@/components/shared/streak-badge"
import { RankBadge } from "@/components/shared/rank-badge"
import { useAuthStore } from "@/lib/store/auth-store"
import { useProgressStore } from "@/lib/store/progress-store"

export function ProfileSummaryCard() {
  const user = useAuthStore((s) => s.user)
  const progress = useProgressStore((s) => ({
    coins: s.coins,
    xp: s.xp,
    level: s.level,
    streakDays: s.streakDays,
    rankTier: s.rankTier,
  }))

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-4">
        <AvatarSvg config={user?.avatar} size={64} />
        <div className="flex-1 space-y-1">
          <p className="font-heading text-lg font-semibold">
            {user?.name ?? "গেস্ট"}
          </p>
          <p className="text-sm text-muted-foreground">
            {user?.examGroup} · {user?.className}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CoinBalance amount={progress.coins} />
          <XpBadge xp={progress.xp} level={progress.level} />
          <StreakBadge days={progress.streakDays} />
          <RankBadge tier={progress.rankTier} />
        </div>
      </CardContent>
    </Card>
  )
}
