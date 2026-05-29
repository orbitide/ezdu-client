import apiClient from '@/lib/api-client';
import type { FriendDto, FeedItemDto } from '@/types/api';

export async function getFeed(): Promise<FeedItemDto[]> {
    const res = await apiClient.get('/feed');
    return res.data?.data ?? res.data;
}

export async function registerFcmToken(token: string): Promise<void> {
    await apiClient.post('/feed/fcm-token', { token });
}

export async function getFollowing(): Promise<FriendDto[]> {
    const res = await apiClient.get('/userfollow/following');
    return res.data?.data ?? res.data;
}

export async function followUser(userId: string): Promise<void> {
    await apiClient.get(`/userfollow/follow/${userId}`);
}

export async function unfollowUser(userId: string): Promise<void> {
    await apiClient.get(`/userfollow/unfollow/${userId}`);
}
