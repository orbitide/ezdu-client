import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/lib/types/user"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  _hasHydrated: boolean
  login: (user: User) => void
  logout: () => void
  updateAvatar: (avatar: User["avatar"]) => void
  setHasHydrated: (value: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      _hasHydrated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateAvatar: (avatar) =>
        set((state) => ({ user: state.user ? { ...state.user, avatar } : null })),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: "ezdu-auth",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
