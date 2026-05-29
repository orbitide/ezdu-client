'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDataStore } from '@/store/app-data.store';
import { setRouter } from '@/lib/navigation';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const preload = useAppDataStore((s) => s.preload);
    const isPreloaded = useAppDataStore((s) => s.isPreloaded);
    const router = useRouter();

    useEffect(() => {
        setRouter(router);
    }, [router]);

    // Trigger preload whenever isPreloaded becomes false — covers both initial mount
    // and post-login reset() calls from LoginForm.
    useEffect(() => {
        if (!isPreloaded) preload();
    }, [isPreloaded]);

    return <>{children}</>;
}
