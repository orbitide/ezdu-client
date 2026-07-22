'use client';

import Link from 'next/link';
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
    const coin = user?.coin ?? 0;

    return (
        <header
            className={cn("flex h-14 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-sm lg:px-6", className)}>
            <div className="flex items-center gap-3">
                {title && (
                    <h1 className="text-sm font-semibold text-foreground lg:text-base">{title}</h1>
                )}
            </div>

            <div className="flex items-center gap-2">
                {streak > 0 && (
                    <div className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-400">
                        <Flame size={12}/>
                        <span>{streak}</span>
                    </div>
                )}
                <div className="flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-400">
                    <Zap size={12}/>
                    <span>{xp.toLocaleString()} XP</span>
                </div>
                <Link
                    href="/shop"
                    className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400 hover:bg-amber-500/20 transition-colors"
                >
                    <span className="text-xs">🪙</span>
                    <span>{coin}</span>
                </Link>
                <button className="relative text-muted-foreground hover:text-foreground">
                    <Bell size={20}/>
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary"/>
                </button>
            </div>
        </header>
    );
}
