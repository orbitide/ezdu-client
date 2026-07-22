import type { Question } from '@/types/quiz';
import type { QuizTypeValue, UserQuizResultDto } from '@/types/api';

/**
 * Ported from ezdu-mobile `features/quiz_engine/models/quiz_engine_config.dart`.
 *
 * Mobile's `requireAdForFreeUsers` is intentionally omitted — it gates a
 * `RewardedAdManager` (core/utils/ad_helper.dart) that has no web counterpart.
 * On web every quiz starts immediately.
 */
export type QuizLayout = 'perQuestion' | 'allInList';
export type AnswerMode = 'editable' | 'lockOnce';

export interface QuizEngineConfig {
    quizType: QuizTypeValue;
    quizId: string;
    title: string;
    timeInMinutes: number;
    layout?: QuizLayout;
    answerMode?: AnswerMode;
    negativeMarkValue?: number;
    showInfoBar?: boolean;
}

/** Resolved config — defaults applied, matching the Dart constructor defaults. */
export type ResolvedQuizEngineConfig = Required<QuizEngineConfig>;

export function resolveConfig(config: QuizEngineConfig): ResolvedQuizEngineConfig {
    return {
        layout: 'perQuestion',
        answerMode: 'editable',
        negativeMarkValue: 0,
        showInfoBar: false,
        ...config,
    };
}

/** Ported from `features/preset/models/preset_question_outcome.dart`. */
export interface PerQuestionOutcome {
    question: Question;
    selectedOptionId?: string;
    correctOptionId?: string;
    isCorrect: boolean;
}

export function isWrong(o: PerQuestionOutcome): boolean {
    return o.selectedOptionId != null && !o.isCorrect;
}

export function isUnanswered(o: PerQuestionOutcome): boolean {
    return o.selectedOptionId == null;
}

/** Ported from `features/quiz_engine/models/quiz_engine_outcome.dart`. */
export interface QuizEngineOutcome {
    serverResult: UserQuizResultDto;
    durationSeconds: number;
    title: string;
    quizType: QuizTypeValue;
    perQuestion: PerQuestionOutcome[];
    correctCount: number;
    wrongCount: number;
    unansweredCount: number;
    scoreWithNegativeMarks: number;
}

/** Ported from `features/quiz_engine/models/quiz_play_settings.dart`. */
export interface QuizPlaySettings {
    timeInMinutes: number;
    enableNegativeMarking: boolean;
    negativeMarkValue: number;
    /** Maximum number of questions to use. Undefined means use all available. */
    maxQuestions?: number;
}

export const EMPTY_RESULT: UserQuizResultDto = {
    totalXp: 0,
    earnedXp: 0,
    totalQuestions: 0,
    correctAnswer: 0,
    percentage: 0,
    streak: 0,
};
