'use client';

import { useEffect } from 'react';
import { useAppDataStore } from '@/store/app-data.store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const preload = useAppDataStore((s) => s.preload);

    useEffect(() => {
        preload();
    }, []);

    return <>{children}</>;
}
