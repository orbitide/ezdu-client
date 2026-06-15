"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, RotateCw } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DifficultyBadge } from "@/components/shared/difficulty-badge"
import type { VocabWord } from "@/lib/types/vocabulary"

interface FlashcardDeckProps {
  words: VocabWord[]
}

export function FlashcardDeck({ words }: FlashcardDeckProps) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const word = words[index]

  const goNext = () => {
    setFlipped(false)
    setIndex((i) => Math.min(i + 1, words.length - 1))
  }

  const goPrev = () => {
    setFlipped(false)
    setIndex((i) => Math.max(i - 1, 0))
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted-foreground">
        কার্ড {index + 1} / {words.length}
      </p>

      <Card
        className="min-h-64 cursor-pointer select-none"
        onClick={() => setFlipped((f) => !f)}
      >
        <CardContent className="flex h-64 flex-col items-center justify-center gap-3 text-center">
          {!flipped ? (
            <>
              <p className="text-3xl font-bold">{word.word}</p>
              <DifficultyBadge difficulty={word.difficulty} />
            </>
          ) : (
            <>
              <p className="text-xl font-semibold">{word.meaning}</p>
              <p className="text-sm italic text-muted-foreground">&ldquo;{word.example}&rdquo;</p>
            </>
          )}
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RotateCw className="size-3.5" />
            কার্ডে ক্লিক করে উল্টাও
          </p>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={goPrev} disabled={index === 0} className="gap-1.5">
          <ChevronLeft className="size-4" />
          আগের
        </Button>
        <Button onClick={goNext} disabled={index === words.length - 1} className="gap-1.5">
          পরের
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}
