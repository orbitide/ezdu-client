import { LeaderboardTable } from '@/features/leaderboard/components/LeaderboardTable';
import { DUMMY_LEADERBOARD } from '@/features/leaderboard/types';
import { Trophy } from 'lucide-react';

export default function LeaderboardPage() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-6 space-y-5 lg:px-6">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                    <Trophy size={20} className="text-yellow-400" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-zinc-100">লিডারবোর্ড</h1>
                    <p className="text-xs text-zinc-500">এই সপ্তাহের সেরা শিক্ষার্থীরা</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 rounded-xl bg-zinc-900 p-1">
                {['সাপ্তাহিক', 'মাসিক', 'সর্বকালীন'].map((tab, i) => (
                    <button
                        key={tab}
                        className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${
                            i === 0 ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <LeaderboardTable entries={DUMMY_LEADERBOARD} />
        </div>
    );
}
