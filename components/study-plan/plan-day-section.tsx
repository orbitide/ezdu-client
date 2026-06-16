"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { PlanItemRow } from "@/components/study-plan/plan-item-row"
import type { StudyPlanDay } from "@/lib/types/study-plan"

interface PlanDaySectionProps {
  day: StudyPlanDay
  isToday: boolean
  onToggleItem: (lessonId: string, dayNumber: number) => void
}

const DAY_LABELS = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি"]

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${DAY_LABELS[d.getDay()]}, ${d.getDate()} ${d.toLocaleString("bn-BD", { month: "short" })}`
}

export function PlanDaySection({ day, isToday, onToggleItem }: PlanDaySectionProps) {
  const [open, setOpen] = useState(isToday)
  const completedCount = day.items.filter((i) => i.status === "completed").length
  const allDone = completedCount === day.items.length

  return (
    <Card className={cn(isToday && "border-primary/50 shadow-sm")}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex size-8 items-center justify-center rounded-full text-xs font-bold",
              allDone
                ? "bg-green-100 text-green-700"
                : isToday
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
            )}
          >
            {day.dayNumber}
          </div>
          <div>
            <p className="text-sm font-semibold">
              {isToday ? "আজকের পরিকল্পনা" : `দিন ${day.dayNumber}`}
            </p>
            <p className="text-xs text-muted-foreground">{formatDate(day.date)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">
            {completedCount}/{day.items.length} সম্পন্ন
          </span>
          {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </div>
      </button>
      {open && (
        <CardContent className="divide-y px-4 pb-4 pt-0">
          {day.items.map((item) => (
            <PlanItemRow key={item.lessonId} item={item} onToggle={onToggleItem} />
          ))}
        </CardContent>
      )}
    </Card>
  )
}
