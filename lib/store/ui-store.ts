import { create } from "zustand"
import { persist } from "zustand/middleware"

export type AppMode = "practice" | "learn"

interface UiState {
  appMode: AppMode
  setAppMode: (mode: AppMode) => void
  toggleAppMode: () => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set, get) => ({
      appMode: "practice",
      setAppMode: (mode) => set({ appMode: mode }),
      toggleAppMode: () =>
        set({ appMode: get().appMode === "practice" ? "learn" : "practice" }),
    }),
    {
      name: "ezdu-ui",
    }
  )
)
