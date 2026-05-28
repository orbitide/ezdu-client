'use client';

import { create } from 'zustand';
import type { UserProfile } from '@/types/user';

interface AuthStore {
    user: UserProfile | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: (user: UserProfile | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setLoading: (isLoading) => set({ isLoading }),
    logout: () => set({ user: null, isAuthenticated: false }),
}));
