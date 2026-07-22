'use client';

import { X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizHeaderProps {
    current: number;
    total: number;
    subject: string;
    elapsed: number;
    onExit: () => void;
    countdown?: boolean;      // when true, display timeRemaining as MM:SS countdown
    timeRemaining?: number;   // seconds remaining (used when countdown=true)
}

export function QuizHeader({ current, total, subject, elapsed, onExit, countdown = false, timeRemaining = 0 }: QuizHeaderProps) {
    const displaySeconds = countdown ? timeRemaining : elapsed;
    const minutes = Math.floor(displaySeconds / 60);
    const seconds = displaySeconds % 60;
    const progress = (current / total) * 100;
    const isLowTime = countdown && timeRemaining <= 300;

    return (
        <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
            <div className="flex items-center justify-between px-4 py-3">
                <button onClick={onExit} className="text-muted-foreground hover:text-foreground">
                    <X size={20} />
                </button>
                <div className="text-center">
                    <p className="text-xs text-muted-foreground">{subject}</p>
                    <p className="text-sm font-semibold text-foreground">{current} / {total}</p>
                </div>
                <div className={cn(
                    'flex items-center gap-1.5 text-sm font-medium font-mono',
                    isLowTime ? 'text-red-400' : elapsed > 1200 && !countdown ? 'text-rose-400' : 'text-muted-foreground'
                )}>
                    <Clock size={14} />
                    <span>{minutes}:{seconds.toString().padStart(2, '0')}</span>
                </div>
            </div>
            <div className="h-1 w-full bg-muted">
                <div
                    className={cn('h-full transition-all duration-300', isLowTime ? 'bg-red-500' : 'bg-primary')}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}
