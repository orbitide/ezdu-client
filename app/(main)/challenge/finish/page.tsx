'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Flame, Clock, RotateCcw, Home, BookOpen, Loader2 } from 'lucide-react';
import { useChallengeStore } from '@/features/challenge/challenge.store';
import { submitUserQuiz } from '@/lib/api/quiz';
import { QuizType } from '@/types/api';

function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}মি ${s}সে` : `${s}সে`;
}

function getStreakMessage(maxStreak: number): { title: string; sub: string } {
    if (maxStreak >= 10) return { title: 'অবিশ্বাস্য! 💥', sub: 'তুমি সত্যিকারের মাস্টার!' };
    if (maxStreak >= 5)  return { title: 'অসাধারণ! 🔥', sub: 'স্ট্রিক দারুণ ছিল' };
    if (maxStreak >= 3)  return { title: 'চমৎকার!', sub: 'তুমি ভালো করছো' };
    return { title: 'ভালো চেষ্টা!', sub: 'আরো প্র্যাকটিস করলে ভালো হবে' };
}

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.38, delay },
});

export default function ChallengeFinishPage() {
    const router = useRouter();
    const {
        status, maxStreak, timeTaken, correct, questions, subjectName, lessonName,
        planMode, planConfig, selectedAnswers, resetChallenge,
    } = useChallengeStore();

    const [submitting, setSubmitting] = useState(false);
    const hasSubmitted = useRef(false);

    useEffect(() => {
        if (status !== 'finished') router.replace('/challenge');
    }, [status, router]);

    // Fire-and-forget plan quiz submission so backend marks the item complete
    useEffect(() => {
        if (!planMode || !planConfig || hasSubmitted.current) return;
        hasSubmitted.current = true;

        const submissions = questions
            .map((q) => ({ qId: q.id, opId: selectedAnswers[q.id] ?? '' }))
            .filter((s) => s.opId !== '');

        setSubmitting(true);
        submitUserQuiz({
            quizType: QuizType.Plan,
            quizId: String(planConfig.lessonId),
            subjectId: String(planConfig.subjectId),
            durationSeconds: timeTaken ?? 0,
            submissions,
            lessonId: String(planConfig.lessonId),
        })
            .catch(() => {})
            .finally(() => setSubmitting(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [planMode, planConfig]);

    if (status !== 'finished') return null;

    const { title, sub } = getStreakMessage(maxStreak);
    const total = questions.length;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    const time = timeTaken ?? 0;

    const handlePlanReturn = () => {
        resetChallenge();
        router.push('/study-plan');
    };

    return (
        <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12 bg-background">
            <div className="w-full max-w-sm space-y-8">

                {/* Trophy — amber warning color matching mobile */}
                <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 11, stiffness: 150, delay: 0.05 }}
                    className="flex flex-col items-center"
                >
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-500/30 bg-amber-500/10">
                        <span className="text-5xl">🏆</span>
                    </div>
                </motion.div>

                {/* Title */}
                <motion.div {...fadeUp(0.2)} className="text-center">
                    <h1 className="text-2xl font-extrabold text-foreground">{title}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">{sub}</p>
                    {(subjectName || lessonName) && (
                        <p className="mt-1.5 text-xs text-muted-foreground truncate">
                            {subjectName}{lessonName ? ` · ${lessonName}` : ''}
                        </p>
                    )}
                </motion.div>

                {/* Stat cards */}
                <motion.div {...fadeUp(0.32)} className="grid grid-cols-2 gap-3">
                    {/* Max Streak — amber/orange (mobile warning #FF9800) */}
                    <div className="flex flex-col items-center gap-2 rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5">
                        <Flame size={22} className="text-amber-400" />
                        <p className="text-3xl font-extrabold text-amber-400">{maxStreak}</p>
                        <p className="text-xs text-muted-foreground">সর্বোচ্চ স্ট্রিক</p>
                    </div>
                    {/* Total Time — emerald (mobile success #4CAF50) */}
                    <div className="flex flex-col items-center gap-2 rounded-2xl border border-primary/25 bg-primary/8 p-5">
                        <Clock size={22} className="text-primary" />
                        <p className="text-2xl font-extrabold text-primary">{formatTime(time)}</p>
                        <p className="text-xs text-muted-foreground">মোট সময়</p>
                    </div>
                </motion.div>

                {/* Accuracy */}
                <motion.p {...fadeUp(0.42)} className="text-center text-sm text-muted-foreground">
                    {total}টি প্রশ্নে {correct}টি সঠিক &nbsp;·&nbsp; {accuracy}% নির্ভুলতা
                </motion.p>

                {/* Actions */}
                <motion.div {...fadeUp(0.52)} className="flex flex-col gap-3">
                    {planMode ? (
                        /* Primary CTA — purple matching the plan color */
                        <button
                            onClick={handlePlanReturn}
                            className="flex items-center justify-center gap-2 rounded-xl bg-purple-500 py-3.5 text-sm font-semibold text-white hover:bg-purple-400 transition-colors"
                        >
                            {submitting ? <Loader2 size={16} className="animate-spin" /> : <BookOpen size={16} />}
                            প্ল্যানে ফিরুন
                        </button>
                    ) : (
                        /* Primary CTA — teal brand color matching mobile primary #00d492 */
                        <button
                            onClick={() => { resetChallenge(); router.push('/challenge'); }}
                            className="flex items-center justify-center gap-2 rounded-xl bg-teal-500 py-3.5 text-sm font-semibold text-black hover:bg-teal-400 transition-colors"
                        >
                            <RotateCcw size={16} />
                            আবার চ্যালেঞ্জ করো
                        </button>
                    )}
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-3.5 text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                    >
                        <Home size={16} />
                        হোমে ফিরে যাও
                    </button>
                </motion.div>
            </div>
        </div>
    );
}