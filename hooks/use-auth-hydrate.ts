'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';

/** Call once in a root layout to hydrate auth state from localStorage. */
export function useAuthHydrate() {
    const hydrate = useAuthStore((s) => s.hydrate);
    useEffect(() => {
        hydrate();
    }, [hydrate]);
}
