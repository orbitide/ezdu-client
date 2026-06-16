"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, CheckCircle2 } from "lucide-react"
import { useStudyPlanStore } from "@/lib/store/study-plan-store"
import { mockStudyPlan } from "@/lib/mock/study-plan"

export function PlanPreviewStep() {
  const router = useRouter()
  const { draft, setPlan, setStep, resetDraft } = useStudyPlanStore()

  const previewPlan = {
    ...mockStudyPlan,
    mode: draft.mode ?? "auto",
    duration: draft.duration ?? 7,
    dailyMinutes: draft.dailyMinutes ?? 45,
    days: mockStudyPlan.days.slice(0, draft.duration ?? 7),
  } as typeof mockStudyPlan

  function confirmPlan() {
    setPlan(previewPlan)
    resetDraft()
    router.push("/study-plan/active")
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">পরিকল্পনার পূর্বরূপ</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {previewPlan.duration} দিনের পরিকল্পনা · দৈনিক {previewPlan.dailyMinutes} মিনিট
        </p>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
        {previewPlan.days.map((day) => (
          <Card key={day.dayNumber}>
            <CardContent className="py-3">
              <p className="mb-2 text-sm font-semibold">দিন {day.dayNumber}</p>
              <div className="space-y-1">
                {day.items.map((item) => (
                  <div key={item.lessonId} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-3.5 shrink-0 text-muted-foreground" />
                    <span>{item.subjectName} — {item.lessonName}</span>
                    <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />{item.durationMinutes}মি
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep("budget")}>পেছনে</Button>
        <Button onClick={confirmPlan}>পরিকল্পনা চালু করো</Button>
      </div>
    </div>
  )
}
