"use client"

import { useStudyPlanStore } from "@/lib/store/study-plan-store"
import { PlanModeStep } from "@/components/study-plan/plan-mode-step"
import { PlanLessonPicker } from "@/components/study-plan/plan-lesson-picker"
import { PlanDurationStep } from "@/components/study-plan/plan-duration-step"
import { PlanTimeBudgetStep } from "@/components/study-plan/plan-time-budget-step"
import { PlanPreviewStep } from "@/components/study-plan/plan-preview-step"

const STEP_LABELS = ["মোড", "পাঠ", "মেয়াদ", "সময়", "পূর্বরূপ"]
const STEP_ORDER = ["mode", "picker", "duration", "budget", "preview"]

export function PlanCreationWizard() {
  const step = useStudyPlanStore((s) => s.step)
  const draft = useStudyPlanStore((s) => s.draft)

  const visibleSteps =
    draft.mode === "manual"
      ? ["mode", "picker", "duration", "budget", "preview"]
      : ["mode", "duration", "budget", "preview"]

  const currentStepIdx = visibleSteps.indexOf(step)

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {visibleSteps.map((s, i) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= currentStepIdx ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {step === "mode" && <PlanModeStep />}
      {step === "picker" && <PlanLessonPicker />}
      {step === "duration" && <PlanDurationStep />}
      {step === "budget" && <PlanTimeBudgetStep />}
      {step === "preview" && <PlanPreviewStep />}
    </div>
  )
}
