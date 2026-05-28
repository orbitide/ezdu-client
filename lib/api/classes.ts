import apiClient from '@/lib/api-client';
import type { ClassDto, GroupDto, SubjectDto, LessonWithTopicsDto } from '@/types/api';

export async function getOnboardingClasses(): Promise<ClassDto[]> {
    const res = await apiClient.get('/classes/onboarding');
    return res.data;
}

export async function getOnboardingGroups(classId?: string): Promise<GroupDto[]> {
    const res = await apiClient.get('/groups/onboarding', { params: { classId } });
    return res.data;
}

export async function getSubjects(classId?: string, groupId?: string): Promise<SubjectDto[]> {
    const res = await apiClient.get('/subjects', { params: { classId, groupId } });
    return res.data;
}

export async function getLessonsWithTopics(subjectId: string): Promise<LessonWithTopicsDto[]> {
    const res = await apiClient.get('/lessons/withtopics', { params: { subjectId } });
    return res.data;
}
