import { create } from "zustand"
import { persist } from "zustand/middleware"

interface OnboardingState {
  completed: boolean
  examGroup: string | null
  className: string | null
  subjects: string[]
  _hasHydrated: boolean
  setExamGroup: (examGroup: string) => void
  setClassName: (className: string) => void
  setSubjects: (subjects: string[]) => void
  complete: () => void
  reset: () => void
  setHasHydrated: (value: boolean) => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      completed: false,
      examGroup: null,
      className: null,
      subjects: [],
      _hasHydrated: false,
      setExamGroup: (examGroup) => set({ examGroup }),
      setClassName: (className) => set({ className }),
      setSubjects: (subjects) => set({ subjects }),
      complete: () => set({ completed: true }),
      reset: () =>
        set({ completed: false, examGroup: null, className: null, subjects: [] }),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: "ezdu-onboarding",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
