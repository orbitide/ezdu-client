'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
    FlaskConical, Loader2, BookOpen, ChevronDown, CheckCircle2,
    ArrowLeft, ChevronRight, Clock, LayoutList, X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSubjects, getLessonsWithTopics } from '@/lib/api/classes';
import { getQuestionCountByTopicIds, getQuestionsByTopicIds, getPresets, getPresetDetail, getQuestionsBySubjectIds } from '@/lib/api/quiz';
import { useLaunchStore } from '@/features/quiz/engine/launch.store';
import { QuizSettingsDialog } from '@/features/quiz/engine/QuizSettingsDialog';
import type { QuizPlaySettings } from '@/features/quiz/engine/types';
import { QuizType } from '@/types/api';
import type { SubjectDto, LessonWithTopicsDto, TopicDto } from '@/types/api';
import type { PresetDto } from '@/types/api';

type Step = 'subject' | 'lessons';

// ─── Section header ────────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
    return (
        <div className="flex items-center gap-2 mb-3">
            <div className="w-0.5 h-4 rounded-full bg-teal-400 shrink-0" />
            <h2 className="text-sm font-bold text-foreground">{title}</h2>
        </div>
    );
}

// ─── Preset detail sheet ───────────────────────────────────────────────────────

function PresetDetailSheet({
    preset,
    onClose,
}: {
    preset: PresetDto;
    onClose: () => void;
}) {
    const router = useRouter();
    const launch = useLaunchStore((s) => s.launch);
    const [loadingDetail, setLoadingDetail] = useState(true);
    const [detail, setDetail] = useState<PresetDto | null>(null);
    const [usePresetTime, setUsePresetTime] = useState(true);
    const [customMinutes, setCustomMinutes] = useState('');
    const [starting, setStarting] = useState(false);

    useEffect(() => {
        getPresetDetail(String(preset.id))
            .then(setDetail)
            .catch(() => setDetail(preset))
            .finally(() => setLoadingDetail(false));
    }, [preset]);

    const handleStart = useCallback(async () => {
        const src = detail ?? preset;
        const timeMin = usePresetTime
            ? src.durationInMinutes
            : Math.max(1, Math.min(180, parseInt(customMinutes) || src.durationInMinutes));
        setStarting(true);
        try {
            const subjectCounts = src.subjects.map((s) => ({ subjectId: String(s.id), count: s.marks }));
            const quiz = await getQuestionsBySubjectIds(subjectCounts);
            const questions = quiz.questions.map((q) => ({
                id: q.id,
                text: q.text,
                options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
                explanation: q.explanation,
                subjectId: q.subjectId,
                subject: q.subjectName,
                topic: q.topicName,
                difficulty: q.difficulty as 'easy' | 'medium' | 'hard' | undefined,
            }));
            // Matches mobile's preset config in `preset_bottom_sheet.dart`.
            launch(
                {
                    quizType: QuizType.Mock,
                    quizId: String(src.id),
                    title: src.name,
                    timeInMinutes: timeMin,
                    layout: 'allInList',
                    answerMode: 'lockOnce',
                    negativeMarkValue: 0.25,
                    showInfoBar: true,
                },
                questions,
                '/mock-tests',
            );
            router.push('/quiz/session');
        } catch {
            setStarting(false);
        }
    }, [detail, preset, usePresetTime, customMinutes, launch, router]);

    const src = detail ?? preset;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-full max-w-lg rounded-t-2xl bg-card border border-border border-b-0 px-5 pb-8 pt-4"
            >
                {/* Handle */}
                <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted" />

                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-base font-bold text-foreground pr-4">{preset.name}</h3>
                    <button onClick={onClose} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-muted-foreground transition-colors">
                        <X size={15} />
                    </button>
                </div>

                {loadingDetail ? (
                    <div className="flex justify-center py-8">
                        <Loader2 size={22} className="animate-spin text-teal-400" />
                    </div>
                ) : (
                    <div className="space-y-3">
                        {/* Subject rows */}
                        <div className="space-y-0 rounded-xl border border-border overflow-hidden">
                            {src.subjects?.map((s, i) => (
                                <div key={s.id} className={cn('flex items-center justify-between px-4 py-3 text-sm', i > 0 && 'border-t border-border')}>
                                    <span className="text-muted-foreground">{s.name}</span>
                                    <span className="text-muted-foreground font-medium tabular-nums">{s.marks} প্রশ্ন</span>
                                </div>
                            ))}
                        </div>

                        {/* Time toggle */}
                        <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Clock size={14} />
                                <span>সময়</span>
                            </div>
                            <div className="flex overflow-hidden rounded-lg border border-border">
                                {([['নির্ধারিত', true], ['কাস্টম', false]] as [string, boolean][]).map(([label, val]) => (
                                    <button
                                        key={String(val)}
                                        onClick={() => setUsePresetTime(val)}
                                        className={cn(
                                            'px-3 py-1.5 text-xs font-semibold transition-colors',
                                            usePresetTime === val
                                                ? 'bg-teal-500 text-black'
                                                : 'text-muted-foreground hover:text-muted-foreground'
                                        )}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {usePresetTime ? (
                            <p className="px-1 text-sm font-semibold text-teal-400">
                                {src.durationInMinutes} মিনিট
                            </p>
                        ) : (
                            <input
                                type="number"
                                min={1}
                                max={180}
                                placeholder="১–১৮০"
                                value={customMinutes}
                                onChange={(e) => setCustomMinutes(e.target.value)}
                                className="w-full rounded-xl border border-border bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-teal-500 focus:outline-none"
                            />
                        )}

                        <button
                            onClick={handleStart}
                            disabled={starting}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-black hover:bg-teal-400 transition-colors disabled:opacity-60"
                        >
                            {starting && <Loader2 size={15} className="animate-spin" />}
                            {starting ? 'শুরু হচ্ছে...' : 'শুরু করো'}
                        </button>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

// ─── Preset section ────────────────────────────────────────────────────────────

function PresetSection() {
    const [presets, setPresets] = useState<PresetDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [activePreset, setActivePreset] = useState<PresetDto | null>(null);

    useEffect(() => {
        getPresets()
            .then(setPresets)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-6">
                <Loader2 size={22} className="animate-spin text-teal-400" />
            </div>
        );
    }

    if (presets.length === 0) return null;

    return (
        <>
            <SectionHeader title="স্ট্যান্ডার্ড প্রিসেট" />

            <div className="flex flex-wrap gap-2">
                {presets.map((p) => (
                    <button
                        key={p.id}
                        onClick={() => setActivePreset(p)}
                        className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:border-teal-500/40 hover:bg-teal-500/5 hover:text-teal-300 transition-colors"
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {activePreset && (
                    <PresetDetailSheet
                        preset={activePreset}
                        onClose={() => setActivePreset(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function MockTestsPage() {
    const router = useRouter();
    const launch = useLaunchStore((s) => s.launch);

    const [step, setStep] = useState<Step>('subject');
    const [subjects, setSubjects] = useState<SubjectDto[]>([]);
    const [loadingSubjects, setLoadingSubjects] = useState(true);
    const [selectedSubject, setSelectedSubject] = useState<SubjectDto | null>(null);
    const [lessons, setLessons] = useState<LessonWithTopicsDto[]>([]);
    const [loadingLessons, setLoadingLessons] = useState(false);
    const [selectedTopicIds, setSelectedTopicIds] = useState<Set<string>>(new Set());
    const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());
    const [fetchingCount, setFetchingCount] = useState(false);
    const [availableCount, setAvailableCount] = useState<number | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [noQuestionsError, setNoQuestionsError] = useState(false);
    const [starting, setStarting] = useState(false);

    useEffect(() => {
        getSubjects()
            .then(setSubjects)
            .catch(() => {})
            .finally(() => setLoadingSubjects(false));
    }, []);

    const handleSubjectSelect = useCallback(async (sub: SubjectDto) => {
        setSelectedSubject(sub);
        setLessons([]);
        setSelectedTopicIds(new Set());
        setExpandedLessons(new Set());
        setNoQuestionsError(false);
        setStep('lessons');
        setLoadingLessons(true);
        try {
            const ls = await getLessonsWithTopics(sub.id);
            setLessons(ls);
        } catch { /* empty state shown */ }
        finally { setLoadingLessons(false); }
    }, []);

    const toggleLesson = useCallback((lesson: LessonWithTopicsDto) => {
        const topicIds = lesson.topics.map((t) => t.id);
        setSelectedTopicIds((prev) => {
            const next = new Set(prev);
            const allSelected = topicIds.every((id) => next.has(id));
            if (allSelected) topicIds.forEach((id) => next.delete(id));
            else topicIds.forEach((id) => next.add(id));
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

    const handleStartPress = useCallback(async () => {
        setNoQuestionsError(false);
        setFetchingCount(true);
        try {
            const count = await getQuestionCountByTopicIds([...selectedTopicIds]);
            setAvailableCount(count);
            if (count === 0) setNoQuestionsError(true);
            else setShowDialog(true);
        } catch { setNoQuestionsError(true); }
        finally { setFetchingCount(false); }
    }, [selectedTopicIds]);

    const handleDialogConfirm = useCallback(async (settings: QuizPlaySettings) => {
        setShowDialog(false);
        setStarting(true);
        try {
            const quizData = await getQuestionsByTopicIds([...selectedTopicIds], settings.maxQuestions);
            const questions = quizData.questions.map((q) => ({
                id: q.id,
                text: q.text,
                options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
                explanation: q.explanation,
                subjectId: q.subjectId,
                subject: q.subjectName,
                topic: q.topicName,
                difficulty: q.difficulty as 'easy' | 'medium' | 'hard' | undefined,
            }));
            // Matches mobile's `mock_review_selection_page.dart` config.
            launch(
                {
                    quizType: QuizType.Mock,
                    quizId: '',
                    title: 'মক কুইজ',
                    timeInMinutes: settings.timeInMinutes,
                },
                questions,
                '/mock-tests',
            );
            router.push('/quiz/session');
        } catch { setStarting(false); }
    }, [selectedTopicIds, launch, router]);

    const selectedCount = selectedTopicIds.size;

    return (
        <div className="flex flex-col min-h-dvh bg-background">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3 shrink-0">
                {step === 'lessons' ? (
                    <button
                        onClick={() => setStep('subject')}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={18} />
                    </button>
                ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/10">
                        <FlaskConical size={20} className="text-teal-400" />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <h1 className="text-sm font-bold text-foreground">
                        {step === 'lessons' ? selectedSubject?.name ?? 'মক টেস্ট' : 'মক টেস্ট'}
                    </h1>
                    <p className="text-xs text-muted-foreground">
                        {step === 'lessons' ? 'টপিক বেছে নাও' : 'বিষয় বা প্রিসেট বেছে নাও'}
                    </p>
                </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-4 py-5 max-w-2xl mx-auto w-full">

                {/* ── Subject selection + presets ── */}
                {step === 'subject' && (
                    <div className="space-y-6">
                        {/* Custom: subject grid */}
                        <div>
                            <SectionHeader title="বিষয় বেছে নাও" />
                            {loadingSubjects ? (
                                <div className="flex items-center justify-center py-10">
                                    <Loader2 size={24} className="animate-spin text-teal-400" />
                                </div>
                            ) : subjects.length === 0 ? (
                                <div className="rounded-xl border border-border bg-card p-10 text-center">
                                    <BookOpen size={32} className="mx-auto text-muted-foreground mb-3" />
                                    <p className="text-sm text-muted-foreground">কোনো বিষয় পাওয়া যায়নি</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    {subjects.map((sub) => (
                                        <button
                                            key={sub.id}
                                            onClick={() => handleSubjectSelect(sub)}
                                            className={cn(
                                                'flex items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-3',
                                                'text-left text-sm font-medium text-muted-foreground',
                                                'hover:border-teal-500/50 hover:bg-teal-500/5 hover:text-teal-300 transition-colors'
                                            )}
                                        >
                                            <BookOpen size={15} className="shrink-0 text-muted-foreground" />
                                            <span className="flex-1 truncate">{sub.name}</span>
                                            <ChevronRight size={14} className="shrink-0 text-muted-foreground" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Preset section */}
                        <PresetSection />
                    </div>
                )}

                {/* ── Lesson / topic selection ── */}
                {step === 'lessons' && (
                    <>
                        {loadingLessons ? (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 size={28} className="animate-spin text-teal-400" />
                            </div>
                        ) : lessons.length === 0 ? (
                            <p className="py-12 text-center text-sm text-muted-foreground">কোনো লেসন পাওয়া যায়নি।</p>
                        ) : (
                            <div className="space-y-2">
                                {lessons.map((lesson, idx) => {
                                    const isExpanded = expandedLessons.has(lesson.id);
                                    const fullySelected = isLessonFullySelected(lesson);
                                    const partiallySelected = isLessonPartiallySelected(lesson);
                                    const selectedInLesson = countSelectedInLesson(lesson);

                                    return (
                                        <div key={lesson.id} className="rounded-xl border border-border bg-card/60 overflow-hidden">
                                            <div className="flex items-center gap-3 px-3.5 py-3">
                                                <button
                                                    onClick={() => toggleLesson(lesson)}
                                                    className={cn(
                                                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                                                        fullySelected
                                                            ? 'border-teal-500 bg-teal-500'
                                                            : partiallySelected
                                                            ? 'border-teal-500/60 bg-teal-500/20'
                                                            : 'border-ring/40 bg-transparent hover:border-ring/60'
                                                    )}
                                                >
                                                    {(fullySelected || partiallySelected) && (
                                                        <CheckCircle2 size={12} className="text-black" />
                                                    )}
                                                </button>
                                                <button
                                                    onClick={() => toggleExpand(lesson.id)}
                                                    className="flex flex-1 items-center gap-2 text-left"
                                                >
                                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                                                        {idx + 1}
                                                    </span>
                                                    <span className="flex-1 text-sm font-medium text-foreground truncate">{lesson.name}</span>
                                                    {lesson.topics.length > 0 && (
                                                        <span className="shrink-0 text-xs text-muted-foreground">
                                                            {selectedInLesson > 0 && <span className="text-teal-400">{selectedInLesson}/</span>}
                                                            {lesson.topics.length} টপিক
                                                        </span>
                                                    )}
                                                </button>
                                                {lesson.topics.length > 0 && (
                                                    <button
                                                        onClick={() => toggleExpand(lesson.id)}
                                                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                                    >
                                                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                            <ChevronDown size={14} />
                                                        </motion.div>
                                                    </button>
                                                )}
                                            </div>
                                            <AnimatePresence initial={false}>
                                                {isExpanded && lesson.topics.length > 0 && (
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: 'auto' }}
                                                        exit={{ height: 0 }}
                                                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="border-t border-border pl-10 pr-3.5 py-2 space-y-1">
                                                            {lesson.topics.map((topic: TopicDto) => {
                                                                const checked = selectedTopicIds.has(topic.id);
                                                                return (
                                                                    <button
                                                                        key={topic.id}
                                                                        onClick={() => toggleTopic(topic.id)}
                                                                        className="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left hover:bg-muted/50 transition-colors"
                                                                    >
                                                                        <span className={cn(
                                                                            'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors',
                                                                            checked ? 'border-teal-500 bg-teal-500' : 'border-ring/40 bg-transparent'
                                                                        )}>
                                                                            {checked && (
                                                                                <svg viewBox="0 0 10 8" className="w-2.5 h-2 fill-black">
                                                                                    <path d="M1 4l2.5 2.5L9 1" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                                                                </svg>
                                                                            )}
                                                                        </span>
                                                                        <span className={cn('text-xs transition-colors', checked ? 'text-foreground' : 'text-muted-foreground')}>
                                                                            {topic.name}
                                                                        </span>
                                                                        {topic.questionCount != null && topic.questionCount > 0 && (
                                                                            <span className="ml-auto text-[10px] text-muted-foreground shrink-0">
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
                                })}
                                <div className="h-24" />
                            </div>
                        )}

                        {noQuestionsError && (
                            <p className="text-center text-xs text-red-400 pb-1">
                                নির্বাচিত টপিকে কোনো প্রশ্ন পাওয়া যায়নি। আরও টপিক যোগ করো।
                            </p>
                        )}

                        {/* Sticky start footer */}
                        <AnimatePresence>
                            {selectedCount > 0 && (
                                <motion.div
                                    initial={{ y: 60, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 60, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="sticky bottom-0 -mx-4 border-t border-border bg-background/95 backdrop-blur-sm px-4 py-4"
                                >
                                    <button
                                        onClick={handleStartPress}
                                        disabled={fetchingCount || starting}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-black hover:bg-teal-400 transition-colors disabled:opacity-60"
                                    >
                                        {(fetchingCount || starting) && <Loader2 size={16} className="animate-spin" />}
                                        {fetchingCount ? 'যাচাই করা হচ্ছে...' : starting ? 'শুরু হচ্ছে...' : `${selectedCount} টি টপিক দিয়ে শুরু করো`}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showDialog && availableCount !== null && (
                                <QuizSettingsDialog
                                    questionCount={availableCount}
                                    isMock
                                    onConfirm={handleDialogConfirm}
                                    onCancel={() => setShowDialog(false)}
                                />
                            )}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </div>
    );
}
