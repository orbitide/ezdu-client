"use client"

import { Sparkles, Flame, Target, Coins } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useProgressStore } from "@/lib/store/progress-store"
import { formatCompactNumber } from "@/lib/utils/format"
import { quizAttempts } from "@/lib/mock/quiz-attempts"

export function ProfileStatsGrid() {
  const { xp, coins, streakDays } = useProgressStore((s) => s)

  const totalAnswered = quizAttempts.reduce((sum, a) => sum + a.total, 0)
  const totalCorrect = quizAttempts.reduce((sum, a) => sum + a.correct, 0)
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0

  const stats = [
    { label: "মোট এক্সপি", value: formatCompactNumber(xp), icon: Sparkles, color: "text-xp" },
    { label: "কয়েন", value: formatCompactNumber(coins), icon: Coins, color: "text-amber-600" },
    { label: "স্ট্রিক", value: `${streakDays} দিন`, icon: Flame, color: "text-streak" },
    { label: "সঠিকতা", value: `${accuracy}%`, icon: Target, color: "text-primary" },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="space-y-2 py-4">
            <stat.icon className={`size-5 ${stat.color}`} />
            <p className="text-xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
