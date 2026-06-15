"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, Lightbulb, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GameResultCard } from "@/components/vocabulary/game-result-card"
import { useVocabularyStore } from "@/lib/store/vocabulary-store"
import type { VocabWord } from "@/lib/types/vocabulary"

interface FillGapsGameProps {
  words: VocabWord[]
  difficulty: string
}

const LETTERS = ["A", "B", "C", "D"]

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function maskSentence(example: string, word: string): string {
  const pattern = new RegExp(word, "i")
  return example.replace(pattern, "_____")
}

export function FillGapsGame({ words, difficulty }: FillGapsGameProps) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const recordAttempt = useVocabularyStore((s) => s.recordAttempt)

  const word = words[index >= words.length ? 0 : index]

  const options = useMemo(() => {
    const distractors = shuffle(words.filter((w) => w.id !== word.id))
      .slice(0, 3)
      .map((w) => w.word)
    return shuffle([word.word, ...distractors])
  }, [word, words])

  if (index >= words.length) {
    return (
      <GameResultCard
        score={score}
        total={words.length}
        difficulty={difficulty}
        onRetry={() => {
          setIndex(0)
          setSelected(null)
          setScore(0)
        }}
      />
    )
  }

  const handleSelect = (option: string) => {
    if (selected) return
    setSelected(option)
    const isCorrect = option === word.word
    recordAttempt(word.id, isCorrect)
    if (isCorrect) setScore((s) => s + 1)
  }

  const handleNext = () => {
    setSelected(null)
    setIndex((i) => i + 1)
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted-foreground">
        প্রশ্ন {index + 1} / {words.length} · স্কোর: {score}
      </p>
      <Card>
        <CardContent className="space-y-2 py-6 text-center">
          <p className="text-lg font-medium">{maskSentence(word.example, word.word)}</p>
          <p className="text-sm text-muted-foreground">ফাঁকা জায়গায় সঠিক শব্দ বসাও</p>
        </CardContent>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option, i) => {
          let extraClass = "border-border hover:border-primary/50"
          if (selected) {
            if (option === word.word) extraClass = "border-green-500 bg-green-500/10"
            else if (option === selected) extraClass = "border-destructive bg-destructive/10"
          }
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors ${extraClass}`}
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                {LETTERS[i]}
              </span>
              <span className="flex-1">{option}</span>
              {selected && option === word.word && <CheckCircle2 className="size-4 shrink-0 text-green-600" />}
              {selected && option === selected && option !== word.word && (
                <XCircle className="size-4 shrink-0 text-destructive" />
              )}
            </button>
          )
        })}
      </div>
      {selected && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="flex items-start gap-2 py-3 text-sm">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-500" />
            <p>
              <span className="font-semibold">{word.word}</span>: {word.meaning}
            </p>
          </CardContent>
        </Card>
      )}
      {selected && (
        <div className="flex justify-center">
          <Button onClick={handleNext}>{index === words.length - 1 ? "ফলাফল দেখো" : "পরের প্রশ্ন"}</Button>
        </div>
      )}
    </div>
  )
}
