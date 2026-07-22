import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Standard width + padding for content routes.
 *
 * The Orbitide reference puts `max-w-5xl` directly in its AppShell, but our
 * immersive routes (quiz engine, challenge/mock sessions, vocabulary games)
 * manage their own full-height scroll containers, so a shell-level wrapper
 * would break them. Content pages opt in via this component instead; the
 * result is the same consistent column width on every non-immersive route.
 */
export function PageContainer({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={cn('mx-auto w-full max-w-5xl px-4 py-6 lg:px-6', className)}>
            {children}
        </div>
    );
}
