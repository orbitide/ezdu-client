'use client';

import { useEffect, useState } from 'react';
import { getActivePlan } from '@/lib/api/study-plan';
import { useAppDataStore } from '@/store/app-data.store';
import { DashboardStats } from '@/features/dashboard/components/DashboardStats';
import { DashboardPlanPanel } from '@/features/dashboard/components/DashboardPlanPanel';
import { UpcomingModelTestsCard } from '@/features/dashboard/components/UpcomingModelTestsCard';
import type { StudyPlanDto } from '@/types/api';

/**
 * The standard right rail, ported from the Orbitide reference
 * (`components/layout/default-right-rail.tsx`: StatsBar + TodaysPlanCard +
 * UpcomingModelTestsCard).
 *
 * Self-contained on purpose — it renders on ~20 routes, so it sources its own
 * data from the app-data store rather than requiring every page to thread
 * props through. The plan is only fetched when the preload didn't already
 * supply one.
 */
export function DefaultRightRail() {
    const userSummary = useAppDataStore((s) => s.userSummary);
    const storePlan = useAppDataStore((s) => s.studyPlan);
    const isPreloaded = useAppDataStore((s) => s.isPreloaded);
    const setStudyPlan = useAppDataStore((s) => s.setStudyPlan);

    const [plan, setPlan] = useState<StudyPlanDto | null>(storePlan);
    const [planLoading, setPlanLoading] = useState(false);

    useEffect(() => {
        setPlan(storePlan);
    }, [storePlan]);

    useEffect(() => {
        // Only fetch when the preload finished and produced no plan.
        if (!isPreloaded || storePlan !== null) return;

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
        // `storePlan` is deliberately excluded: setStudyPlan writes to it, and
        // re-running cleanup mid-fetch would strand planLoading at true.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPreloaded, setStudyPlan]);

    const stats = userSummary
        ? {
            xp: userSummary.totalXp,
            streak: userSummary.streak,
            coins: userSummary.coin,
            totalQuizzes: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            accuracy: 0,
        }
        : undefined;

    return (
        <>
            <DashboardStats stats={stats} plan={plan} />
            <DashboardPlanPanel plan={plan} planLoading={planLoading} />
            <UpcomingModelTestsCard />
        </>
    );
}
