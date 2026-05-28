'use client';

import { useState, useEffect } from 'react';
import { getMe } from '@/lib/api/users';
import { useAuthStore } from '@/store/auth.store';
import type { UserSummary } from '@/lib/api/users';

export function useMe() {
    const { isAuthenticated, setUser } = useAuthStore();
    const [data, setData] = useState<UserSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) { setLoading(false); return; }
        let cancelled = false;

        getMe()
            .then((res) => {
                if (cancelled) return;
                setData(res);
                // Sync user into auth store so it's available globally
                setUser({
                    id: res.user.id,
                    name: res.user.name,
                    email: res.user.email,
                    xp: res.stats.xp,
                    level: 1,
                    streak: res.stats.streak,
                    totalQuestions: res.stats.totalQuestions,
                    correctAnswers: res.stats.correctAnswers,
                    badges: [],
                    createdAt: res.user.createdAt,
                });
            })
            .catch(() => { if (!cancelled) setError('ডেটা লোড হয়নি'); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [isAuthenticated, setUser]);

    return { data, loading, error };
}
