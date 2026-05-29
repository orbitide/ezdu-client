import apiClient from '@/lib/api-client';
import type { LeaderboardEntryDto, ClassRankDto } from '@/types/api';

export async function getLeaderboard(): Promise<LeaderboardEntryDto[]> {
    const res = await apiClient.get('/leaderboard');
    return res.data?.data ?? res.data;
}

export async function getClassRank(): Promise<ClassRankDto> {
    const res = await apiClient.get('/leaderboard/class-rank');
    return res.data?.data ?? res.data;
}

export async function getLeagueOutcome(): Promise<{ outcome: string; newLeague: string; xpEarned: number }> {
    const res = await apiClient.get('/leaderboard/outcome');
    return res.data?.data ?? res.data;
}

export async function acknowledgeLeagueOutcome(): Promise<void> {
    await apiClient.post('/leaderboard/outcome/acknowledge');
}

export async function joinLeague(): Promise<void> {
    await apiClient.post('/leaderboard/cohort/join');
}
