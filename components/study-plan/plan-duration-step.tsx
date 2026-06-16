"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useStudyPlanStore } from "@/lib/store/study-plan-store"

const options: { value: 7 | 30; label: string; description: string }[] = [
  { value: 7, label: "৭ দিন", description: "সর্বোচ্চ ১০টি পাঠ। দ্রুত লক্ষ্যপূরণের জন্য আদর্শ।" },
  { value: 30, label: "৩০ দিন", description: "সর্বোচ্চ ৪০টি পাঠ। পূর্ণ প্রস্তুতির জন্য আদর্শ।" },
]

export function PlanDurationStep() {
  const { draft, setDraft, setStep } = useStudyPlanStore()
  const selected = draft.duration

  function pick(value: 7 | 30) {
    setDraft({ duration: value })
    setStep("budget")
  }

  const prevStep = draft.mode === "manual" ? "picker" : "mode"

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">পরিকল্পনার মেয়াদ বেছে নাও</h2>
        <p className="mt-1 text-sm text-muted-foreground">কতদিনের মধ্যে পড়া শেষ করতে চাও?</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((opt) => (
          <Card
            key={opt.value}
            onClick={() => pick(opt.value)}
            className={cn(
              "cursor-pointer transition-all hover:border-primary/60",
              selected === opt.value && "border-primary ring-1 ring-primary"
            )}
          >
            <CardContent className="py-5">
              <p className="text-2xl font-bold">{opt.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{opt.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="outline" onClick={() => setStep(prevStep)}>পেছনে</Button>
    </div>
  )
}
