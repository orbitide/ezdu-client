"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type AppMode = "student" | "parent"

type AppModeStore = {
  mode: AppMode
  setMode: (mode: AppMode) => void
  toggleMode: () => void
}

export const useAppModeStore = create<AppModeStore>()(
  persist(
    (set, get) => ({
      mode: "student",
      setMode: (mode) => set({ mode }),
      toggleMode: () => set({ mode: get().mode === "student" ? "parent" : "student" }),
    }),
    { name: "ezdu_client_mode" }
  )
)
