'use client';

import { useEffect, useState, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { useMe } from '@/hooks/use-me';
import { getMyQuizHistory, getMySubjectMastery } from '@/lib/api/users';
import { getActivePlan, markItemComplete, createPlan } from '@/lib/api/study-plan';
import { getRecommendations } from '@/lib/api/recommendations';
import { getLeaderboard } from '@/lib/api/leaderboard';
import { HomeGrid } from '@/features/dashboard/components/HomeGrid';
import { RecentActivity } from '@/features/dashboard/components/RecentActivity';
import { DashboardStats } from '@/features/dashboard/components/DashboardStats';
import { DashboardPlanPanel } from '@/features/dashboard/components/DashboardPlanPanel';
import { MiniLeaderboard } from '@/features/dashboard/components/MiniLeaderboard';
import { useAuthStore } from '@/store/auth.store';
import type { ActivityItem, ExamProgress } from '@/features/dashboard/types';
import type { ExamId } from '@/config/exams';
import type { UserQuizHistoryDto, SubjectMasteryDto, StudyPlanDto } from '@/types/api';
import type { RecommendationsDto } from '@/lib/api/recommendations';
import type { LeaderboardEntry } from '@/features/leaderboard/types';
import { ExamProgressList } from "@/app/(main)/dashboard/ExamProgress";

function guessExamId(subjectName: string): ExamId {
    const s = subjectName.toLowerCase();
    if (s.includes('ielts') || s.includes('reading') || s.includes('listening') || s.includes('writing')) return 'ielts';
    if (s.includes('vocabulary') || s.includes('vocab') || s.includes('word')) return 'vocabulary';
    if (s.includes('bcs') || s.includes('সাধারণ জ্ঞান') || s.includes('বিসিএস')) return 'bcs';
    if (s.includes('hsc') || s.includes('এইচএস')) return 'hsc';
    return 'ssc';
}

function mapHistoryToActivity(items: UserQuizHistoryDto[]): ActivityItem[] {
    return items.slice(0, 5).map((item) => {
        const diff = Date.now() - new Date(item.completedAt).getTime();
        const h = Math.floor(diff / 3600000);
        const timeAgo =
            h < 1 ? 'এইমাত্র' :
            h < 24 ? `${h} ঘণ্টা আগে` :
            h < 48 ? 'গতকাল' :
            `${Math.floor(h / 24)} দিন আগে`;
        return {
            id: item.id,
            examId: guessExamId(item.subjectName ?? ''),
            subject: item.subjectName ?? item.quizTitle ?? 'কুইজ',
            score: item.correctAnswers,
            total: item.totalQuestions,
            timeAgo,
        };
    });
}

function mapMasteryToProgress(items: SubjectMasteryDto[]): ExamProgress[] {
    const examIds: ExamId[] = ['ssc', 'hsc', 'bcs', 'ielts', 'vocabulary'];
    return items.slice(0, 5).map((item, i) => ({
        examId: examIds[i % examIds.length],
        completedTopics: item.masteredLessons,
        totalTopics: item.totalLessons,
        lastPracticed: 'সম্প্রতি',
    }));
}

export default function DashboardPage() {
    const { data: meData, loading: meLoading } = useMe();
    const user = useAuthStore((s) => s.user);

    const [activity, setActivity] = useState<ActivityItem[]>([]);
    const [progress, setProgress] = useState<ExamProgress[]>([]);
    const [recommendations, setRecommendations] = useState<RecommendationsDto | null>(null);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [dataLoading, setDataLoading] = useState(true);

    const [plan, setPlan] = useState<StudyPlanDto | null>(null);
    const [planLoading, setPlanLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    const fetchPlan = useCallback(() => {
        setPlanLoading(true);
        getActivePlan()
            .then(setPlan)
            .catch(() => setPlan(null))
            .finally(() => setPlanLoading(false));
    }, []);

    useEffect(() => {
        let cancelled = false;
        Promise.all([
            getMyQuizHistory(1, 5).catch(() => null),
            getMySubjectMastery().catch(() => null),
            getRecommendations().catch(() => null),
            getLeaderboard().catch(() => [] as typeof leaderboard),
        ]).then(([history, mastery, recs, lb]) => {
            if (cancelled) return;
            if (history?.items) setActivity(mapHistoryToActivity(history.items));
            if (mastery?.items) setProgress(mapMasteryToProgress(mastery.items));
            if (recs) setRecommendations(recs);
            if (lb && lb.length > 0) {
                setLeaderboard(lb.map((e) => ({
                    rank: e.rank,
                    userId: e.userId,
                    name: e.name,
                    xp: e.xp,
                    level: 1,
                    streak: e.streak,
                    accuracy: 0,
                    isCurrentUser: user ? e.userId === user.id : (e.isCurrentUser ?? false),
                })));
            }
        }).finally(() => { if (!cancelled) setDataLoading(false); });
        return () => { cancelled = true; };
    }, []);

    useEffect(() => { fetchPlan(); }, [fetchPlan]);

    const handleComplete = useCallback(async (itemId: string) => {
        if (!plan) return;
        setPlan((p) => {
            if (!p) return p;
            return {
                ...p,
                completedItems: p.completedItems + 1,
                days: p.days.map((day) => ({
                    ...day,
                    items: day.items.map((item) =>
                        item.id === itemId ? { ...item, isCompleted: true } : item
                    ),
                })),
            };
        });
        try {
            await markItemComplete(plan.id, itemId);
        } catch {
            fetchPlan();
        }
    }, [plan, fetchPlan]);

    const handleCreatePlan = useCallback(async () => {
        setCreating(true);
        try {
            const newPlan = await createPlan({ mode: 'auto', durationDays: 7, dailyMinutes: 30 });
            setPlan(newPlan);
        } catch {
            // silently fail — user can retry from study-plan page
        } finally {
            setCreating(false);
        }
    }, []);

    if (meLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 size={32} className="animate-spin text-emerald-500" />
            </div>
        );
    }

    const stats = meData?.stats;

    return (
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
            {/* Greeting */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-zinc-100">
                    স্বাগতম{user?.name ? `, ${user.name}` : ''}!
                </h1>
                <p className="text-sm text-zinc-500">
                    আজকের লক্ষ্য পূরণ করতে প্র্যাকটিস শুরু করো
                </p>
            </div>

            {/* Two-column layout: right panel is first in DOM for mobile order */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">

                {/* Right panel — shows above content on mobile, sidebar on desktop */}
                <aside className="order-first space-y-4 lg:order-last lg:sticky lg:top-6 lg:self-start">
                    <DashboardStats stats={stats} plan={plan} />
                    <DashboardPlanPanel
                        plan={plan}
                        planLoading={planLoading}
                        onComplete={handleComplete}
                        onCreatePlan={handleCreatePlan}
                        creating={creating}
                    />
                </aside>

                {/* Left column — main content */}
                <div className="order-last min-w-0 space-y-6 lg:order-first">
                    <HomeGrid />

                    {recommendations && (
                        <RecommendationSection data={recommendations} />
                    )}

                    {dataLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 size={24} className="animate-spin text-zinc-600" />
                        </div>
                    ) : (
                        <div className="grid gap-4 lg:grid-cols-2">
                            {activity.length > 0 ? (
                                <RecentActivity items={activity} />
                            ) : (
                                <EmptyCard
                                    title="এখনো কোনো প্র্যাকটিস নেই"
                                    sub="প্রথম কুইজটি শুরু করো!"
                                />
                            )}
                            {progress.length > 0 ? (
                                <ExamProgressList items={progress} />
                            ) : (
                                <EmptyCard
                                    title="কোনো অগ্রগতি নেই"
                                    sub="কুইজ দিলে তোমার অগ্রগতি এখানে দেখাবে"
                                />
                            )}
                            <div className="lg:col-span-2">
                                <MiniLeaderboard entries={leaderboard} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function EmptyCard({ title, sub }: { title: string; sub: string }) {
    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center">
            <p className="text-sm font-medium text-zinc-400">{title}</p>
            <p className="mt-1 text-xs text-zinc-600">{sub}</p>
        </div>
    );
}

function RecommendationSection({ data }: { data: RecommendationsDto }) {
    const items = [
        data.weakSubject && { label: 'দুর্বল বিষয়', value: data.weakSubject.subjectName },
        data.lesson && { label: 'পড়ার পরামর্শ', value: `${data.lesson.lessonName} — ${data.lesson.subjectName}` },
        data.vocabulary && { label: 'আজকের শব্দ', value: `${data.vocabulary.name} — ${data.vocabulary.banglaTranslation}` },
        data.question && { label: 'অনুশীলন প্রশ্ন', value: data.question.name },
    ].filter(Boolean) as { label: string; value: string }[];

    if (items.length === 0) return null;

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">আজকের পরামর্শ</p>
            <div className="grid gap-2 sm:grid-cols-2">
                {items.map(({ label, value }) => (
                    <div key={label} className="rounded-lg border border-zinc-800 bg-zinc-950/50 px-3 py-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-600">{label}</p>
                        <p className="mt-0.5 text-sm text-zinc-300 line-clamp-2">{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
