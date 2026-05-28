'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QuizHeader } from '@/features/quiz/components/QuizHeader';
import { QuestionCard } from '@/features/quiz/components/QuestionCard';
import { ResultScreen } from '@/features/quiz/components/ResultScreen';
import { useQuizStore } from '@/features/quiz/quiz.store';
import { DUMMY_QUESTIONS, DUMMY_QUIZ_LIST } from '@/features/quiz/types';

export default function QuizSessionPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { session, result, startQuiz, answerQuestion, nextQuestion, prevQuestion, finishQuiz, resetQuiz } = useQuizStore();
    const [elapsed, setElapsed] = useState(0);

    const quiz = DUMMY_QUIZ_LIST.find((q) => q.id === id);

    useEffect(() => {
        if (!session) {
            startQuiz(quiz?.examId ?? 'ssc', DUMMY_QUESTIONS, quiz?.timeLimit);
        }
    }, []);

    // Timer
    useEffect(() => {
        if (!session || session.status !== 'active') return;
        const interval = setInterval(() => setElapsed((p) => p + 1), 1000);
        return () => clearInterval(interval);
    }, [session?.status]);

    if (result) {
        return (
            <ResultScreen
                result={result}
                onRetry={() => {
                    resetQuiz();
                    startQuiz(quiz?.examId ?? 'ssc', DUMMY_QUESTIONS, quiz?.timeLimit);
                    setElapsed(0);
                }}
            />
        );
    }

    if (!session) return null;

    const question = session.questions[session.currentIndex];
    const currentNumber = session.currentIndex + 1;

    return (
        <div className="flex flex-col min-h-full">
            <QuizHeader
                current={currentNumber}
                total={session.questions.length}
                subject={quiz?.subject ?? 'কুইজ'}
                elapsed={elapsed}
                onExit={() => router.push('/quiz')}
            />
            <QuestionCard
                question={question}
                index={currentNumber}
                total={session.questions.length}
                selectedAnswer={session.answers[question.id]}
                onAnswer={(optId) => answerQuestion(question.id, optId)}
                onNext={nextQuestion}
                onPrev={prevQuestion}
                isLast={session.currentIndex === session.questions.length - 1}
                onFinish={finishQuiz}
            />
        </div>
    );
}
