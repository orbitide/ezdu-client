"use client"

import { StatsBar } from "@/components/home/stats-bar"
import { WordOfTheDayCard } from "@/components/vocabulary/word-of-the-day-card"
import { BookmarkedWordsCard } from "@/components/vocabulary/bookmarked-words-card"
import { GoProCard } from "@/components/shop/go-pro-card"
import { useProgressStore } from "@/lib/store/progress-store"

export function VocabularyRightRail() {
  const isPremium = useProgressStore((s) => s.isPremium)

  return (
    <>
      <StatsBar />
      <WordOfTheDayCard />
      <BookmarkedWordsCard />
      {!isPremium && (
        <GoProCard
          title="ভোকাবুলারি বিল্ডার আনলক করো"
          description="প্রগ্রেস সেভ করো এবং পার্সোনালাইজড শব্দ তালিকা পাও।"
        />
      )}
    </>
  )
}
