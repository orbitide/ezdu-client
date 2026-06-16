"use client"

import Link from "next/link"
import { Clock, CheckCircle2, Circle, CalendarDays } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useStudyPlanStore } from "@/lib/store/study-plan-store"

export function TodaysPlanList() {
  const { plan, markItemCompleted } = useStudyPlanStore()

  const today = new Date().toISOString().slice(0, 10)
  const todayDay = plan?.days.find((d) => d.date === today)

  if (!plan || !todayDay) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
          <CalendarDays className="size-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">আজকের জন্য কোনো পরিকল্পনা নেই।</p>
          <Button asChild size="sm" variant="outline">
            <Link href="/study-plan/create">পরিকল্পনা তৈরি করো</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="divide-y pt-6">
        {todayDay.items.map((item) => {
          const done = item.status === "completed"
          return (
            <button
              key={item.lessonId}
              onClick={() => !done && markItemCompleted(item.lessonId, item.dayNumber)}
              className="flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0"
            >
              {done ? (
                <CheckCircle2 className="size-5 shrink-0 text-green-600" />
              ) : (
                <Circle className="size-5 shrink-0 text-muted-foreground" />
              )}
              <div className="flex-1">
                <p className={cn("text-sm font-medium", done && "text-muted-foreground line-through")}>
                  {item.subjectName} — {item.lessonName}
                </p>
              </div>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                {item.durationMinutes} মিনিট
              </span>
            </button>
          )
        })}
      </CardContent>
    </Card>
  )
}
