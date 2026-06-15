import { Bookmark } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DifficultyBadge } from "@/components/shared/difficulty-badge"
import type { VocabWord } from "@/lib/types/vocabulary"

interface VocabWordCardProps {
  word: VocabWord
}

export function VocabWordCard({ word }: VocabWordCardProps) {
  return (
    <Card>
      <CardContent className="space-y-2 py-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-lg font-semibold">{word.word}</p>
            <p className="text-sm text-muted-foreground">{word.meaning}</p>
          </div>
          <div className="flex items-center gap-2">
            <DifficultyBadge difficulty={word.difficulty} />
            <Bookmark className={`size-4 ${word.bookmarked ? "fill-primary text-primary" : "text-muted-foreground"}`} />
          </div>
        </div>
        <p className="text-sm italic text-muted-foreground">&ldquo;{word.example}&rdquo;</p>
        <div className="flex flex-wrap gap-2 text-xs">
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
