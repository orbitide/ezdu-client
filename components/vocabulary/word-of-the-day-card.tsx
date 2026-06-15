import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DifficultyBadge } from "@/components/shared/difficulty-badge"
import { Sparkles } from "lucide-react"
import { vocabWords } from "@/lib/mock/vocabulary"

export function WordOfTheDayCard() {
  const dayIndex = new Date().getDate() % vocabWords.length
  const word = vocabWords[dayIndex]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          আজকের শব্দ
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <p className="text-lg font-semibold">{word.word}</p>
          <DifficultyBadge difficulty={word.difficulty} />
        </div>
        <p className="text-sm text-muted-foreground">{word.meaning}</p>
        <p className="text-sm italic text-muted-foreground">&ldquo;{word.example}&rdquo;</p>
        {word.synonyms.length > 0 && (
          <p className="text-xs text-green-700 dark:text-green-400">সমার্থক: {word.synonyms.join(", ")}</p>
        )}
      </CardContent>
    </Card>
  )
}
