'use client';

import { CongratulationsScreen } from '../components/CongratulationsScreen';
import { PresetResultScreen } from './PresetResultScreen';
import type { QuizEngineOutcome } from './types';

/**
 * Ported from ezdu-mobile `features/quiz_engine/builders/result_builders.dart`.
 * Adapts a `QuizEngineOutcome` onto the existing web result screens so every
 * entry point shows the same result UI mobile does.
 */

interface CongratulationResultProps {
    outcome: QuizEngineOutcome;
    onRetry: () => void;
    onHome: () => void;
    onReview?: () => void;
}

export function CongratulationResult({ outcome, onRetry, onHome, onReview }: CongratulationResultProps) {
    const { serverResult, perQuestion, correctCount, wrongCount, unansweredCount, durationSeconds } = outcome;

    // Prefer the server's tallies (mobile does the same); fall back to local
    // counts when the server response is sparse.
    const total = serverResult.totalQuestions || perQuestion.length;
    const correct = serverResult.correctAnswer || correctCount;
    const accuracy = serverResult.percentage || (total > 0 ? Math.round((correct / total) * 100) : 0);

    return (
        <CongratulationsScreen
            result={{
                sessionId: serverResult.userQuizId ?? '',
                total,
                correct,
                incorrect: wrongCount,
                skipped: unansweredCount,
                timeTaken: durationSeconds,
                xpEarned: serverResult.earnedXp,
                accuracy: Math.round(accuracy),
            }}
            serverResult={serverResult}
            onRetry={onRetry}
            onHome={onHome}
            onReview={onReview}
        />
    );
}

interface PresetResultProps {
    outcome: QuizEngineOutcome;
    onHome: () => void;
}

export function PresetResult({ outcome, onHome }: PresetResultProps) {
    return (
        <PresetResultScreen
            title={outcome.title}
            score={outcome.scoreWithNegativeMarks}
            correct={outcome.correctCount}
            wrong={outcome.wrongCount}
            unanswered={outcome.unansweredCount}
            total={outcome.perQuestion.length}
            outcomes={outcome.perQuestion}
            onHome={onHome}
        />
    );
}
