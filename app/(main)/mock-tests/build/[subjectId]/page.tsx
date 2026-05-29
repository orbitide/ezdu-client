'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, Loader2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLessonsWithTopics } from '@/lib/api/classes';
import { getQuestionCountByTopicIds, getQuestionsByTopicIds } from '@/lib/api/quiz';
import { useQuizStore } from '@/features/quiz/quiz.store';
import { MockTestSettingsDialog } from '@/features/mock-test/components/MockTestSettingsDialog';
import type { LessonWithTopicsDto, TopicDto } from '@/types/api';

export default function MockTestBuildPage() {
    const { subjectId } = useParams<{ subjectId: string }>();
    const router = useRouter();
    const { startQuiz } = useQuizStore();

    const [lessons, setLessons] = useState<LessonWithTopicsDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [subjectName, setSubjectName] = useState('');

    // Selection state
    const [selectedTopicIds, setSelectedTopicIds] = useState<Set<string>>(new Set());
    const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());

    // Dialog state
    const [fetchingCount, setFetchingCount] = useState(false);
    const [availableCount, setAvailableCount] = useState<number | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [noQuestionsError, setNoQuestionsError] = useState(false);
    const [starting, setStarting] = useState(false);

    useEffect(() => {
        getLessonsWithTopics(subjectId)
            .then((ls) => {
                setLessons(ls);
                if (ls.length > 0) setSubjectName(ls[0].subjectName ?? '');
            })
            .catch(() => setError('লেসন লোড হয়নি। আবার চেষ্টা করো।'))
            .finally(() => setLoading(false));
    }, [subjectId]);

    // ── Selection helpers ──────────────────────────────────────────────────────

    const toggleLesson = useCallback((lesson: LessonWithTopicsDto) => {
        const topicIds = lesson.topics.map((t) => t.id);
        setSelectedTopicIds((prev) => {
            const next = new Set(prev);
            const allSelected = topicIds.every((id) => next.has(id));
            if (allSelected) {
                topicIds.forEach((id) => next.delete(id));
            } else {
                topicIds.forEach((id) => next.add(id));
            }
            return next;
        });
    }, []);

    const toggleTopic = useCallback((topicId: string) => {
        setSelectedTopicIds((prev) => {
            const next = new Set(prev);
            next.has(topicId) ? next.delete(topicId) : next.add(topicId);
            return next;
        });
    }, []);

    const toggleExpand = useCallback((lessonId: string) => {
        setExpandedLessons((prev) => {
            const next = new Set(prev);
            next.has(lessonId) ? next.delete(lessonId) : next.add(lessonId);
            return next;
        });
    }, []);

    const isLessonFullySelected = (lesson: LessonWithTopicsDto) =>
        lesson.topics.length > 0 && lesson.topics.every((t) => selectedTopicIds.has(t.id));

    const isLessonPartiallySelected = (lesson: LessonWithTopicsDto) =>
        lesson.topics.some((t) => selectedTopicIds.has(t.id)) && !isLessonFullySelected(lesson);

    const countSelectedInLesson = (lesson: LessonWithTopicsDto) =>
        lesson.topics.filter((t) => selectedTopicIds.has(t.id)).length;

    // ── Start flow ─────────────────────────────────────────────────────────────

    const handleStartPress = useCallback(async () => {
        setNoQuestionsError(false);
        setFetchingCount(true);
        try {
            const count = await getQuestionCountByTopicIds([...selectedTopicIds]);
            setAvailableCount(count);
            if (count === 0) {
                setNoQuestionsError(true);
            } else {
                setShowDialog(true);
            }
        } catch {
            setNoQuestionsError(true);
        } finally {
            setFetchingCount(false);
        }
    }, [selectedTopicIds]);

    const handleDialogConfirm = useCallback(async (timeMinutes: number, maxQuestions: number) => {
        setShowDialog(false);
        setStarting(true);
        try {
            const quizData = await getQuestionsByTopicIds([...selectedTopicIds], maxQuestions);
            const questions = quizData.questions.map((q) => ({
                id: q.id,
                text: q.text,
                options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
                explanation: q.explanation,
                subject: q.subjectName,
                topic: q.topicName,
                difficulty: q.difficulty as 'easy' | 'medium' | 'hard' | undefined,
            }));
            startQuiz('ssc', questions, timeMinutes, 'lockOnce');
            router.push('/mock-tests/session');
        } catch {
            setStarting(false);
        }
    }, [selectedTopicIds, startQuiz, router]);

    // ── Render ─────────────────────────────────────────────────────────────────

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 size={28} className="animate-spin text-teal-400" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 px-4 text-center">
                <AlertTriangle size={32} className="text-red-400" />
                <p className="text-sm text-zinc-400">{error}</p>
                <button onClick={() => router.push('/mock-tests')} className="text-sm text-teal-400 hover:text-teal-300">
                    ফিরে যাও
                </button>
            </div>
        );
    }

    const selectedCount = selectedTopicIds.size;

    return (
        <div className="flex flex-col min-h-dvh bg-zinc-950">
            {/* Header */}
            <header className="flex items-center gap-3 border-b border-zinc-800/60 px-4 py-3 shrink-0">
                <button
                    onClick={() => router.push('/mock-tests')}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                >
                    <ArrowLeft size={18} />
                </button>
                <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-semibold text-zinc-100">{subjectName || 'লেসন বেছে নাও'}</p>
                    <p className="text-xs text-zinc-500">টপিক বেছে নাও</p>
                </div>
                {selectedCount > 0 && (
                    <span className="shrink-0 rounded-full bg-teal-500/15 px-2.5 py-0.5 text-xs font-bold text-teal-400">
                        {selectedCount} টপিক
                    </span>
                )}
            </header>

            {/* Lesson list */}
            <div className="flex-1 overflow-y-auto px-4 py-4 max-w-2xl mx-auto w-full space-y-2">
                {lessons.length === 0 ? (
                    <p className="py-12 text-center text-sm text-zinc-600">কোনো লেসন পাওয়া যায়নি।</p>
                ) : (
                    lessons.map((lesson, idx) => {
                        const isExpanded = expandedLessons.has(lesson.id);
                        const fullySelected = isLessonFullySelected(lesson);
                        const partiallySelected = isLessonPartiallySelected(lesson);
                        const selectedInLesson = countSelectedInLesson(lesson);

                        return (
                            <div key={lesson.id} className="rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden">
                                {/* Lesson header row */}
                                <div className="flex items-center gap-3 px-3.5 py-3">
                                    {/* Lesson checkbox */}
                                    <button
                                        onClick={() => toggleLesson(lesson)}
                                        className={cn(
                                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                                            fullySelected
                                                ? 'border-teal-500 bg-teal-500'
                                                : partiallySelected
                                                ? 'border-teal-500/60 bg-teal-500/20'
                                                : 'border-zinc-600 bg-transparent hover:border-zinc-400'
                                        )}
                                    >
                                        {(fullySelected || partiallySelected) && (
                                            <CheckCircle2 size={12} className="text-black" />
                                        )}
                                    </button>

                                    {/* Lesson name */}
                                    <button
                                        onClick={() => toggleExpand(lesson.id)}
                                        className="flex flex-1 items-center gap-2 text-left"
                                    >
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[10px] font-bold text-zinc-500">
                                            {idx + 1}
                                        </span>
                                        <span className="flex-1 text-sm font-medium text-zinc-100 truncate">
                                            {lesson.name}
                                        </span>
                                        {lesson.topics.length > 0 && (
                                            <span className="shrink-0 text-xs text-zinc-600">
                                                {selectedInLesson > 0 ? (
                                                    <span className="text-teal-400">{selectedInLesson}/</span>
                                                ) : null}
                                                {lesson.topics.length} টপিক
                                            </span>
                                        )}
                                    </button>

                                    {/* Expand toggle */}
                                    {lesson.topics.length > 0 && (
                                        <button
                                            onClick={() => toggleExpand(lesson.id)}
                                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 transition-colors"
                                        >
                                            <motion.div
                                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <ChevronDown size={14} />
                                            </motion.div>
                                        </button>
                                    )}
                                </div>

                                {/* Topics */}
                                <AnimatePresence initial={false}>
                                    {isExpanded && lesson.topics.length > 0 && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="border-t border-zinc-800/60 pl-10 pr-3.5 py-2 space-y-1">
                                                {lesson.topics.map((topic: TopicDto) => {
                                                    const checked = selectedTopicIds.has(topic.id);
                                                    return (
                                                        <button
                                                            key={topic.id}
                                                            onClick={() => toggleTopic(topic.id)}
                                                            className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left hover:bg-zinc-800/50 transition-colors"
                                                        >
                                                            <span className={cn(
                                                                'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                                                                checked
                                                                    ? 'border-teal-500 bg-teal-500'
                                                                    : 'border-zinc-600 bg-transparent'
                                                            )}>
                                                                {checked && (
                                                                    <svg viewBox="0 0 10 8" className="w-2.5 h-2 fill-black">
                                                                        <path d="M1 4l2.5 2.5L9 1" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                )}
                                                            </span>
                                                            <span className={cn(
                                                                'text-xs transition-colors',
                                                                checked ? 'text-zinc-100' : 'text-zinc-400'
                                                            )}>
                                                                {topic.name}
                                                            </span>
                                                            {topic.questionCount != null && topic.questionCount > 0 && (
                                                                <span className="ml-auto text-[10px] text-zinc-600 shrink-0">
                                                                    {topic.questionCount}টি
                                                                </span>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })
                )}
                <div className="h-24" />
            </div>

            {/* No questions error */}
            {noQuestionsError && (
                <div className="shrink-0 px-4 pb-2 max-w-2xl mx-auto w-full">
                    <p className="text-center text-xs text-red-400">
                        নির্বাচিত টপিকে কোনো প্রশ্ন পাওয়া যায়নি। আরও টপিক যোগ করো।
                    </p>
                </div>
            )}

            {/* Sticky footer — start button */}
            <AnimatePresence>
                {selectedCount > 0 && (
                    <motion.div
                        initial={{ y: 60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 60, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="sticky bottom-0 shrink-0 border-t border-zinc-800/60 bg-zinc-950/95 backdrop-blur-sm px-4 py-4"
                    >
                        <div className="max-w-2xl mx-auto">
                            <button
                                onClick={handleStartPress}
                                disabled={fetchingCount || starting}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-black hover:bg-teal-400 transition-colors disabled:opacity-60"
                            >
                                {fetchingCount || starting ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : null}
                                {fetchingCount
                                    ? 'যাচাই করা হচ্ছে...'
                                    : starting
                                    ? 'শুরু হচ্ছে...'
                                    : `${selectedCount} টি টপিক দিয়ে শুরু করো`}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Settings dialog */}
            <AnimatePresence>
                {showDialog && availableCount !== null && (
                    <MockTestSettingsDialog
                        availableCount={availableCount}
                        onConfirm={handleDialogConfirm}
                        onCancel={() => setShowDialog(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
