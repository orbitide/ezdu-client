import type { CompareProgressDto, DailyProgressDto } from '@/types/api';

const DAY_KEYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

function dayKey(isoDay: string): string {
    const normalized = isoDay.length === 10 ? `${isoDay}T00:00:00Z` : isoDay;
    const date = new Date(normalized);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function last7Days(items: DailyProgressDto[]): DailyProgressDto[] {
    const xpByDay = new Map(items.map((item) => [dayKey(item.day), item.xp]));
    const today = new Date();

    return Array.from({ length: 7 }, (_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (6 - index));
        const key = dayKey(date.toISOString());
        const weekday = date.getDay();
        const dayLabel = DAY_KEYS[weekday === 0 ? 6 : weekday - 1];
        return { day: dayLabel, xp: xpByDay.get(key) ?? 0 };
    });
}

export function normalizeWeeklyXp(data: CompareProgressDto): CompareProgressDto {
    return {
        me: last7Days(data.me ?? []),
        friend: last7Days(data.friend ?? []),
    };
}
