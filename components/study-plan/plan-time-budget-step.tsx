"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useStudyPlanStore } from "@/lib/store/study-plan-store"

export function PlanTimeBudgetStep() {
  const { setDraft, setStep } = useStudyPlanStore()
  const [minutes, setMinutes] = useState(45)

  function handleNext() {
    setDraft({ dailyMinutes: minutes })
    setStep("preview")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">দৈনিক পড়ার সময় নির্ধারণ করো</h2>
        <p className="mt-1 text-sm text-muted-foreground">প্রতিদিন কত মিনিট পড়তে পারবে?</p>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <span className="text-5xl font-bold text-primary">{minutes}</span>
          <span className="ml-2 text-xl text-muted-foreground">মিনিট</span>
        </div>
        <input
          type="range"
          min={15}
          max={120}
          step={15}
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>১৫ মিনিট</span>
          <span>১২০ মিনিট</span>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          প্রতিটি কুইজে প্রায় ১৫ মিনিট লাগে — দৈনিক {Math.floor(minutes / 15)} টি পাঠ
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={() => setStep("duration")}>পেছনে</Button>
        <Button onClick={handleNext}>পরবর্তী</Button>
      </div>
    </div>
  )
}
