import { create } from "zustand"
import type { QuizAnswer } from "@/lib/types/quiz"

interface QuizState {
  quizId: string | null
  questionIds: string[]
  currentIndex: number
  answers: Record<string, QuizAnswer>
  startedAt: number | null
  start: (quizId: string, questionIds: string[]) => void
  setAnswer: (questionId: string, selectedIndex: number | null) => void
  toggleFlag: (questionId: string) => void
  goTo: (index: number) => void
  next: () => void
  prev: () => void
  reset: () => void
}

function emptyAnswer(questionId: string): QuizAnswer {
  return { questionId, selectedIndex: null, flagged: false }
}

export const useQuizStore = create<QuizState>((set, get) => ({
  quizId: null,
  questionIds: [],
  currentIndex: 0,
  answers: {},
  startedAt: null,

  start: (quizId, questionIds) => {
    const answers: Record<string, QuizAnswer> = {}
    for (const id of questionIds) {
      answers[id] = emptyAnswer(id)
    }
    set({ quizId, questionIds, currentIndex: 0, answers, startedAt: Date.now() })
  },

  setAnswer: (questionId, selectedIndex) => {
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: { ...(state.answers[questionId] ?? emptyAnswer(questionId)), selectedIndex },
      },
    }))
  },

  toggleFlag: (questionId) => {
    set((state) => {
      const current = state.answers[questionId] ?? emptyAnswer(questionId)
      return {
        answers: {
          ...state.answers,
          [questionId]: { ...current, flagged: !current.flagged },
        },
      }
    })
  },

  goTo: (index) => {
    const { questionIds } = get()
    if (index >= 0 && index < questionIds.length) {
      set({ currentIndex: index })
    }
  },

  next: () => {
    const { currentIndex, questionIds } = get()
    if (currentIndex < questionIds.length - 1) {
      set({ currentIndex: currentIndex + 1 })
    }
  },

  prev: () => {
    const { currentIndex } = get()
    if (currentIndex > 0) {
      set({ currentIndex: currentIndex - 1 })
    }
  },

  reset: () => {
    set({ quizId: null, questionIds: [], currentIndex: 0, answers: {}, startedAt: null })
  },
}))
