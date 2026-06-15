import { create } from "zustand"
import { persist } from "zustand/middleware"

interface VocabularyState {
  bookmarkedIds: string[]
  masteryByWordId: Record<string, number>
  toggleBookmark: (wordId: string) => void
  isBookmarked: (wordId: string) => boolean
  getMastery: (wordId: string) => number
  recordAttempt: (wordId: string, correct: boolean) => void
}

const MASTERY_STEP = 0.2

export const useVocabularyStore = create<VocabularyState>()(
  persist(
    (set, get) => ({
      bookmarkedIds: [],
      masteryByWordId: {},
      toggleBookmark: (wordId) =>
        set((state) => ({
          bookmarkedIds: state.bookmarkedIds.includes(wordId)
            ? state.bookmarkedIds.filter((id) => id !== wordId)
            : [...state.bookmarkedIds, wordId],
        })),
      isBookmarked: (wordId) => get().bookmarkedIds.includes(wordId),
      getMastery: (wordId) => get().masteryByWordId[wordId] ?? 0,
      recordAttempt: (wordId, correct) =>
        set((state) => {
          const current = state.masteryByWordId[wordId] ?? 0
          const next = correct
            ? Math.min(1, current + MASTERY_STEP)
            : Math.max(0, current - MASTERY_STEP)
          return { masteryByWordId: { ...state.masteryByWordId, [wordId]: next } }
        }),
    }),
    {
      name: "ezdu-vocabulary",
    }
  )
)
