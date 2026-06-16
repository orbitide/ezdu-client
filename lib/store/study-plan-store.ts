import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { StudyPlan, StudyPlanMode, LessonOption } from "@/lib/types/study-plan"

export type StudyPlanStep =
  | "landing"
  | "mode"
  | "picker"
  | "duration"
  | "budget"
  | "preview"
  | "active"

interface StudyPlanDraft {
  mode: StudyPlanMode
  duration: 7 | 30
  dailyMinutes: number
  pickedLessons: LessonOption[]
}

interface StudyPlanState {
  plan: StudyPlan | null
  draft: Partial<StudyPlanDraft>
  step: StudyPlanStep

  setPlan: (plan: StudyPlan) => void
  clearPlan: () => void
  setStep: (step: StudyPlanStep) => void
  setDraft: (patch: Partial<StudyPlanDraft>) => void
  resetDraft: () => void
  markItemCompleted: (lessonId: string, dayNumber: number) => void
}

export const useStudyPlanStore = create<StudyPlanState>()(
  persist(
    (set) => ({
      plan: null,
      draft: {},
      step: "landing",

      setPlan: (plan) => set({ plan, step: "active" }),
      clearPlan: () => set({ plan: null, step: "landing" }),
      setStep: (step) => set({ step }),
      setDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
      resetDraft: () => set({ draft: {} }),

      markItemCompleted: (lessonId, dayNumber) =>
        set((s) => {
          if (!s.plan) return s
          return {
            plan: {
              ...s.plan,
              days: s.plan.days.map((day) => {
                if (day.dayNumber !== dayNumber) return day
                return {
                  ...day,
                  items: day.items.map((item) =>
                    item.lessonId === lessonId ? { ...item, status: "completed" as const } : item
                  ),
                }
              }),
            },
          }
        }),
    }),
    { name: "ezdu-study-plan" }
  )
)
