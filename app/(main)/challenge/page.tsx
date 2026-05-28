'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Loader2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSubjects, getLessonsWithTopics } from '@/lib/api/classes';
import { getQuestionsByLesson } from '@/lib/api/quiz';
import { useQuizStore } from '@/features/quiz/quiz.store';
import type { SubjectDto, LessonWithTopicsDto } from '@/types/api';

export default function ChallengePage() {
    const router = useRouter();
    const { startQuiz } = useQuizStore();
    const [subjects, setSubjects] = useState<SubjectDto[]>([]);
    const [lessons, setLessons] = useState<LessonWithTopicsDto[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<SubjectDto | null>(null);
    const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [starting, setStarting] = useState(false);

    useEffect(() => {
        getSubjects()
            .then(setSubjects)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const handleSubjectSelect = async (subject: SubjectDto) => {
        setSelectedSubject(subject);
        setSelectedLesson(null);
        try {
            const ls = await getLessonsWithTopics(subject.id);
            setLessons(ls);
        } catch {}
    };

    const handleStartChallenge = async () => {
        if (!selectedLesson) return;
        setStarting(true);
        try {
            const quiz = await getQuestionsByLesson(selectedLesson);
            const questions = quiz.questions.map((q) => ({
                id: q.id,
                text: q.text,
                options: q.options.map((o) => ({ id: o.id, text: o.text, isCorrect: o.isCorrect })),
                explanation: q.explanation,
                subject: q.subjectName,
                topic: q.topicName,
                difficulty: q.difficulty as 'easy' | 'medium' | 'hard' | undefined,
            }));
            startQuiz('ssc', questions, 15); // 15 min for challenge
            router.push('/quiz/challenge-session');
        } catch {
            setStarting(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                    <Zap size={20} className="text-rose-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">দ্রুত চ্যালেঞ্জ</h1>
                    <p className="text-xs text-zinc-500">বিষয় বেছে তাৎক্ষণিক কুইজ দাও</p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 size={28} className="animate-spin text-rose-400" />
                </div>
            ) : (
                <>
                    {/* Subject selection */}
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-zinc-300">বিষয় বেছে নাও</p>
                        <div className="flex flex-wrap gap-2">
                            {subjects.map((sub) => (
                                <button
                                    key={sub.id}
                                    onClick={() => handleSubjectSelect(sub)}
                                    className={cn(
                                        'rounded-xl border px-3 py-2 text-sm font-medium transition-colors',
                                        selectedSubject?.id === sub.id
                                            ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                                            : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:border-zinc-700'
                                    )}
                                >
                                    {sub.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Lesson selection */}
                    {selectedSubject && lessons.length > 0 && (
                        <div className="space-y-2">
                            <p className="text-sm font-semibold text-zinc-300">লেসন বেছে নাও</p>
                            <div className="space-y-1.5 max-h-64 overflow-y-auto">
                                {lessons.map((lesson) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => setSelectedLesson(lesson.id)}
                                        className={cn(
                                            'flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors',
                                            selectedLesson === lesson.id
                                                ? 'border-rose-500 bg-rose-500/10 text-rose-400'
                                                : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
                                        )}
                                    >
                                        <span className="flex-1 truncate">{lesson.name}</span>
                                        {lesson.questionCount && (
                                            <span className="text-xs text-zinc-500 shrink-0">{lesson.questionCount} প্রশ্ন</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Start button */}
                    {selectedLesson && (
                        <button
                            onClick={handleStartChallenge}
                            disabled={starting}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500 py-3 text-sm font-semibold text-white hover:bg-rose-400 transition-colors disabled:opacity-60"
                        >
                            {starting ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                            {starting ? 'শুরু হচ্ছে...' : 'চ্যালেঞ্জ শুরু করো'}
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
