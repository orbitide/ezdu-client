'use client';

import { Bell, Flame, Zap } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { cn } from "@/lib/utils";

interface AppHeaderProps {
    title?: string;
    className?: string;
}

export function AppHeader({title, className}: AppHeaderProps) {
    const user = useAuthStore((s) => s.user);

    const streak = user?.streak ?? 0;
    const xp = user?.xp ?? 0;

    return (
        <header
            className={cn("flex h-14 items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-4 backdrop-blur-sm lg:px-6", className)}>
            <div className="flex items-center gap-3">
                {title && (
                    <h1 className="text-sm font-semibold text-zinc-100 lg:text-base">{title}</h1>
                )}
            </div>

            <div className="flex items-center gap-3">
                {streak > 0 && (
                    <div
                        className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-400">
                        <Flame size={12}/>
                        <span>{streak}</span>
                    </div>
                )}
                <div
                    className="flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-400">
                    <Zap size={12}/>
                    <span>{xp.toLocaleString()} XP</span>
                </div>
                <button className="relative text-zinc-400 hover:text-zinc-100">
                    <Bell size={20}/>
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500"/>
                </button>
            </div>
        </header>
    );
}
