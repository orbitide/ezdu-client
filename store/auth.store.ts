'use client';

import { create } from 'zustand';
import type { UserProfile } from '@/types/user';

interface AuthStore {
    user: UserProfile | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (user: UserProfile) => void;
    setUser: (user: UserProfile | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
    hydrate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isLoading: true,
    isAuthenticated: false,

    login: (user) => {
        set({ user, isAuthenticated: true, isLoading: false });
    },

    setUser: (user) => set({ user, isAuthenticated: !!user }),

    setLoading: (isLoading) => set({ isLoading }),

    logout: () => {
        set({ user: null, isAuthenticated: false, isLoading: false });
    },

    hydrate: () => {
        set({ isLoading: false });
    },
}));
