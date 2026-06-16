"use client"

import { useState } from "react"
import { CheckSquare, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useStudyPlanStore } from "@/lib/store/study-plan-store"
import { availableLessons } from "@/lib/mock/study-plan"
import type { LessonOption } from "@/lib/types/study-plan"

export function PlanLessonPicker() {
  const { setDraft, setStep } = useStudyPlanStore()
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const bySubject = availableLessons.reduce<Record<string, LessonOption[]>>((acc, l) => {
    if (!acc[l.subjectName]) acc[l.subjectName] = []
    acc[l.subjectName].push(l)
    return acc
  }, {})

  function toggle(lessonId: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(lessonId) ? next.delete(lessonId) : next.add(lessonId)
      return next
    })
  }

  function handleNext() {
    const picks = availableLessons.filter((l) => selected.has(l.lessonId))
    setDraft({ pickedLessons: picks })
    setStep("duration")
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">পাঠ বেছে নাও</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          যে পাঠগুলো অনুশীলন করতে চাও সেগুলো চিহ্নিত করো। ({selected.size} টি বাছাই হয়েছে)
        </p>
      </div>

      <div className="space-y-5">
        {Object.entries(bySubject).map(([subject, lessons]) => (
          <div key={subject}>
            <p className="mb-2 text-sm font-semibold text-muted-foreground">{subject}</p>
            <div className="space-y-1">
              {lessons.map((lesson) => {
                const checked = selected.has(lesson.lessonId)
                return (
                  <button
                    key={lesson.lessonId}
                    onClick={() => toggle(lesson.lessonId)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-colors",
                      checked ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                    )}
                  >
                    {checked ? (
                      <CheckSquare className="size-4 shrink-0 text-primary" />
                    ) : (
                      <Square className="size-4 shrink-0 text-muted-foreground" />
                    )}
                    <span className="flex-1 text-sm">{lesson.lessonName}</span>
                    <span className="text-xs text-muted-foreground">{lesson.masteryPercent}%</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep("mode")}>পেছনে</Button>
        <Button onClick={handleNext} disabled={selected.size === 0}>
          পরবর্তী ({selected.size} পাঠ)
        </Button>
      </div>
    </div>
  )
}
