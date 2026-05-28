import apiClient from '@/lib/api-client';

export interface VocabRec {
    name: string;
    banglaTranslation: string;
}

export interface QuestionRec {
    name: string;
}

export interface WeakSubjectRec {
    subjectName: string;
    masteryScore: number;
}

export interface WeakLessonRec {
    lessonName: string;
    subjectName: string;
}

export interface RecommendationsDto {
    vocabulary: VocabRec;
    question: QuestionRec;
    weakSubject: WeakSubjectRec | null;
    lesson: WeakLessonRec | null;
}

export async function getRecommendations(): Promise<RecommendationsDto> {
    const res = await apiClient.get('/recommendations');
    return res.data?.data ?? res.data;
}
