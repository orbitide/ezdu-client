"use client"

import { Sparkles, Flame, Target, Crown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useProgressStore } from "@/lib/store/progress-store"
import { RANK_LABELS } from "@/lib/utils/rank"
import { formatCompactNumber } from "@/lib/utils/format"
import { quizAttempts } from "@/lib/mock/quiz-attempts"

export function OverviewStatsGrid() {
  const { xp, level, streakDays, rankTier } = useProgressStore((s) => s)

  const totalAnswered = quizAttempts.reduce((sum, a) => sum + a.total, 0)
  const totalCorrect = quizAttempts.reduce((sum, a) => sum + a.correct, 0)
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0

  const stats = [
    { label: "মোট এক্সপি", value: `${formatCompactNumber(xp)}`, sub: `লেভেল ${level}`, icon: Sparkles, color: "text-xp" },
    { label: "স্ট্রিক", value: `${streakDays} দিন`, sub: "চলমান", icon: Flame, color: "text-streak" },
    { label: "সঠিকতা", value: `${accuracy}%`, sub: `${totalAnswered} প্রশ্নের মধ্যে`, icon: Target, color: "text-primary" },
    { label: "র‍্যাঙ্ক", value: RANK_LABELS[rankTier], sub: "বর্তমান টায়ার", icon: Crown, color: "text-amber-600" },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="space-y-2 py-4">
            <stat.icon className={`size-5 ${stat.color}`} />
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">
              {stat.label} · {stat.sub}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
