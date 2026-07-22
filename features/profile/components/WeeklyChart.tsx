import type { DailyProgressDto } from '@/types/api';

const DAY_BN: Record<string, string> = {
    Mon: 'সো', Tue: 'মঙ', Wed: 'বু', Thu: 'বৃ',
    Fri: 'শু', Sat: 'শ', Sun: 'র',
    Monday: 'সো', Tuesday: 'মঙ', Wednesday: 'বু', Thursday: 'বৃ',
    Friday: 'শু', Saturday: 'শ', Sunday: 'র',
};

const ORDERED_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const CHART_H = 72;

interface WeeklyChartProps {
    data: DailyProgressDto[];
    compareData?: DailyProgressDto[];
    otherLabel?: string;
}

export function WeeklyChart({ data, compareData, otherLabel }: WeeklyChartProps) {
    // Normalise to 7-day ordered array
    const dataMap = new Map(data.map((d) => [d.day, d.xp]));
    const compareMap = new Map((compareData ?? []).map((d) => [d.day, d.xp]));

    // Determine the day labels to use: prefer data's own keys, else default Mon–Sun
    const dayKeys = data.length > 0
        ? data.map((d) => d.day)
        : ORDERED_DAYS;

    const allXp = [...dataMap.values(), ...compareMap.values()];
    const maxXp = Math.max(...allXp, 1);

    return (
        <div className="space-y-1.5">
            {/* Bars */}
            <div className="flex items-end gap-1 h-[72px]">
                {dayKeys.map((day, i) => {
                    const myXp = dataMap.get(day) ?? 0;
                    const theirXp = compareMap.get(day) ?? 0;
                    const myH = myXp > 0 ? Math.max((myXp / maxXp) * CHART_H, 3) : 2;
                    const theirH = theirXp > 0 ? Math.max((theirXp / maxXp) * CHART_H, 3) : 2;

                    return (
                        <div key={i} className="flex-1 flex items-end justify-center gap-0.5 h-full">
                            <div
                                className="flex-1 rounded-t bg-primary/70 min-w-0 transition-all"
                                style={{ height: myH }}
                            />
                            {compareData && (
                                <div
                                    className="flex-1 rounded-t bg-muted-foreground min-w-0 transition-all"
                                    style={{ height: theirH }}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Day labels */}
            <div className="flex gap-1">
                {dayKeys.map((day, i) => (
                    <p key={i} className="flex-1 text-center text-[9px] text-muted-foreground">
                        {DAY_BN[day] ?? day.slice(0, 2)}
                    </p>
                ))}
            </div>

            {/* Legend for compare mode */}
            {compareData && (
                <div className="flex items-center gap-4 pt-0.5">
                    <div className="flex items-center gap-1.5">
                        <div className="h-2 w-3 rounded-sm bg-primary/70" />
                        <span className="text-[10px] text-muted-foreground">আমি</span>
                    </div>
                    {otherLabel && (
                        <div className="flex items-center gap-1.5">
                            <div className="h-2 w-3 rounded-sm bg-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground">{otherLabel}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
