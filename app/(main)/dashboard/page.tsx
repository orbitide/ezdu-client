'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { Loader2 } from 'lucide-react';
import { getActivePlan } from '@/lib/api/study-plan';
import { HomeGrid } from '@/features/dashboard/components/HomeGrid';
import { RecentActivity } from '@/features/dashboard/components/RecentActivity';
import { DashboardStats } from '@/features/dashboard/components/DashboardStats';
import { DashboardPlanPanel } from '@/features/dashboard/components/DashboardPlanPanel';
import { MiniLeaderboard } from '@/features/dashboard/components/MiniLeaderboard';
import { DailyRevisionCard } from '@/features/dashboard/components/DailyRevisionCard';
import { UpcomingModelTestsCard } from '@/features/dashboard/components/UpcomingModelTestsCard';
import { TwoColumnShell } from '@/components/layout/two-column-shell';
import { PageContainer } from '@/components/layout/page-container';
import { useAuthStore } from '@/store/auth.store';
import { useAppDataStore } from '@/store/app-data.store';
import type { ActivityItem, ExamProgress } from '@/features/dashboard/types';
import type { ExamId } from '@/config/exams';
import type { UserQuizHistoryDto, SubjectMasteryDto, StudyPlanDto } from '@/types/api';
import type { RecommendationsDto } from '@/lib/api/recommendations';
import { ExamProgressList } from '@/app/(main)/dashboard/ExamProgress';
import { MathText } from '@/components/ui/math-text';

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
        completedTopics: item.masteredCount,
        totalTopics: item.totalQuestions,
        lastPracticed: 'সম্প্রতি',
    }));
}

export default function DashboardPage() {
    const {
        userSummary,
        recommendations,
        leaderboard,
        studyPlan: storePlan,
        quizHistory,
        subjectMastery,
        isPreloaded,
        setStudyPlan,
    } = useAppDataStore();
    const user = useAuthStore((s) => s.user);

    const [plan, setPlan] = useState<StudyPlanDto | null>(storePlan);
    const [planLoading, setPlanLoading] = useState(false);
    // Capture storePlan at mount so the secondary-fetch effect doesn't list
    // storePlan as a dep — that would cause cleanup to fire mid-fetch and
    // leave planLoading=true when setStudyPlan triggers a re-render.
    const storePlanAtMount = useRef(storePlan);

    useEffect(() => {
        setPlan(storePlan);
    }, [storePlan]);

    useEffect(() => {
        if (!isPreloaded || storePlanAtMount.current !== null) return;

        let cancelled = false;
        setPlanLoading(true);
        getActivePlan()
            .then((fresh) => {
                if (cancelled) return;
                setPlan(fresh);
                setStudyPlan(fresh);
            })
            .catch(() => {
                if (!cancelled) setPlan(null);
            })
            .finally(() => {
                if (!cancelled) setPlanLoading(false);
            });

        return () => { cancelled = true; };
    }, [isPreloaded, setStudyPlan]);

    const activity = useMemo(() => mapHistoryToActivity(quizHistory), [quizHistory]);
    const progress = useMemo(() => mapMasteryToProgress(subjectMastery), [subjectMastery]);

    if (!isPreloaded) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    const stats = userSummary ? {
        xp: userSummary.totalXp,
        streak: userSummary.streak,
        coins: userSummary.coin,
        totalQuizzes: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        accuracy: 0,
    } : undefined;

    return (
        <PageContainer>
            {/* Greeting */}
            <div className="mb-6">
                <h1 className="text-xl font-bold text-foreground">
                    স্বাগতম{user?.name ? `, ${user.name}` : ''}!
                </h1>
                <p className="text-sm text-muted-foreground">
                    আজকের লক্ষ্য পূরণ করতে প্র্যাকটিস শুরু করো
                </p>
            </div>

            <TwoColumnShell
                right={
                    <>
                        <DashboardStats stats={stats} plan={plan} />
                        <DashboardPlanPanel plan={plan} planLoading={planLoading} />
                        <UpcomingModelTestsCard />
                    </>
                }
            >
                <HomeGrid />

                <DailyRevisionCard />

                {recommendations && (
                    <RecommendationSection data={recommendations} />
                )}

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
            </TwoColumnShell>
        </PageContainer>
    );
}

function EmptyCard({ title, sub }: { title: string; sub: string }) {
    return (
        <div className="rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
        </div>
    );
}

function RecommendationSection({ data }: { data: RecommendationsDto }) {
    const items = [
        data.weakSubject && { label: 'দুর্বল বিষয়', value: data.weakSubject.subjectName },
        data.lesson && { label: 'পড়ার পরামর্শ', value: `${data.lesson.lessonName} — ${data.lesson.subjectName}` },
        data.vocabulary && { label: 'আজকের শব্দ', value: `${data.vocabulary.name} — ${data.vocabulary.banglaTranslation}` },
        data.question && { label: 'অনুশীলন প্রশ্ন', value: data.question.name, hasMath: true },
    ].filter(Boolean) as { label: string; value: string; hasMath?: boolean }[];

    if (items.length === 0) return null;

    return (
        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">আজকের পরামর্শ</p>
            <div className="grid gap-2 sm:grid-cols-2">
                {items.map(({ label, value, hasMath }) => (
                    <div key={label} className="rounded-lg border border-border bg-background/50 px-3 py-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
                            {hasMath ? <MathText text={value} /> : value}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
