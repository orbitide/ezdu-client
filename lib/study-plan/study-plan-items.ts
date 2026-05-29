import type { StudyPlanDto } from '@/types/api';

/** Optimistic completion for a plan item (server updates via plan quiz submit). */
export function completePlanItem(plan: StudyPlanDto, itemId: string): StudyPlanDto {
    let completedItems = plan.completedItems;
    const days = plan.days.map((day) => ({
        ...day,
        items: day.items.map((item) => {
            if (item.id !== itemId || item.isCompleted) return item;
            completedItems += 1;
            return { ...item, isCompleted: true, status: 1 };
        }),
    }));

    return { ...plan, completedItems, days };
}
