import { create } from "zustand"
import { persist } from "zustand/middleware"

interface LearningState {
  completedLessonIds: string[]
  enrolledCourseIds: string[]
  _hasHydrated: boolean
  markLessonComplete: (lessonId: string) => void
  isLessonComplete: (lessonId: string) => boolean
  enrollCourse: (courseId: string) => void
  isEnrolled: (courseId: string) => boolean
  setHasHydrated: (value: boolean) => void
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set, get) => ({
      completedLessonIds: [],
      enrolledCourseIds: [],
      _hasHydrated: false,
      markLessonComplete: (lessonId) =>
        set((state) =>
          state.completedLessonIds.includes(lessonId)
            ? state
            : { completedLessonIds: [...state.completedLessonIds, lessonId] }
        ),
      isLessonComplete: (lessonId) => get().completedLessonIds.includes(lessonId),
      enrollCourse: (courseId) =>
        set((state) =>
          state.enrolledCourseIds.includes(courseId)
            ? state
            : { enrolledCourseIds: [...state.enrolledCourseIds, courseId] }
        ),
      isEnrolled: (courseId) => get().enrolledCourseIds.includes(courseId),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: "ezdu-learning",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
