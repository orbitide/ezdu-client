"use client"

import { useStudyPlanStore } from "@/lib/store/study-plan-store"
import { PlanDaySection } from "@/components/study-plan/plan-day-section"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Clock } from "lucide-react"

export function PlanActiveView() {
  const { plan, markItemCompleted } = useStudyPlanStore()

  if (!plan) return null

  const today = new Date().toISOString().slice(0, 10)
  const completedItems = plan.days.flatMap((d) => d.items).filter((i) => i.status === "completed").length
  const totalItems = plan.days.flatMap((d) => d.items).length
  const progressPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="flex items-center gap-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <CalendarDays className="size-4 text-primary" />
            <span>{plan.duration} দিনের পরিকল্পনা</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="size-4 text-primary" />
            <span>দৈনিক {plan.dailyMinutes} মিনিট</span>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold text-primary">{progressPct}%</p>
            <p className="text-xs text-muted-foreground">{completedItems}/{totalItems} পাঠ সম্পন্ন</p>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {plan.days.map((day) => (
          <PlanDaySection
            key={day.dayNumber}
            day={day}
            isToday={day.date === today}
            onToggleItem={markItemCompleted}
          />
        ))}
      </div>
    </div>
  )
}
