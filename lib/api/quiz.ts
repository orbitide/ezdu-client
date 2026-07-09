import apiClient from '@/lib/api-client';
import type {
    QuizListDto,
    QuizDetailsDto,
    SaveUserQuizDto,
    UserQuizHistoryDto,
    UserQuizReviewDto,
    UserQuizSubmissionDto,
    UserQuizResultDto,
    PagedList,
    PresetDto,
} from '@/types/api';

export interface QuizListParams {
    pageNumber?: number;
    pageSize?: number;
    subjectId?: string;
    classId?: string;
    search?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeQuiz(item: any): QuizListDto {
    return {
        id: String(item.id),
        title: item.title ?? item.name,
        subjectId: item.subjectId ? String(item.subjectId) : undefined,
        subjectName: item.subjectName ?? undefined,
        questionCount: item.questionCount ?? 0,
        duration: item.duration ?? item.durationInMinutes ?? undefined,
        difficulty: item.difficulty ?? undefined,
        scheduledAt: item.scheduledAt ?? item.startTime ?? undefined,
        isCompleted: item.isCompleted ?? undefined,
    };
}

export async function getQuizzes(params: QuizListParams = {}): Promise<PagedList<QuizListDto>> {
    const res = await apiClient.get('/quizzes', { params });
    const raw = res.data?.data ?? res.data;
    if (Array.isArray(raw)) {
        const items = raw.map(normalizeQuiz);
        return { items, totalCount: items.length, pageNumber: 1, pageSize: items.length };
    }
    return { ...raw, items: (raw.items ?? []).map(normalizeQuiz) };
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

export async function submitUserQuiz(dto: UserQuizSubmissionDto): Promise<UserQuizResultDto> {
    const res = await apiClient.post('/userquiz/save', {
        quizType: dto.quizType,
        quizId: dto.quizId,
        subjectId: dto.subjectId,
        durationSeconds: dto.durationSeconds,
        submissions: dto.submissions.map((s) => ({
            qId: s.qId,
            opId: s.opId,
        })),
        lessonId: dto.lessonId ?? '',
    });
    return res.data?.data ?? res.data;
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
    // Backend binds `[FromBody] Guid lessonId` — send the raw string as a JSON body,
    // not an object. Axios won't auto-serialize a bare primitive, so set the header.
    const res = await apiClient.post('/questions/by-lesson-id', JSON.stringify(lessonId), {
        headers: { 'Content-Type': 'application/json' },
    });
    const raw = res.data?.data ?? res.data;
    const items = raw?.questions ?? raw?.items ?? (Array.isArray(raw) ? raw : []);
    return {
        id: 'challenge',
        title: 'চ্যালেঞ্জ',
        questions: Array.isArray(items) ? items.map(normalizeQuestion) : [],
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeQuestion(q: any) {
    return {
        id: String(q.id),
        text: q.text ?? q.name ?? '',
        options: (q.options ?? []).map((o: any) => ({
            id: String(o.id),
            text: o.text ?? o.name ?? '',
            isCorrect: o.isCorrect ?? false,
        })),
        explanation: q.explanation ?? undefined,
        subjectId: q.subjectId ? String(q.subjectId) : undefined,
        subjectName: q.subjectName ?? undefined,
        topicName: q.topicName ?? undefined,
        difficulty: q.difficulty ?? undefined,
    };
}

export async function getQuestionCountByTopicIds(topicIds: string[]): Promise<number> {
    const res = await apiClient.post('/questions/count-by-topic-ids', topicIds);
    const raw = res.data?.data ?? res.data;
    return raw?.count ?? raw ?? 0;
}

export async function getQuestionsByTopicIds(topicIds: string[], limit?: number): Promise<QuizDetailsDto> {
    const res = await apiClient.post(
        '/questions/by-topic-ids',
        topicIds,
        { params: limit ? { limit } : undefined },
    );
    const raw = res.data?.data ?? res.data;
    const items = raw?.items ?? raw ?? [];
    return {
        id: 'mock',
        title: 'মক কুইজ',
        questions: items.map(normalizeQuestion),
    };
}

export async function getPresets(params?: { classId?: string; groupId?: string }): Promise<PresetDto[]> {
    const query: Record<string, string> = { pageSize: '50' };
    if (params?.classId) query.classId = params.classId;
    if (params?.groupId) query.groupId = params.groupId;
    const res = await apiClient.get('/presets', { params: query });
    const raw = res.data?.data ?? res.data;
    return raw?.items ?? raw ?? [];
}

export async function getPresetDetail(presetId: string): Promise<PresetDto> {
    const res = await apiClient.get(`/presets/${presetId}`);
    return res.data?.data ?? res.data;
}

export async function getQuestionsBySubjectIds(
    subjectCounts: Array<{ subjectId: string; count: number }>,
): Promise<QuizDetailsDto> {
    const res = await apiClient.post('/questions/by-subject-ids', subjectCounts);
    const raw = res.data?.data ?? res.data;
    const items = raw?.items ?? raw ?? [];
    return {
        id: 'preset',
        title: 'প্রিসেট কুইজ',
        questions: items.map(normalizeQuestion),
    };
}

export async function getBookmarkedIds(): Promise<string[]> {
    const res = await apiClient.get('/questions/bookmarks');
    const raw = res.data?.data ?? res.data;
    const ids = Array.isArray(raw) ? raw : (raw?.ids ?? raw?.items ?? []);
    return ids.map(String);
}

export async function toggleBookmark(questionId: string): Promise<{ bookmarked: boolean }> {
    const res = await apiClient.post(`/questions/${questionId}/bookmark`);
    return res.data?.data ?? res.data ?? { bookmarked: true };
}

export async function reportQuestion(questionId: string, reason: number, comment?: string): Promise<void> {
    await apiClient.post('/reports', {
        type: 'question',
        entityId: questionId,
        reason,
        comment: comment ?? null,
    });
}
