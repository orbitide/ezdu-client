import axios from 'axios';
import apiClient from '@/lib/api-client';
import { mapStudyPlanResponse } from '@/lib/study-plan/map-study-plan';
import type { StudyPlanDto, SaveStudyPlanItemDto } from '@/types/api';

export async function getActivePlan(): Promise<StudyPlanDto | null> {
    try {
        const res = await apiClient.get('/study-plans');
        const raw = res.data?.data ?? res.data;
        return mapStudyPlanResponse(raw);
    } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
            return null;
        }
        throw err;
    }
}

export async function savePlan(items: SaveStudyPlanItemDto[]): Promise<StudyPlanDto> {
    const res = await apiClient.post('/study-plans/save', { items });
    const raw = res.data?.data ?? res.data;
    const plan = mapStudyPlanResponse(raw);
    if (!plan) {
        throw new Error('Invalid study plan response');
    }
    return plan;
}

export async function deleteActivePlan(): Promise<void> {
    await apiClient.delete('/study-plans');
}
