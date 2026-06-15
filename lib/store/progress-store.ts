import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ProgressSummary } from "@/lib/types/user"

interface ProgressState extends ProgressSummary {
  addCoins: (amount: number) => void
  addXp: (amount: number) => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      coins: 1240,
      xp: 3680,
      level: 12,
      streakDays: 7,
      rankTier: "adept",
      isPremium: false,
      addCoins: (amount) => set((s) => ({ coins: s.coins + amount })),
      addXp: (amount) => set((s) => ({ xp: s.xp + amount })),
    }),
    {
      name: "ezdu-progress",
    }
  )
)
