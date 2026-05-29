import apiClient from '@/lib/api-client';
import type { ClassDto, GroupDto, SubjectDto, LessonWithTopicsDto } from '@/types/api';

export async function getOnboardingClasses(segment?: number): Promise<ClassDto[]> {
    const res = await apiClient.get('/classes/onboarding', { params: segment ? { segment } : undefined });
    const result = res.data?.data ?? res.data;
    return result?.items ?? result;
}

export async function getOnboardingGroups(classId?: string): Promise<GroupDto[]> {
    const res = await apiClient.get('/groups/onboarding', { params: { classId } });
    const result = res.data?.data ?? res.data;
    return result?.items ?? result;
}

export async function getSubjects(classId?: string, groupId?: string): Promise<SubjectDto[]> {
    const res = await apiClient.get('/subjects', { params: { classId, groupId } });
    return res.data?.data ?? res.data;
}

export async function getLessonsWithTopics(subjectId: string): Promise<LessonWithTopicsDto[]> {
    const res = await apiClient.get('/lessons/withtopics', { params: { subjectId } });
    return res.data?.data ?? res.data;
}
