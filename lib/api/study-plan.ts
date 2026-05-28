import apiClient from '@/lib/api-client';
import type { StudyPlanDto, CreateStudyPlanDto } from '@/types/api';

export async function getActivePlan(): Promise<StudyPlanDto | null> {
    const res = await apiClient.get('/study-plans');
    return res.data ?? null;
}

export async function createPlan(dto: CreateStudyPlanDto): Promise<StudyPlanDto> {
    const res = await apiClient.post('/study-plans', dto);
    return res.data;
}

export async function markItemComplete(planId: string, itemId: string): Promise<void> {
    await apiClient.patch(`/study-plans/${planId}/items/${itemId}`);
}

export async function deletePlan(planId: string): Promise<void> {
    await apiClient.delete(`/study-plans/${planId}`);
}
