import Link from "next/link"
import { ChevronRight, BookMarked } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { vocabDifficultyLabels, getWordsByDifficulty } from "@/lib/mock/vocabulary"
import type { VocabDifficulty } from "@/lib/types/vocabulary"

const difficulties: VocabDifficulty[] = ["easy", "medium", "hard"]

export function VocabHub() {
  return (
    <div className="space-y-3">
      {difficulties.map((difficulty) => {
        const count = getWordsByDifficulty(difficulty).length
        return (
          <Link key={difficulty} href={`/vocabulary/${difficulty}`}>
            <Card className="transition hover:bg-muted/50">
              <CardContent className="flex items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-medium">{vocabDifficultyLabels[difficulty]}</p>
                  <p className="text-xs text-muted-foreground">{count} টি শব্দ</p>
                </div>
                <ChevronRight className="size-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        )
      })}
      <Link href="/vocabulary/bank">
        <Card className="border-primary/30 bg-primary/5 transition hover:bg-primary/10">
          <CardContent className="flex items-center justify-between gap-3 py-4">
            <div className="flex items-center gap-3">
              <BookMarked className="size-5 text-primary" />
              <div>
                <p className="font-medium">শব্দ ভাণ্ডার</p>
                <p className="text-xs text-muted-foreground">সব শব্দ খুঁজো ও বুকমার্ক করো</p>
              </div>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
