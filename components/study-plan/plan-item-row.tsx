"use client"

import { CheckCircle2, Circle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StudyPlanItem } from "@/lib/types/study-plan"

interface PlanItemRowProps {
  item: StudyPlanItem
  onToggle: (lessonId: string, dayNumber: number) => void
}

export function PlanItemRow({ item, onToggle }: PlanItemRowProps) {
  const done = item.status === "completed"

  return (
    <button
      onClick={() => !done && onToggle(item.lessonId, item.dayNumber)}
      className={cn(
        "flex w-full items-center gap-3 py-3 text-left",
        done ? "cursor-default" : "cursor-pointer"
      )}
    >
      {done ? (
        <CheckCircle2 className="size-5 shrink-0 text-green-600" />
      ) : (
        <Circle className="size-5 shrink-0 text-muted-foreground" />
      )}
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium truncate", done && "text-muted-foreground line-through")}>
          {item.lessonName}
        </p>
        <p className="text-xs text-muted-foreground">{item.subjectName}</p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3" />
          {item.durationMinutes} মিনিট
        </span>
        <span className="text-xs text-muted-foreground">{item.lessonMasteryPercent}% দক্ষতা</span>
      </div>
    </button>
  )
}
