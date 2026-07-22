'use client';

import { cn, toBangla } from '@/lib/utils';

interface QuestionIndicatorBarProps {
    currentQuestion: number;   // 1-based
    totalQuestions: number;
    answeredCount: number;
    visited: boolean[];
    skipped: boolean[];
    onSelect: (index: number) => void;
}

/** Ported from ezdu-mobile `features/quiz_engine/widgets/quiz_question_indicator_bar.dart`. */
export function QuestionIndicatorBar({
    currentQuestion,
    totalQuestions,
    answeredCount,
    visited,
    skipped,
    onSelect,
}: QuestionIndicatorBarProps) {
    return (
        <div className="border-b border-border bg-card px-4 py-3">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                    প্রশ্ন {toBangla(currentQuestion)} / {toBangla(totalQuestions)}
                </p>
                <span className="rounded-lg bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                    সম্পন্ন: {toBangla(answeredCount)}
                </span>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {Array.from({ length: totalQuestions }, (_, index) => {
                    const isAnswered = visited[index];
                    const isSkipped = skipped[index];
                    const isCurrent = index === currentQuestion - 1;

                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onSelect(index)}
                            className={cn(
                                'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-colors',
                                isCurrent
                                    ? 'border-primary bg-primary text-black'
                                    : isAnswered
                                        ? 'border-primary/40 bg-primary/20 text-primary'
                                        : isSkipped
                                            ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
                                            : 'border-border bg-muted text-muted-foreground hover:bg-muted',
                            )}
                        >
                            {toBangla(index + 1)}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
