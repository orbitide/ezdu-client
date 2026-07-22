import type { ReactNode } from 'react';

/**
 * Ported from the Orbitide reference (`components/layout/two-column-shell.tsx`).
 *
 * 2/3 main + 1/3 right rail on large screens; stacks on mobile with the rail
 * below the content. Width is constrained by the app shell, not here.
 */
export function TwoColumnShell({
    children,
    right,
}: {
    children: ReactNode;
    right: ReactNode;
}) {
    return (
        <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">{children}</div>
            <div className="space-y-6">{right}</div>
        </div>
    );
}
