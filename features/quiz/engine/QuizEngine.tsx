'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Clock, Lock, MinusCircle, FileQuestion, Loader2, X } from 'lucide-react';
import { cn, toBangla } from '@/lib/utils';
import { MathText } from '@/components/ui/math-text';
import { submitUserQuiz } from '@/lib/api/quiz';
import { useAppDataStore } from '@/store/app-data.store';
import type { Question } from '@/types/quiz';
import { OptionButton } from '../components/OptionButton';
import { ReportModal } from '../components/ReportModal';
import { useBookmarkStore } from '../bookmark.store';
import { QuestionIndicatorBar } from './QuestionIndicatorBar';
import { useEngineStore, tallyOutcome } from './engine.store';
import { EMPTY_RESULT, type QuizEngineConfig, type QuizEngineOutcome } from './types';

interface QuizEngineProps {
    config: QuizEngineConfig;
    questions: Question[];
    /** Rendered once the quiz is submitted — mobile's `config.resultBuilder`. */
    children: (outcome: QuizEngineOutcome) => React.ReactNode;
    /** Invoked when the user backs out before submitting. */
    onExit: () => void;
}

/**
 * The single quiz engine, ported from ezdu-mobile
 * `features/quiz_engine/pages/quiz_engine_page.dart`.
 *
 * Every quiz entry point (model test, mock test, archive, study plan, mistakes,
 * daily revision) renders this rather than reimplementing quiz mechanics.
 */
