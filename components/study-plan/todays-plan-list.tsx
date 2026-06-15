"use client"

import { useState } from "react"
import { Clock, CheckCircle2, Circle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { todaysStudyPlan } from "@/lib/mock/study-plan"

export function TodaysPlanList() {
  const [done, setDone] = useState<Record<string, boolean>>(
    Object.fromEntries(todaysStudyPlan.map((item) => [item.id, item.done]))
  )

  return (
    <Card>
      <CardContent className="divide-y pt-6">
        {todaysStudyPlan.map((item) => (
          <button
            key={item.id}
            onClick={() => setDone((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
            className="flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0"
          >
            {done[item.id] ? (
              <CheckCircle2 className="size-5 shrink-0 text-green-600" />
            ) : (
              <Circle className="size-5 shrink-0 text-muted-foreground" />
            )}
            <div className="flex-1">
              <p className={cn("text-sm font-medium", done[item.id] && "text-muted-foreground line-through")}>
                {item.subject} - {item.topic}
              </p>
            </div>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3.5" />
              {item.durationMinutes} মিনিট
            </span>
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
