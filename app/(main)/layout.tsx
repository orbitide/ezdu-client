import type { ReactNode } from 'react';
import { AppSidebar } from '@/components/shared/AppSidebar';
import { AppHeader } from '@/components/shared/AppHeader';

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-zinc-950">
            <AppSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <AppHeader className="block md:hidden"/>
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
