'use client';

import { create } from 'zustand';
import type { UserProfile } from '@/types/user';

interface AuthStore {
    user: UserProfile | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (token: string, user: UserProfile) => void;
    setUser: (user: UserProfile | null) => void;
    setLoading: (loading: boolean) => void;
    logout: () => void;
    hydrate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,

    login: (token, user) => {
        localStorage.setItem('ez_token', token);
        // Set a readable cookie so middleware can check auth status
        document.cookie = `ez_token=${token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
        set({ user, token, isAuthenticated: true, isLoading: false });
    },

    setUser: (user) => set({ user, isAuthenticated: !!user }),

    setLoading: (isLoading) => set({ isLoading }),

    logout: () => {
        localStorage.removeItem('ez_token');
        document.cookie = 'ez_token=; path=/; max-age=0';
        set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    },

    hydrate: () => {
        const token = localStorage.getItem('ez_token');
        if (token) {
            set({ token, isAuthenticated: true, isLoading: false });
        } else {
            set({ isLoading: false });
        }
    },
}));
