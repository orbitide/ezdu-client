'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarClock } from 'lucide-react';
import { toBangla } from '@/lib/utils';
import { getUpcomingQuiz } from '@/lib/api/quiz';
import { useAppDataStore } from '@/store/app-data.store';
import type { QuizListDto } from '@/types/api';

/**
 * Right-rail card, ported from the Orbitide reference
 * (`components/home/upcoming-model-tests-card.tsx`).
 *
 * The reference renders hardcoded `lib/mock/home.ts` data with a TODO to wire
 * the backend; this reads the live `/quizzes/upcomming/{classId}` endpoint.
 * Renders nothing when there's no upcoming test, matching the reference.
 */
export function UpcomingModelTestsCard() {
    const classId = useAppDataStore((s) => s.userSummary?.userConfig?.classId);
    const [quiz, setQuiz] = useState<QuizListDto | null>(null);

    useEffect(() => {
        if (classId == null) return;
        let cancelled = false;
        getUpcomingQuiz(String(classId))
            .then((data) => { if (!cancelled) setQuiz(data); })
            .catch(() => {});
        return () => { cancelled = true; };
    }, [classId]);

    if (!quiz) return null;

    const scheduled = quiz.scheduledAt ? new Date(quiz.scheduledAt) : null;
    const dateLabel = scheduled
        ? `${toBangla(scheduled.getDate())}/${toBangla(scheduled.getMonth() + 1)}`
        : null;

    return (
        <div className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <span className="text-sm font-semibold text-foreground">আসন্ন মডেল টেস্ট</span>
                <Link href="/model-tests" className="text-xs font-medium text-primary hover:underline">
                    সব দেখো
                </Link>
            </div>

            <div className="p-3">
                <Link
                    href={`/model-tests/${quiz.id}`}
                    className="flex items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
                >
                    <CalendarClock size={16} className="mt-0.5 shrink-0 text-primary" />
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-foreground">{quiz.title}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            {[
                                quiz.subjectName,
                                quiz.questionCount ? `${toBangla(quiz.questionCount)}টি প্রশ্ন` : null,
                                dateLabel,
                            ]
                                .filter(Boolean)
                                .join(' · ')}
                        </p>
                    </div>
                </Link>
            </div>
        </div>
    );
}
