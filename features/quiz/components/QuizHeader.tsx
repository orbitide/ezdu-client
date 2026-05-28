'use client';

import { X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizHeaderProps {
    current: number;
    total: number;
    subject: string;
    elapsed: number;
    onExit: () => void;
}

export function QuizHeader({ current, total, subject, elapsed, onExit }: QuizHeaderProps) {
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const progress = (current / total) * 100;

    return (
        <div className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-3">
                <button onClick={onExit} className="text-zinc-400 hover:text-zinc-100">
                    <X size={20} />
                </button>
                <div className="text-center">
                    <p className="text-xs text-zinc-500">{subject}</p>
                    <p className="text-sm font-semibold text-zinc-100">{current} / {total}</p>
                </div>
                <div className={cn(
                    'flex items-center gap-1.5 text-sm font-medium',
                    elapsed > 1200 ? 'text-rose-400' : 'text-zinc-400'
                )}>
                    <Clock size={14} />
                    <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
                </div>
            </div>
            <div className="h-1 w-full bg-zinc-800">
                <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
