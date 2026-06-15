"use client"

import { Bookmark, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DifficultyBadge } from "@/components/shared/difficulty-badge"
import { useVocabularyStore } from "@/lib/store/vocabulary-store"
import type { VocabWord } from "@/lib/types/vocabulary"

interface VocabWordCardProps {
  word: VocabWord
}

export function VocabWordCard({ word }: VocabWordCardProps) {
  const isBookmarked = useVocabularyStore((s) => s.isBookmarked(word.id))
  const toggleBookmark = useVocabularyStore((s) => s.toggleBookmark)
  const mastery = useVocabularyStore((s) => s.getMastery(word.id))

  return (
    <Card>
      <CardContent className="space-y-2 py-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-lg font-semibold">{word.word}</p>
            <p className="text-sm text-muted-foreground">{word.meaning}</p>
          </div>
          <button
            type="button"
            onClick={() => toggleBookmark(word.id)}
            aria-label="বুকমার্ক"
            className="shrink-0 cursor-pointer"
          >
            <Bookmark className={`size-4 ${isBookmarked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
          </button>
        </div>
        <p className="text-sm italic text-muted-foreground">&ldquo;{word.example}&rdquo;</p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <DifficultyBadge difficulty={word.difficulty} />
          {mastery > 0 && (
            <Badge variant="ghost" className="gap-1 bg-primary/10 text-primary">
              <TrendingUp className="size-3" />
              {Math.round(mastery * 100)}%
            </Badge>
          )}
          {word.synonyms.length > 0 && (
            <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-green-700 dark:text-green-400">
              সমার্থক: {word.synonyms.join(", ")}
            </span>
          )}
          {word.antonyms.length > 0 && (
            <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-red-700 dark:text-red-400">
              বিপরীত: {word.antonyms.join(", ")}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
