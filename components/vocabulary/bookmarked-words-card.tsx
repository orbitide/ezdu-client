"use client"

import Link from "next/link"
import { Bookmark, ChevronRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useVocabularyStore } from "@/lib/store/vocabulary-store"
import { vocabWords } from "@/lib/mock/vocabulary"

export function BookmarkedWordsCard() {
  const bookmarkedIds = useVocabularyStore((s) => s.bookmarkedIds)
  const bookmarkedWords = vocabWords.filter((w) => bookmarkedIds.includes(w.id))

  if (bookmarkedWords.length === 0) return null

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Bookmark className="size-4 text-primary" />
          বুকমার্ক করা শব্দ
        </CardTitle>
        <Link href="/vocabulary/bank" className="text-xs font-medium text-primary hover:underline">
          সব দেখুন
        </Link>
      </CardHeader>
      <CardContent className="space-y-2">
        {bookmarkedWords.slice(0, 5).map((word) => (
          <Link
            key={word.id}
            href="/vocabulary/bank"
            className="flex items-center justify-between gap-2 rounded-lg border p-2.5 text-sm transition-colors hover:bg-accent"
          >
            <div>
              <p className="font-medium">{word.word}</p>
              <p className="text-xs text-muted-foreground">{word.meaning}</p>
            </div>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
