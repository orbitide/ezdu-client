"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, XCircle, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { VocabWord } from "@/lib/types/vocabulary"

interface SynonymAntonymGameProps {
  words: VocabWord[]
}

interface Round {
  word: VocabWord
  kind: "synonym" | "antonym"
  answer: string
  options: string[]
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildRounds(words: VocabWord[]): Round[] {
  const allTerms = words.flatMap((w) => [...w.synonyms, ...w.antonyms])

  return words
    .filter((w) => w.synonyms.length > 0 || w.antonyms.length > 0)
    .map((word) => {
      const kind: "synonym" | "antonym" = word.synonyms.length > 0 ? "synonym" : "antonym"
      const answer = kind === "synonym" ? word.synonyms[0] : word.antonyms[0]
      const distractors = shuffle(allTerms.filter((t) => t !== answer)).slice(0, 3)
      return { word, kind, answer, options: shuffle([answer, ...distractors]) }
    })
}

export function SynonymAntonymGame({ words }: SynonymAntonymGameProps) {
  const rounds = useMemo(() => buildRounds(words), [words])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)

  if (index >= rounds.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
          <Trophy className="size-10 text-amber-500" />
          <p className="text-xl font-bold">
            স্কোর: {score} / {rounds.length}
          </p>
          <p className="text-sm text-muted-foreground">দারুণ অনুশীলন হলো!</p>
        </CardContent>
      </Card>
    )
  }

  const round = rounds[index]

  const handleSelect = (option: string) => {
    if (selected) return
    setSelected(option)
    if (option === round.answer) setScore((s) => s + 1)
  }

  const handleNext = () => {
    setSelected(null)
    setIndex((i) => i + 1)
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted-foreground">
        প্রশ্ন {index + 1} / {rounds.length} · স্কোর: {score}
      </p>
      <Card>
        <CardContent className="py-6 text-center">
          <p className="text-2xl font-bold">{round.word.word}</p>
          <p className="text-sm text-muted-foreground">
            {round.kind === "synonym" ? "এর সমার্থক শব্দ নির্বাচন করো" : "এর বিপরীত শব্দ নির্বাচন করো"}
          </p>
        </CardContent>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        {round.options.map((option) => {
          let extraClass = "border-border hover:border-primary/50"
          if (selected) {
            if (option === round.answer) extraClass = "border-green-500 bg-green-500/10"
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
              {selected && option === round.answer && <CheckCircle2 className="size-4 text-green-600" />}
              {selected && option === selected && option !== round.answer && (
                <XCircle className="size-4 text-destructive" />
              )}
            </button>
          )
        })}
      </div>
      {selected && (
        <div className="flex justify-center">
          <Button onClick={handleNext}>{index === rounds.length - 1 ? "ফলাফল দেখো" : "পরের প্রশ্ন"}</Button>
        </div>
      )}
    </div>
  )
}
