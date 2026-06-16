"use client"

import { Flame, Coins, Sparkles, Trophy } from "lucide-react"
import { useProgressStore } from "@/lib/store/progress-store"
import { formatCompactNumber } from "@/lib/utils/format"
import { RANK_LEAGUE_ORDER, LEAGUE_NAMES } from "@/lib/utils/rank"

const LEAGUE_ACCENT: Record<string, string> = {
  novice: "#cd7f32",
  apprentice: "#a8a9ad",
  adept: "#ffd700",
  expert: "#b9f2ff",
  master: "#b9f2ff",
  grandmaster: "#50c878",
  champion: "#6af",
  legend: "#c77dff",
  mythic: "#ff6b6b",
}

interface StatRowProps {
  icon: React.ReactNode
  value: string
}

function StatRow({ icon, value }: StatRowProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="shrink-0">{icon}</span>
      <span className="truncate text-sm font-extrabold">{value}</span>
    </div>
  )
}

export function UserRankCard() {
  const { xp, coins, streakDays, rankTier } = useProgressStore((s) => s)

  const leagueOrder = RANK_LEAGUE_ORDER[rankTier] ?? 1
  const leagueName = LEAGUE_NAMES[leagueOrder] ?? rankTier
  const accent = LEAGUE_ACCENT[rankTier] ?? "#6af"

  return (
    <div
      className="rounded-2xl border-2 p-5"
      style={{ borderColor: `${accent}55` }}
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-4">
        <StatRow
          icon={<Flame className="size-5 text-orange-500" />}
          value={`${streakDays} দিন`}
        />
        <StatRow
          icon={<Coins className="size-5 text-amber-500" />}
          value={`${formatCompactNumber(coins)} EC`}
        />
        <StatRow
          icon={<Trophy className="size-5" style={{ color: accent }} />}
          value={leagueName}
        />
        <StatRow
          icon={<Sparkles className="size-5 text-yellow-400" />}
          value={`${formatCompactNumber(xp)} XP`}
        />
      </div>
    </div>
  )
}
