import apiClient from '@/lib/api-client';
import type { ArchiveExamDto, ArchiveExamListItem, PagedList } from '@/types/api';

export interface ArchiveExamListParams {
    subjectId: string;
    pageNumber?: number;
    pageSize?: number;
    classId?: string;
    instituteId?: string;
    year?: number;
}

export async function getArchiveExams(
    params: ArchiveExamListParams,
): Promise<PagedList<ArchiveExamListItem>> {
    const res = await apiClient.get('/archiveexams', { params });
    return res.data?.data ?? res.data;
}

export async function getArchiveExamDetails(examId: string): Promise<ArchiveExamDto> {
    const res = await apiClient.get(`/archiveexams/details/${examId}`);
    return res.data?.data ?? res.data;
}
