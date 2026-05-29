import apiClient from '@/lib/api-client';
import type {
    QuizListDto,
    QuizDetailsDto,
    SaveUserQuizDto,
    UserQuizHistoryDto,
    UserQuizReviewDto,
    PagedList,
} from '@/types/api';

export interface QuizListParams {
    pageNumber?: number;
    pageSize?: number;
    subjectId?: string;
    classId?: string;
    search?: string;
}

export async function getQuizzes(params: QuizListParams = {}): Promise<PagedList<QuizListDto>> {
    const res = await apiClient.get('/quizzes', { params });
    return res.data?.data ?? res.data;
}

export async function getQuizDetails(quizId: string): Promise<QuizDetailsDto> {
    const res = await apiClient.get(`/quizzes/${quizId}/details`);
    return res.data?.data ?? res.data;
}

export async function getUpcomingQuiz(classId: string): Promise<QuizListDto | null> {
    const res = await apiClient.get(`/quizzes/upcomming/${classId}`);
    return res.data?.data ?? res.data ?? null;
}

export async function saveQuizResult(dto: SaveUserQuizDto): Promise<{ id: string; xpEarned: number }> {
    const res = await apiClient.post('/userquiz/save', dto);
    return res.data;
}

export async function getQuizReview(userQuizId: string): Promise<UserQuizReviewDto> {
    const res = await apiClient.get(`/userquiz/details/${userQuizId}`);
    return res.data?.data ?? res.data;
}

export async function getRetryQuestions(userQuizId: string): Promise<QuizDetailsDto> {
    const res = await apiClient.get(`/userquiz/details/${userQuizId}/retry`);
    return res.data?.data ?? res.data;
}

export async function getMyQuizHistory(page = 1, pageSize = 20): Promise<PagedList<UserQuizHistoryDto>> {
    const res = await apiClient.get('/users/me/quizzes', { params: { pageNumber: page, pageSize } });
    return res.data?.data ?? res.data;
}

export async function getQuestionsByLesson(lessonId: string): Promise<QuizDetailsDto> {
    const res = await apiClient.post('/questions/by-lesson-id', { lessonId });
    return res.data;
}

export async function getPresets(): Promise<QuizListDto[]> {
    const res = await apiClient.get('/presets');
    return res.data?.data ?? res.data;
}

export async function getPresetDetails(presetId: string): Promise<QuizDetailsDto> {
    const res = await apiClient.get(`/presets/${presetId}`);
    return res.data?.data ?? res.data;
}
