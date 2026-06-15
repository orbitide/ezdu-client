"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, XCircle, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { VocabWord } from "@/lib/types/vocabulary"

interface WordMatchGameProps {
  words: VocabWord[]
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function WordMatchGame({ words }: WordMatchGameProps) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  const word = words[index]

  const options = useMemo(() => {
    const distractors = shuffle(words.filter((w) => w.id !== word.id))
      .slice(0, 3)
      .map((w) => w.meaning)
    return shuffle([word.meaning, ...distractors])
  }, [word, words])

  const handleSelect = (option: string) => {
    if (selected) return
    setSelected(option)
    if (option === word.meaning) {
      setScore((s) => s + 1)
    }
  }

  const handleNext = () => {
    setSelected(null)
    setIndex((i) => i + 1)
  }

  if (index >= words.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <Trophy className="size-10 text-amber-500" />
          <p className="text-xl font-bold">
            স্কোর: {score} / {words.length}
          </p>
          <p className="text-sm text-muted-foreground">দারুণ অনুশীলন হলো!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted-foreground">
        প্রশ্ন {index + 1} / {words.length} · স্কোর: {score}
      </p>
      <Card>
        <CardContent className="py-6 text-center">
          <p className="text-2xl font-bold">{word.word}</p>
          <p className="text-sm text-muted-foreground">শব্দটির সঠিক অর্থ নির্বাচন করো</p>
        </CardContent>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          let extraClass = "border-border hover:border-primary/50"
          if (selected) {
            if (option === word.meaning) extraClass = "border-green-500 bg-green-500/10"
            else if (option === selected) extraClass = "border-destructive bg-destructive/10"
          }
          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`flex items-center justify-between rounded-lg border p-3 text-left text-sm transition-colors ${extraClass}`}
            >
              {option}
              {selected && option === word.meaning && <CheckCircle2 className="size-4 text-green-600" />}
              {selected && option === selected && option !== word.meaning && (
                <XCircle className="size-4 text-destructive" />
              )}
            </button>
          )
        })}
      </div>
      {selected && (
        <div className="flex justify-center">
          <Button onClick={handleNext}>{index === words.length - 1 ? "ফলাফল দেখো" : "পরের প্রশ্ন"}</Button>
        </div>
      )}
    </div>
  )
}
