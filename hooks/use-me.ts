'use client';

import { useState, useEffect } from 'react';
import { getMe } from '@/lib/api/users';
import { useAuthStore } from '@/store/auth.store';
import type { UserHomeSummaryDto } from '@/lib/api/users';

export function useMe() {
    const { isAuthenticated, setUser } = useAuthStore();
    const [data, setData] = useState<UserHomeSummaryDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isAuthenticated) { setLoading(false); return; }
        let cancelled = false;

        getMe()
            .then((res) => {
                if (cancelled) return;
                setData(res);
                setUser({
                    id: String(res.id),
                    name: res.name,
                    email: useAuthStore.getState().user?.email ?? '',
                    xp: res.totalXp,
                    level: 1,
                    streak: res.streak,
                    totalQuestions: 0,
                    correctAnswers: 0,
                    badges: [],
                    createdAt: '',
                });
            })
            .catch(() => { if (!cancelled) setError('ডেটা লোড হয়নি'); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [isAuthenticated, setUser]);

    return { data, loading, error };
}
