import apiClient from '@/lib/api-client';
import type {
    UserDto,
    UserStatsDto,
    SubjectMasteryDto,
    UpdateUserDto,
    AvatarConfig,
    UserConfigDto,
    PagedList,
    UserQuizHistoryDto,
} from '@/types/api';

export interface UserSummary {
    user: UserDto;
    stats: UserStatsDto;
    config: UserConfigDto;
}

export async function getMe(): Promise<UserSummary> {
    const res = await apiClient.get('/users/me');
    return res.data;
}

export async function getUserByUsername(username: string): Promise<UserDto> {
    const res = await apiClient.get(`/users/u/${username}`);
    return res.data;
}

export async function getUserDetails(userId: string): Promise<UserDto> {
    const res = await apiClient.get(`/users/details/${userId}`);
    return res.data;
}

export async function findUsers(query: string): Promise<UserDto[]> {
    const res = await apiClient.get(`/users/find/${encodeURIComponent(query)}`);
    return res.data;
}

export async function getMyStats(): Promise<UserStatsDto> {
    const res = await apiClient.get('/users/me/stats');
    return res.data;
}

export async function getMySubjectMastery(): Promise<PagedList<SubjectMasteryDto>> {
    const res = await apiClient.get('/users/me/subject-mastery');
    return res.data;
}

export async function getMyQuizHistory(page = 1, pageSize = 20): Promise<PagedList<UserQuizHistoryDto>> {
    const res = await apiClient.get('/users/me/quizzes', { params: { pageNumber: page, pageSize } });
    return res.data;
}

export async function updateProfile(dto: UpdateUserDto): Promise<UserDto> {
    const res = await apiClient.put('/users/update', dto);
    return res.data;
}

export async function saveAvatar(config: AvatarConfig): Promise<void> {
    await apiClient.post('/users/avatar', config);
}

export async function getUserConfig(): Promise<UserConfigDto> {
    const res = await apiClient.get('/userconfig');
    return res.data;
}

export async function saveUserConfig(config: Partial<UserConfigDto>): Promise<void> {
    await apiClient.post('/userconfig/save', config);
}
