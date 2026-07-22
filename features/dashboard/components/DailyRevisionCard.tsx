'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpenText } from 'lucide-react';
import { toBangla } from '@/lib/utils';
import { getDailyRevision } from '@/lib/api/progress';
import { useLaunchStore } from '@/features/quiz/engine/launch.store';
import { QuizType } from '@/types/api';
import type { DailyRevisionDto } from '@/types/api';

/**
 * Ported from ezdu-mobile
 * `features/daily_revision/widgets/daily_revision_home_card.dart`.
 * Renders nothing until questions are available, matching mobile.
 */
export function DailyRevisionCard() {
    const router = useRouter();
    const launch = useLaunchStore((s) => s.launch);
    const [revision, setRevision] = useState<DailyRevisionDto | null>(null);

    useEffect(() => {
        let cancelled = false;
        getDailyRevision()
            .then((data) => { if (!cancelled) setRevision(data); })
            .catch(() => {});
        return () => { cancelled = true; };
    }, []);

    const questions = revision?.questions ?? [];
    if (questions.length === 0) return null;

    const handleStart = () => {
        launch(
            {
                quizType: QuizType.Mock,
                quizId: '',
                title: 'আজকের রিভিশন',
                timeInMinutes: 15,
            },
            questions.map((q) => ({
                id: q.id,
                text: q.text,
                options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
                explanation: q.explanation,
                subjectId: q.subjectId,
                subject: q.subjectName,
                topic: q.topicName,
            })),
            '/dashboard',
        );
        router.push('/quiz/session');
    };

    return (
        <button
            onClick={handleStart}
            className="flex w-full items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted/60"
        >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/12">
                <BookOpenText size={22} className="text-primary" />
            </span>

            <span className="min-w-0 flex-1">
                <span className="block text-sm font-bold text-foreground">আজকের রিভিশন</span>
                <span className="block text-xs text-muted-foreground">
                    {toBangla(questions.length)}টি প্রশ্ন · দুর্বল পাঠ থেকে
                </span>
            </span>

            <span className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-black">
                শুরু করো
            </span>
        </button>
    );
}
