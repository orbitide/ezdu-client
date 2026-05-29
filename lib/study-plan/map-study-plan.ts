import type { StudyPlanDto, StudyPlanDayDto, StudyPlanItemDto } from '@/types/api';

const MINUTES_PER_MOCK = 15;

/** YYYY-MM-DD in the user's local timezone (matches mobile date comparison). */
export function localDateKey(d: Date | string): string {
    const date = typeof d === 'string' ? new Date(d) : d;
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}

interface BackendStudyPlanItem {
    lessonId: number;
    lessonName?: string;
    subjectId?: number;
    subjectName?: string;
    date?: string;
    dayNumber: number;
    order: number;
    status?: number;
    lastAttemptAt?: string | null;
    lessonMasteryPercent?: number;
}

interface BackendStudyPlanDay {
    date: string;
    dayNumber: number;
    dailyMinutes?: number;
    items: BackendStudyPlanItem[];
}

interface BackendStudyPlanResponse {
    days?: BackendStudyPlanDay[];
}

export function mapStudyPlanResponse(raw: unknown): StudyPlanDto | null {
    if (!raw || typeof raw !== 'object') return null;

    const daysRaw = (raw as BackendStudyPlanResponse).days;
    if (!Array.isArray(daysRaw) || daysRaw.length === 0) return null;

    const days: StudyPlanDayDto[] = daysRaw.map((day) => {
        const dailyMinutes = day.dailyMinutes ?? MINUTES_PER_MOCK;
        const items: StudyPlanItemDto[] = (day.items ?? []).map((item) => ({
            id: `${item.lessonId}-${item.dayNumber}-${item.order}`,
            lessonId: String(item.lessonId),
            lessonName: item.lessonName ?? '',
            subjectId: item.subjectId,
            subjectName: item.subjectName,
            dayNumber: item.dayNumber,
            order: item.order,
            status: item.status ?? 0,
            estimatedMinutes: MINUTES_PER_MOCK,
            isCompleted: item.status === 1,
        }));

        return {
            dayNumber: day.dayNumber,
            date: day.date,
            dailyMinutes,
            items,
        };
    });

    const allItems = days.flatMap((d) => d.items);
    if (allItems.length === 0) return null;

    const completedItems = allItems.filter((i) => i.isCompleted).length;
    const sortedDays = [...days].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    return {
        id: 'active',
        title: 'স্টাডি প্ল্যান',
        mode: 'manual',
        status: 'active',
        startDate: sortedDays[0]!.date,
        endDate: sortedDays[sortedDays.length - 1]!.date,
        totalItems: allItems.length,
        completedItems,
        days: sortedDays,
    };
}
