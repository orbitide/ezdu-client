import apiClient from '@/lib/api-client';
import type { VocabularyDto } from '@/types/api';

export type VocabDifficulty = 'easy' | 'medium' | 'advanced' | 'competitive';

export async function getVocabulary(difficulty?: VocabDifficulty, page = 1, pageSize = 50): Promise<VocabularyDto[]> {
    const res = await apiClient.get('/vocabulary', {
        params: { difficulty, pageNumber: page, pageSize },
    });
    return res.data;
}
