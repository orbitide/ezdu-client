'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getBookmarkedIds, toggleBookmark } from '@/lib/api/quiz';

interface BookmarkStore {
    bookmarkedIds: string[];
    loaded: boolean;
    toggle: (id: string) => Promise<void>;
    loadBookmarks: () => Promise<void>;
}

export const useBookmarkStore = create<BookmarkStore>()(
    persist(
        (set, get) => ({
            bookmarkedIds: [],
            loaded: false,

            toggle: async (id) => {
                const prev = get().bookmarkedIds;
                const wasBookmarked = prev.includes(id);
                set({
                    bookmarkedIds: wasBookmarked
                        ? prev.filter((b) => b !== id)
                        : [...prev, id],
                });
                try {
                    await toggleBookmark(id);
                } catch {
                    set({ bookmarkedIds: prev });
                }
            },

            loadBookmarks: async () => {
                if (get().loaded) return;
                try {
                    const ids = await getBookmarkedIds();
                    set({ bookmarkedIds: ids, loaded: true });
                } catch {
                    set({ loaded: true });
                }
            },
        }),
        {
            name: 'ezdu-bookmarks',
            storage: createJSONStorage(() => localStorage),
            partialize: (s) => ({ bookmarkedIds: s.bookmarkedIds }),
        }
    )
);
