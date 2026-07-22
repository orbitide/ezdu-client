'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, AlertCircle } from 'lucide-react';
import { QuizEngine } from '@/features/quiz/engine/QuizEngine';
import { CongratulationResult } from '@/features/quiz/engine/resultBuilders';
import { useEngineStore } from '@/features/quiz/engine/engine.store';
import { getQuizDetails } from '@/lib/api/quiz';
import { QuizType } from '@/types/api';
import type { QuizDetailsDto } from '@/types/api';
import type { Question } from '@/types/quiz';

function toQuestions(quiz: QuizDetailsDto): Question[] {
    return quiz.questions.map((q) => ({
        id: q.id,
        text: q.text,
        options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
        explanation: q.explanation,
        subjectId: q.subjectId,
        subject: q.subjectName,
        topic: q.topicName,
        difficulty: (q.difficulty as 'easy' | 'medium' | 'hard') ?? undefined,
    }));
}

export default function QuizSessionPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const reset = useEngineStore((s) => s.reset);

    const [quiz, setQuiz] = useState<QuizDetailsDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    /** Bumped on retry to remount the engine with a fresh session. */
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let cancelled = false;
        getQuizDetails(id)
            .then((data) => { if (!cancelled) setQuiz(data); })
            .catch(() => { if (!cancelled) setError('কুইজ লোড হয়নি। আবার চেষ্টা করো।'); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [id]);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    if (error || !quiz) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-4">
                <AlertCircle size={32} className="text-rose-400" />
                <p className="text-center text-sm text-muted-foreground">{error ?? 'কুইজ পাওয়া যায়নি।'}</p>
                <button onClick={() => router.push('/model-tests')} className="text-sm text-primary hover:text-primary">
                    মডেল টেস্ট লিস্টে ফিরে যাও
                </button>
            </div>
        );
    }

    return (
        <QuizEngine
            key={attempt}
            config={{
                quizType: QuizType.Quiz,
                quizId: id,
                title: quiz.title ?? 'মডেল টেস্ট',
                timeInMinutes: quiz.duration ?? 30,
            }}
            questions={toQuestions(quiz)}
            onExit={() => { reset(); router.push('/model-tests'); }}
        >
            {(outcome) => (
                <CongratulationResult
                    outcome={outcome}
                    onReview={
                        outcome.serverResult.userQuizId
                            ? () => router.push(`/model-tests/${id}/review/${outcome.serverResult.userQuizId}`)
                            : undefined
                    }
                    onRetry={() => { reset(); setAttempt((a) => a + 1); }}
                    onHome={() => { reset(); router.push('/model-tests'); }}
                />
            )}
        </QuizEngine>
    );
}