export function QuizEngine({ config, questions, children, onExit }: QuizEngineProps) {
    const {
        config: activeConfig,
        questions: activeQuestions,
        currentIndex,
        answers,
        visited,
        skipped,
        remainingSeconds,
        submitted,
        start,
        selectOption,
        goTo,
        next,
        prev,
        skip,
        tick,
        markSubmitted,
        computePerQuestionOutcome,
        durationSeconds,
    } = useEngineStore();

    const refreshUser = useAppDataStore((s) => s.refreshUser);
    const loadBookmarks = useBookmarkStore((s) => s.loadBookmarks);

    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [outcome, setOutcome] = useState<QuizEngineOutcome | null>(null);
    const [reportQuestionId, setReportQuestionId] = useState<string | null>(null);
    const [confirmExit, setConfirmExit] = useState(false);

    // Guards against the timer firing a second submit while one is in flight.
    const submitLock = useRef(false);

    // ── Start / resume ────────────────────────────────────────────────────────
    // Resume only when the persisted session is the same quiz and still unsubmitted.
    useEffect(() => {
        const sameQuiz =
            activeConfig?.quizId === config.quizId &&
            activeConfig?.quizType === config.quizType &&
            activeQuestions.length === questions.length;

        if (!sameQuiz || submitted) {
            start(config, questions);
        }
        loadBookmarks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Submission ────────────────────────────────────────────────────────────
    const doSubmit = useCallback(async () => {
        if (submitLock.current) return;
        submitLock.current = true;
        setSubmitting(true);
        setSubmitError(null);

        const state = useEngineStore.getState();
        const cfg = state.config;
        if (!cfg) return;

        // Mobile sends an entry for every question; unanswered ones carry an empty opId.
        const submissions = state.questions.map((q) => ({
            qId: q.id,
            opId: state.answers[q.id] ?? '',
        }));

        const perQuestion = computePerQuestionOutcome();
        const tally = tallyOutcome(perQuestion, cfg.negativeMarkValue);

        try {
            const serverResult = await submitUserQuiz({
                quizType: cfg.quizType,
                quizId: cfg.quizId,
                subjectId: state.questions[0]?.subjectId ?? '',
                durationSeconds: durationSeconds(),
                submissions,
                lessonId: cfg.quizId,
            });

            await refreshUser();

            markSubmitted();
            setOutcome({
                serverResult: serverResult ?? EMPTY_RESULT,
                durationSeconds: durationSeconds(),
                title: cfg.title,
                quizType: cfg.quizType,
                perQuestion,
                ...tally,
            });
        } catch {
            submitLock.current = false;
            setSubmitError('কুইজ জমা দেওয়া ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setSubmitting(false);
        }
    }, [computePerQuestionOutcome, durationSeconds, markSubmitted, refreshUser]);

    // ── Countdown ─────────────────────────────────────────────────────────────
    useEffect(() => {
        if (outcome || submitting || !activeConfig) return;
        if (remainingSeconds <= 0) {
            void doSubmit();
            return;
        }
        const id = setTimeout(tick, 1000);
        return () => clearTimeout(id);
    }, [remainingSeconds, outcome, submitting, activeConfig, tick, doSubmit]);

    // ── Result ────────────────────────────────────────────────────────────────
    if (outcome) return <>{children(outcome)}</>;

    if (!activeConfig || activeQuestions.length === 0) {
        return (
            <div className="flex min-h-dvh items-center justify-center bg-background">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    const total = activeQuestions.length;
    const answeredCount = Object.keys(answers).length;
    const isLowTime = remainingSeconds <= 300;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const isLast = currentIndex === total - 1;

    const timeLabel = `${toBangla(String(minutes).padStart(2, '0'))}:${toBangla(String(seconds).padStart(2, '0'))}`;

    const handleSelect = (question: Question, optionId: string) => {
        selectOption(question.id, optionId);
    };

    // ── Chrome ────────────────────────────────────────────────────────────────
    const header = (
        <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
                <button
                    onClick={() => setConfirmExit(true)}
                    className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="বন্ধ করো"
                >
                    <X size={20} />
                </button>
                <p className="min-w-0 flex-1 truncate text-center text-sm font-semibold text-foreground">
                    {activeConfig.title}
                </p>
                <div
                    className={cn(
                        'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-bold',
                        isLowTime
                            ? 'border-red-500 bg-red-500/15 text-red-400'
                            : 'border-amber-500 bg-amber-500/15 text-amber-400',
                    )}
                >
                    <Clock size={14} />
                    <span>{timeLabel}</span>
                </div>
            </div>

            {activeConfig.showInfoBar && (
                <div className="flex items-center gap-4 overflow-x-auto border-t border-border bg-card px-4 py-1.5">
                    {activeConfig.negativeMarkValue > 0 && (
                        <InfoChip icon={<MinusCircle size={13} />} label={`নেতিবাচক: -${toBangla(activeConfig.negativeMarkValue)}`} />
                    )}
                    {activeConfig.answerMode === 'lockOnce' && (
                        <InfoChip icon={<Lock size={13} />} label="উত্তর পরিবর্তন অযোগ্য" />
                    )}
                    <InfoChip icon={<FileQuestion size={13} />} label={`${toBangla(total)}টি প্রশ্ন`} />
                </div>
            )}
        </div>
    );

    const errorBanner = submitError && (
        <div className="mx-4 mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {submitError}
        </div>
    );

    // ── Body: allInList ───────────────────────────────────────────────────────
    if (activeConfig.layout === 'allInList') {
        return (
            <div className="flex min-h-dvh flex-col bg-background">
                {header}
                {errorBanner}
                <div className="mx-auto w-full max-w-2xl flex-1 space-y-6 px-4 py-6">
                    {activeQuestions.map((q, i) => (
                        <QuestionBlock
                            key={q.id}
                            question={q}
                            index={i + 1}
                            selectedAnswer={answers[q.id]}
                            locked={activeConfig.answerMode === 'lockOnce' && answers[q.id] !== undefined}
                            onSelect={(optId) => handleSelect(q, optId)}
                            onReport={() => setReportQuestionId(q.id)}
                        />
                    ))}

                    <button
                        onClick={() => void doSubmit()}
                        disabled={submitting}
                        className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-black transition-colors hover:bg-primary disabled:opacity-50"
                    >
                        {submitting ? 'জমা হচ্ছে...' : 'জমা দাও'}
                    </button>
                </div>

                <ReportModal open={reportQuestionId != null} onClose={() => setReportQuestionId(null)} questionId={reportQuestionId ?? ''} />
                {confirmExit && <ExitDialog onCancel={() => setConfirmExit(false)} onConfirm={onExit} />}
            </div>
        );
    }

    // ── Body: perQuestion ─────────────────────────────────────────────────────
    const question = activeQuestions[currentIndex];

    return (
        <div className="flex min-h-dvh flex-col bg-background">
            {header}

            <QuestionIndicatorBar
                currentQuestion={currentIndex + 1}
                totalQuestions={total}
                answeredCount={answeredCount}
                visited={visited}
                skipped={skipped}
                onSelect={goTo}
            />

            {errorBanner}

            <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-6">
                <QuestionBlock
                    question={question}
                    index={currentIndex + 1}
                    selectedAnswer={answers[question.id]}
                    locked={activeConfig.answerMode === 'lockOnce' && answers[question.id] !== undefined}
                    onSelect={(optId) => handleSelect(question, optId)}
                    onReport={() => setReportQuestionId(question.id)}
                />
            </div>

            {/* Bottom bar */}
            <div className="sticky bottom-0 flex items-center gap-3 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-sm">
                <button
                    onClick={prev}
                    disabled={currentIndex === 0}
                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-30"
                >
                    আগে
                </button>

                <button
                    onClick={skip}
                    disabled={isLast}
                    className="rounded-lg px-4 py-2.5 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-500/10 disabled:opacity-30"
                >
                    বাদ দাও
                </button>

                <div className="flex-1" />

                {isLast ? (
                    <button
                        onClick={() => void doSubmit()}
                        disabled={submitting}
                        className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-black transition-colors hover:bg-primary disabled:opacity-50"
                    >
                        {submitting ? 'জমা হচ্ছে...' : 'জমা দাও'}
                    </button>
                ) : (
                    <button
                        onClick={next}
                        className="rounded-lg bg-muted px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                        পরের প্রশ্ন
                    </button>
                )}
            </div>

            <ReportModal open={reportQuestionId != null} onClose={() => setReportQuestionId(null)} questionId={reportQuestionId ?? ''} />
            {confirmExit && <ExitDialog onCancel={() => setConfirmExit(false)} onConfirm={onExit} />}
        </div>
    );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function InfoChip({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
            {icon}
            {label}
        </span>
    );
}

function QuestionBlock({
    question,
    index,
    selectedAnswer,
    locked,
    onSelect,
    onReport,
}: {
    question: Question;
    index: number;
    selectedAnswer?: string;
    locked: boolean;
    onSelect: (optionId: string) => void;
    onReport: () => void;
}) {
    const bookmarked = useBookmarkStore((s) => s.bookmarkedIds.includes(question.id));
    const toggleBm = useBookmarkStore((s) => s.toggle);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                    {question.topic && <p className="truncate text-xs text-muted-foreground">{question.topic}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                    <button
                        onClick={() => toggleBm(question.id)}
                        className={cn(
                            'rounded-lg p-1.5 transition-colors',
                            bookmarked ? 'text-amber-400 hover:text-amber-300' : 'text-muted-foreground hover:text-muted-foreground',
                        )}
                        title={bookmarked ? 'বুকমার্ক সরাও' : 'বুকমার্ক করো'}
                    >
                        <BookmarkIcon filled={bookmarked} />
                    </button>
                    <button onClick={onReport} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-muted-foreground" title="রিপোর্ট করো">
                        <FlagIcon />
                    </button>
                </div>
            </div>

            {question.passage && (
                <div className="rounded-lg border border-border bg-card/50 p-3 text-sm leading-relaxed text-muted-foreground">
                    <MathText text={question.passage} block />
                </div>
            )}

            <p className="text-base font-medium leading-relaxed text-foreground">
                {toBangla(index)}. <MathText text={question.text} />
            </p>

            <div className="flex flex-col gap-2">
                {question.options.map((opt, i) => (
                    <OptionButton
                        key={opt.id}
                        id={opt.id}
                        text={opt.text}
                        index={i}
                        selected={selectedAnswer === opt.id}
                        isCorrect={opt.isCorrect}
                        /* Exam mode: never reveal correctness mid-quiz. */
                        revealed={false}
                        onClick={() => {
                            if (!locked) onSelect(opt.id);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

function ExitDialog({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-5">
                <h2 className="text-base font-bold text-foreground">কুইজ ছেড়ে যাবে?</h2>
                <p className="mt-1 text-sm text-muted-foreground">তোমার অগ্রগতি সংরক্ষিত হবে না।</p>
                <div className="mt-5 flex gap-3">
                    <button onClick={onCancel} className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted">
                        বাতিল
                    </button>
                    <button onClick={onConfirm} className="flex-1 rounded-xl bg-red-500 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-400">
                        বের হও
                    </button>
                </div>
            </div>
        </div>
    );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
    return (
        <svg width={15} height={15} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
    );
}

function FlagIcon() {
    return (
        <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
    );
}
