'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Loader2, ChevronRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSubjects, getLessonsWithTopics } from '@/lib/api/classes';
import { getQuestionsByLesson } from '@/lib/api/quiz';
import { useChallengeStore } from '@/features/challenge/challenge.store';
import type { SubjectDto, LessonWithTopicsDto } from '@/types/api';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { DefaultRightRail } from '@/components/layout/default-right-rail';
import { PageContainer } from '@/components/layout/page-container';

export default function ChallengePage() {
    const router = useRouter();
    const { startChallenge } = useChallengeStore();

    const [subjects, setSubjects] = useState<SubjectDto[]>([]);
    const [lessons, setLessons] = useState<LessonWithTopicsDto[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<SubjectDto | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<LessonWithTopicsDto | null>(null);
    const [loadingSubjects, setLoadingSubjects] = useState(true);
    const [loadingLessons, setLoadingLessons] = useState(false);
    const [starting, setStarting] = useState(false);

    useEffect(() => {
        getSubjects()
            .then(setSubjects)
            .catch(() => {})
            .finally(() => setLoadingSubjects(false));
    }, []);

    const handleSubjectSelect = async (subject: SubjectDto) => {
        if (selectedSubject?.id === subject.id) return;
        setSelectedSubject(subject);
        setSelectedLesson(null);
        setLessons([]);
        setLoadingLessons(true);
        try {
            const ls = await getLessonsWithTopics(subject.id);
            setLessons(ls);
        } catch {
            // ignore
        } finally {
            setLoadingLessons(false);
        }
    };

    const handleStartChallenge = async () => {
        if (!selectedLesson || !selectedSubject) return;
        setStarting(true);
        try {
            const quiz = await getQuestionsByLesson(selectedLesson.id);
            const questions = quiz.questions.map((q) => ({
                id: q.id,
                text: q.text,
                options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
                explanation: q.explanation,
                subject: q.subjectName,
                topic: q.topicName,
                difficulty: q.difficulty as 'easy' | 'medium' | 'hard' | undefined,
            }));

            if (questions.length === 0) {
                setStarting(false);
                return;
            }

            startChallenge(questions, selectedSubject.name, selectedLesson.name);
            router.push('/challenge/session');
        } catch {
            setStarting(false);
        }
    };

    return (
        <PageContainer>
            <TwoColumnShell right={<DefaultRightRail />}>
                <div className="space-y-6">
                    {/* Page header */}
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10">
                            <Zap size={20} className="text-teal-400" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-foreground">দ্রুত চ্যালেঞ্জ</h1>
                            <p className="text-xs text-muted-foreground">প্র্যাকটিস করো, স্ট্রিক বাড়াও, এগিয়ে যাও</p>
                        </div>
                    </div>

                    {loadingSubjects ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 size={28} className="animate-spin text-teal-400" />
                        </div>
                    ) : (
                        <>
                            {/* Subject cards */}
                            <div className="space-y-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">বিষয় বেছে নাও</p>
                                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                    {subjects.map((sub) => {
                                        const active = selectedSubject?.id === sub.id;
                                        return (
                                            <button
                                                key={sub.id}
                                                onClick={() => handleSubjectSelect(sub)}
                                                className={cn(
                                                    'flex items-center gap-2.5 rounded-xl border px-3 py-3 text-left text-sm font-medium transition-colors',
                                                    active
                                                        ? 'border-teal-500 bg-teal-500/10 text-teal-300'
                                                        : 'border-border bg-card text-muted-foreground hover:border-border hover:bg-muted/60'
                                                )}
                                            >
                                                <BookOpen size={15} className={active ? 'text-teal-400' : 'text-muted-foreground'} />
                                                <span className="flex-1 truncate">{sub.name}</span>
                                                {active && <ChevronRight size={14} className="text-teal-400 shrink-0" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Lesson rows */}
                            {selectedSubject && (
                                <div className="space-y-3">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">লেসন বেছে নাও</p>

                                    {loadingLessons ? (
                                        <div className="flex items-center justify-center py-8">
                                            <Loader2 size={22} className="animate-spin text-muted-foreground" />
                                        </div>
                                    ) : lessons.length === 0 ? (
                                        <p className="py-6 text-center text-sm text-muted-foreground">কোনো লেসন পাওয়া যায়নি।</p>
                                    ) : (
                                        <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                                            {lessons.map((lesson, idx) => {
                                                const active = selectedLesson?.id === lesson.id;
                                                return (
                                                    <button
                                                        key={lesson.id}
                                                        onClick={() => setSelectedLesson(lesson)}
                                                        className={cn(
                                                            'flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-colors',
                                                            active
                                                                ? 'border-teal-500 bg-teal-500/10 text-teal-300'
                                                                : 'border-border bg-card text-muted-foreground hover:border-border hover:bg-muted/60'
                                                        )}
                                                    >
                                                        <span className={cn(
                                                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                                                            active ? 'bg-teal-500/20 text-teal-400' : 'bg-muted text-muted-foreground'
                                                        )}>
                                                            {idx + 1}
                                                        </span>
                                                        <span className="flex-1 truncate">{lesson.name}</span>
                                                        {lesson.questionCount != null && lesson.questionCount > 0 && (
                                                            <span className="shrink-0 text-xs text-muted-foreground">
                                                                {lesson.questionCount}টি
                                                            </span>
                                                        )}
                                                        <ChevronRight size={14} className={active ? 'text-teal-400' : 'text-muted-foreground'} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Start button */}
                            {selectedLesson && (
                                <button
                                    onClick={handleStartChallenge}
                                    disabled={starting}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-white hover:bg-teal-400 transition-colors disabled:opacity-60"
                                >
                                    {starting ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                                    {starting ? 'শুরু হচ্ছে...' : 'চ্যালেঞ্জ শুরু করো'}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </TwoColumnShell>
        </PageContainer>
    );
}
