'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';
import { getArchiveExamDetails } from '@/lib/api/archive';
import { QuizEngine } from '@/features/quiz/engine/QuizEngine';
import { QuizSettingsDialog } from '@/features/quiz/engine/QuizSettingsDialog';
import { CongratulationResult } from '@/features/quiz/engine/resultBuilders';
import { useEngineStore } from '@/features/quiz/engine/engine.store';
import { QuizType } from '@/types/api';
import type { ArchiveExamDto } from '@/types/api';
import type { Question } from '@/types/quiz';

function toQuizQuestion(q: ArchiveExamDto['questions'][number]): Question {
    return {
        id: String(q.id),
        text: q.name,
        passage: q.passage,
        options: (q.options ?? []).map((o) => ({
            id: String(o.id),
            text: o.name,
            isCorrect: o.isCorrect,
        })),
        explanation: q.explanation,
    };
}

export default function ArchiveQuizPage() {
    const { examId } = useParams<{ examId: string }>();
    const router = useRouter();
    const reset = useEngineStore((s) => s.reset);

    const [exam, setExam] = useState<ArchiveExamDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    /** Mobile shows the settings dialog before launching the engine. */
    const [timeInMinutes, setTimeInMinutes] = useState<number | null>(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!examId) return;
        let cancelled = false;

        getArchiveExamDetails(examId)
            .then((data) => { if (!cancelled) setExam(data); })
            .catch(() => { if (!cancelled) setError('কুইজ লোড হয়নি। আবার চেষ্টা করো।'); })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [examId]);

    const questions = exam?.questions.map(toQuizQuestion) ?? [];

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    if (error || !exam || questions.length === 0) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4">
                <AlertCircle size={32} className="text-rose-400" />
                <p className="text-center text-sm text-muted-foreground">{error ?? 'এই পরীক্ষায় কোনো প্রশ্ন নেই'}</p>
                <Link href={`/archive/${examId}`} className="text-sm text-primary hover:text-primary">
                    পরীক্ষায় ফিরে যাও
                </Link>
            </div>
        );
    }

    if (timeInMinutes == null) {
        return (
            <AnimatePresence>
                <QuizSettingsDialog
                    questionCount={questions.length}
                    onConfirm={(settings) => setTimeInMinutes(settings.timeInMinutes)}
                    onCancel={() => router.push(`/archive/${examId}`)}
                />
            </AnimatePresence>
        );
    }

    return (
        <QuizEngine
            key={attempt}
            config={{
                quizType: QuizType.Archive,
                quizId: String(exam.id),
                title: exam.name,
                timeInMinutes,
            }}
            questions={questions}
            onExit={() => { reset(); router.push(`/archive/${examId}`); }}
        >
            {(outcome) => (
                <CongratulationResult
                    outcome={outcome}
                    onRetry={() => { reset(); setAttempt((a) => a + 1); }}
                    onHome={() => { reset(); router.push('/archive'); }}
                />
            )}
        </QuizEngine>
    );
}
