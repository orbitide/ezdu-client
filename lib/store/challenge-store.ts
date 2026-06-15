import { create } from "zustand"
import type { ChallengeStatus } from "@/lib/types/challenge"

interface ChallengeState {
  topicId: string | null
  questionIds: string[]
  currentIndex: number
  status: ChallengeStatus
  wrongOptionIndexes: number[]
  hasGuessedWronglyThisQuestion: boolean
  streak: number
  maxStreak: number
  everGuessedWrong: boolean
  startedAt: number | null

  start: (topicId: string, questionIds: string[]) => void
  selectOption: (index: number, correctIndex: number) => void
  nextQuestion: () => void
  reset: () => void
}

export const useChallengeStore = create<ChallengeState>((set, get) => ({
  topicId: null,
  questionIds: [],
  currentIndex: 0,
  status: "idle",
  wrongOptionIndexes: [],
  hasGuessedWronglyThisQuestion: false,
  streak: 0,
  maxStreak: 0,
  everGuessedWrong: false,
  startedAt: null,

  start: (topicId, questionIds) => {
    set({
      topicId,
      questionIds,
      currentIndex: 0,
      status: "idle",
      wrongOptionIndexes: [],
      hasGuessedWronglyThisQuestion: false,
      streak: 0,
      maxStreak: 0,
      everGuessedWrong: false,
      startedAt: Date.now(),
    })
  },

  selectOption: (index, correctIndex) => {
    const state = get()
    if (state.status === "correct" || state.wrongOptionIndexes.includes(index)) {
      return
    }

    if (index === correctIndex) {
      const isFirstTry = !state.hasGuessedWronglyThisQuestion
      const newStreak = isFirstTry ? state.streak + 1 : state.streak
      const newMaxStreak = Math.max(newStreak, state.maxStreak)
      set({ status: "correct", streak: newStreak, maxStreak: newMaxStreak })
    } else {
      set({
        status: "wrong",
        wrongOptionIndexes: [...state.wrongOptionIndexes, index],
        hasGuessedWronglyThisQuestion: true,
        everGuessedWrong: true,
        streak: 0,
      })
    }
  },

  nextQuestion: () => {
    const { currentIndex, questionIds } = get()
    if (currentIndex >= questionIds.length - 1) {
      set({ status: "finished" })
      return
    }
    set({
      currentIndex: currentIndex + 1,
      status: "idle",
      wrongOptionIndexes: [],
      hasGuessedWronglyThisQuestion: false,
    })
  },

  reset: () => {
    set({
      topicId: null,
      questionIds: [],
      currentIndex: 0,
      status: "idle",
      wrongOptionIndexes: [],
      hasGuessedWronglyThisQuestion: false,
      streak: 0,
      maxStreak: 0,
      everGuessedWrong: false,
      startedAt: null,
    })
  },
}))
