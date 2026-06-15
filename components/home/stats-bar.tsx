"use client"

import { CoinBalance } from "@/components/shared/coin-balance"
import { XpBadge } from "@/components/shared/xp-badge"
import { StreakBadge } from "@/components/shared/streak-badge"
import { useProgressStore } from "@/lib/store/progress-store"

export function StatsBar() {
  const coins = useProgressStore((s) => s.coins)
  const xp = useProgressStore((s) => s.xp)
  const level = useProgressStore((s) => s.level)
  const streakDays = useProgressStore((s) => s.streakDays)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <StreakBadge days={streakDays} />
      <CoinBalance amount={coins} />
      <XpBadge xp={xp} level={level} />
    </div>
  )
}
