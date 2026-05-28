import { StatsCard } from '@/features/dashboard/components/StatsCard';
import { StreakCard } from '@/features/dashboard/components/StreakCard';
import { RecentActivity } from '@/features/dashboard/components/RecentActivity';
import { QuickStart } from '@/features/dashboard/components/QuickStart';
import { ExamProgressList } from '@/features/dashboard/components/ExamProgress';
import { DUMMY_STATS, DUMMY_ACTIVITY, DUMMY_PROGRESS } from '@/features/dashboard/types';
import { Flame, Target, Zap, Trophy } from 'lucide-react';

export default function DashboardPage() {
    const stats = DUMMY_STATS;

    return (
        <div className="mx-auto max-w-5xl px-4 py-6 space-y-6 lg:px-6">
            {/* Greeting */}
            <div>
                <h1 className="text-xl font-bold text-zinc-100">
                    স্বাগতম! 👋
                </h1>
                <p className="text-sm text-zinc-500">আজকের লক্ষ্য পূরণ করতে প্র্যাকটিস শুরু করো</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <StatsCard
                    label="স্ট্রিক"
                    value={`${stats.streak} দিন`}
                    icon={<Flame size={16} />}
                    trend="সেরা রেকর্ড!"
                    trendUp
                    colorClass="text-orange-400"
                />
                <StatsCard
                    label="আজকের প্রশ্ন"
                    value={stats.questionsToday}
                    icon={<Target size={16} />}
                    trend="৬ বাকি"
                    trendUp={false}
                    colorClass="text-blue-400"
                />
                <StatsCard
                    label="নির্ভুলতা"
                    value={`${stats.accuracy}%`}
                    icon={<Zap size={16} />}
                    trend="+3% এই সপ্তাহে"
                    trendUp
                    colorClass="text-emerald-400"
                />
                <StatsCard
                    label="মোট XP"
                    value={stats.xp.toLocaleString()}
                    icon={<Trophy size={16} />}
                    colorClass="text-yellow-400"
                />
            </div>

            {/* Streak + Quick Start */}
            <div className="grid gap-4 lg:grid-cols-3">
                <StreakCard streak={stats.streak} />
                <div className="lg:col-span-2">
                    <QuickStart />
                </div>
            </div>

            {/* Recent activity + Exam progress */}
            <div className="grid gap-4 lg:grid-cols-2">
                <RecentActivity items={DUMMY_ACTIVITY} />
                <ExamProgressList items={DUMMY_PROGRESS} />
            </div>
        </div>
    );
}
