import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { AvatarConfig } from "@/lib/types/user"
import { defaultAvatarConfig } from "@/lib/avatar/avatar-data"

interface AvatarState {
  config: AvatarConfig
  _hasHydrated: boolean
  setOption: <K extends keyof AvatarConfig>(key: K, value: AvatarConfig[K]) => void
  reset: () => void
  setHasHydrated: (value: boolean) => void
}

export const useAvatarStore = create<AvatarState>()(
  persist(
    (set) => ({
      config: defaultAvatarConfig,
      _hasHydrated: false,
      setOption: (key, value) =>
        set((state) => ({ config: { ...state.config, [key]: value } })),
      reset: () => set({ config: defaultAvatarConfig }),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: "ezdu-avatar",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
