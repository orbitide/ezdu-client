import apiClient from '@/lib/api-client';
import type { ProgressDto, MonthlyStreakDto, DailyRevisionDto, RecommendationDto } from '@/types/api';

export async function getProgress(): Promise<ProgressDto> {
    const res = await apiClient.get('/progress');
    return res.data;
}

export async function getStreakCalendar(): Promise<MonthlyStreakDto> {
    const res = await apiClient.get('/progress/calendar');
    return res.data;
}

export async function claimAdsReward(): Promise<{ coinsEarned: number }> {
    const res = await apiClient.get('/progress/adsreward');
    return res.data;
}

export async function getRecommendations(): Promise<RecommendationDto> {
    const res = await apiClient.get('/recommendation');
    return res.data;
}

export async function getDailyRevision(): Promise<DailyRevisionDto> {
    const res = await apiClient.get('/recommendation/daily-revision');
    return res.data;
}
