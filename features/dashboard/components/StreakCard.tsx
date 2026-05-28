import { Flame } from 'lucide-react';

interface StreakCardProps {
    streak: number;
}

const DAYS = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];

export function StreakCard({ streak }: StreakCardProps) {
    const today = new Date().getDay();
    const completedDays = Array.from({ length: 7 }, (_, i) => {
        const dayOffset = (today - 6 + i + 7) % 7;
        return i < streak % 7 || streak >= 7;
    });

    return (
        <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4">
            <div className="flex items-center gap-2 mb-3">
                <Flame size={18} className="text-orange-400" />
                <span className="text-sm font-semibold text-orange-300">স্ট্রিক</span>
            </div>
            <div className="flex items-end gap-1">
                <span className="text-3xl font-bold text-orange-400">{streak}</span>
                <span className="mb-1 text-sm text-zinc-500">দিন</span>
            </div>
            <div className="mt-3 flex gap-1">
                {DAYS.map((day, i) => (
                    <div key={day} className="flex flex-1 flex-col items-center gap-1">
                        <div
                            className={`h-6 w-full rounded ${
                                completedDays[i] ? 'bg-orange-500' : 'bg-zinc-800'
                            }`}
                        />
                        <span className="text-[10px] text-zinc-600">{day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
