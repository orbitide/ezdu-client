"use client"

import { useState } from "react"
import { BookOpen, Lightbulb, Quote, RotateCw, ThumbsDown, ThumbsUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GameResultCard } from "@/components/vocabulary/game-result-card"
import { useVocabularyStore } from "@/lib/store/vocabulary-store"
import type { VocabWord } from "@/lib/types/vocabulary"

interface FlashcardDeckProps {
  words: VocabWord[]
  difficulty: string
}

export function FlashcardDeck({ words, difficulty }: FlashcardDeckProps) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [known, setKnown] = useState(0)
  const recordAttempt = useVocabularyStore((s) => s.recordAttempt)
  const getMastery = useVocabularyStore((s) => s.getMastery)

  if (index >= words.length) {
    return (
      <GameResultCard
        score={known}
        total={words.length}
        difficulty={difficulty}
        onRetry={() => {
          setIndex(0)
          setFlipped(false)
          setKnown(0)
        }}
      />
    )
  }

  const word = words[index]
  const mastery = getMastery(word.id)
  const statusLabel = mastery >= 0.8 ? "Mastered" : mastery >= 0.4 ? "Reviewing" : "Learning"

  const handleAnswer = (isKnown: boolean) => {
    recordAttempt(word.id, isKnown)
    if (isKnown) setKnown((k) => k + 1)
    setFlipped(false)
    setIndex((i) => i + 1)
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted-foreground">
        কার্ড {index + 1} / {words.length}
      </p>

      <Card
        className="min-h-72 cursor-pointer select-none overflow-hidden border-0"
        onClick={() => setFlipped((f) => !f)}
      >
        {!flipped ? (
          <CardContent className="flex h-72 flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary to-primary/70 text-center text-primary-foreground">
            <BookOpen className="size-8 opacity-80" />
            <p className="text-4xl font-bold">{word.word}</p>
            <Badge variant="ghost" className="bg-white/15 text-primary-foreground">
              {statusLabel}
            </Badge>
            <p className="flex items-center gap-1.5 text-xs opacity-80">
              <RotateCw className="size-3.5" />
              অর্থ দেখতে ক্লিক করো
            </p>
          </CardContent>
        ) : (
          <CardContent className="flex h-72 flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-2xl font-bold text-primary">{word.word}</p>
            <div className="flex items-center gap-1.5 text-sm font-medium">
              <Lightbulb className="size-4 text-amber-500" />
              {word.meaning}
            </div>
            <div className="flex items-start gap-1.5 text-sm italic text-muted-foreground">
              <Quote className="mt-0.5 size-3.5 shrink-0" />
              &ldquo;{word.example}&rdquo;
            </div>
            <p className="flex items-center gap-1.5 pt-2 text-xs text-muted-foreground">
              <RotateCw className="size-3.5" />
              আবার ক্লিক করে উল্টাও
            </p>
          </CardContent>
        )}
      </Card>

      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => handleAnswer(false)}
          className="flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive transition hover:bg-destructive/20"
        >
          <ThumbsDown className="size-4" />
          জানি না
        </button>
        <button
          type="button"
          onClick={() => handleAnswer(true)}
          className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary/20"
        >
          <ThumbsUp className="size-4" />
          জানি
        </button>
      </div>
    </div>
  )
}
