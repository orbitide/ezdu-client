"use client"

import { Flame } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useProgressStore } from "@/lib/store/progress-store"

export function StreakTracker() {
  const streakDays = useProgressStore((s) => s.streakDays)

  return (
    <Card className="border-amber-500/30 bg-amber-500/5">
      <CardContent className="flex items-center gap-3 py-4">
        <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500/10">
          <Flame className="size-5 text-amber-600" />
        </div>
        <div>
          <p className="font-semibold">{streakDays} দিনের স্ট্রিক</p>
          <p className="text-xs text-muted-foreground">প্রতিদিন অনুশীলন করে স্ট্রিক বজায় রাখো</p>
        </div>
      </CardContent>
    </Card>
  )
}
