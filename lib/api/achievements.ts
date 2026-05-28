import apiClient from '@/lib/api-client';
import type { AchievementDto } from '@/types/api';

export async function getAchievements(): Promise<AchievementDto[]> {
    const res = await apiClient.get('/achievements');
    return res.data;
}
