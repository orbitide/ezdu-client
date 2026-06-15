"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, Lightbulb, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GameResultCard } from "@/components/vocabulary/game-result-card"
import { useVocabularyStore } from "@/lib/store/vocabulary-store"
import type { VocabWord } from "@/lib/types/vocabulary"

interface SynonymAntonymGameProps {
  words: VocabWord[]
  difficulty: string
}

type Mode = "synonym" | "antonym" | "mixed"

interface Round {
  word: VocabWord
  kind: "synonym" | "antonym"
  answer: string
  options: string[]
}

const LETTERS = ["A", "B", "C", "D"]

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5)
}

function buildRounds(words: VocabWord[], mode: Mode): Round[] {
  const allTerms = words.flatMap((w) => [...w.synonyms, ...w.antonyms])

  return words
    .filter((w) => {
      if (mode === "synonym") return w.synonyms.length > 0
      if (mode === "antonym") return w.antonyms.length > 0
      return w.synonyms.length > 0 || w.antonyms.length > 0
    })
    .map((word) => {
      let kind: "synonym" | "antonym"
      if (mode === "synonym") kind = "synonym"
      else if (mode === "antonym") kind = "antonym"
      else kind = word.synonyms.length > 0 ? "synonym" : "antonym"

      const answer = kind === "synonym" ? word.synonyms[0] : word.antonyms[0]
      const distractors = shuffle(allTerms.filter((t) => t !== answer)).slice(0, 3)
      return { word, kind, answer, options: shuffle([answer, ...distractors]) }
    })
}

const modeOptions: { id: Mode; label: string }[] = [
  { id: "mixed", label: "মিশ্র" },
  { id: "synonym", label: "শুধু সমার্থক" },
  { id: "antonym", label: "শুধু বিপরীত" },
]

export function SynonymAntonymGame({ words, difficulty }: SynonymAntonymGameProps) {
  const [mode, setMode] = useState<Mode>("mixed")
  const rounds = useMemo(() => buildRounds(words, mode), [words, mode])
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const recordAttempt = useVocabularyStore((s) => s.recordAttempt)

  const handleModeChange = (next: Mode) => {
    setMode(next)
    setIndex(0)
    setSelected(null)
    setScore(0)
  }

  const modeToggle = (
    <div className="flex justify-center gap-2">
      {modeOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => handleModeChange(option.id)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            mode === option.id ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )

  if (index >= rounds.length) {
    return (
      <div className="space-y-4">
        {modeToggle}
        <GameResultCard
          score={score}
          total={rounds.length}
          difficulty={difficulty}
          onRetry={() => {
            setIndex(0)
            setSelected(null)
            setScore(0)
          }}
        />
      </div>
    )
  }

  const round = rounds[index]

  const handleSelect = (option: string) => {
    if (selected) return
    setSelected(option)
    const isCorrect = option === round.answer
    recordAttempt(round.word.id, isCorrect)
    if (isCorrect) setScore((s) => s + 1)
  }

  const handleNext = () => {
    setSelected(null)
    setIndex((i) => i + 1)
  }

  const allTerms = round.kind === "synonym" ? round.word.synonyms : round.word.antonyms

  return (
    <div className="space-y-4">
      {modeToggle}
      <p className="text-center text-sm text-muted-foreground">
        প্রশ্ন {index + 1} / {rounds.length} · স্কোর: {score}
      </p>
      <Card
        className={`overflow-hidden border-0 bg-gradient-to-br ${
          round.kind === "synonym" ? "from-primary to-primary/70" : "from-secondary to-secondary/70"
        }`}
      >
        <CardContent className="space-y-2 py-6 text-center text-primary-foreground">
          <Badge variant="ghost" className="bg-white/15 text-primary-foreground">
            {round.kind === "synonym" ? "SYNONYM" : "ANTONYM"}
          </Badge>
          <p className="text-2xl font-bold">{round.word.word}</p>
          <p className="text-sm opacity-80">{round.word.meaning}</p>
          <p className="text-sm opacity-90">
            {round.kind === "synonym" ? "এর সমার্থক শব্দ নির্বাচন করো" : "এর বিপরীত শব্দ নির্বাচন করো"}
          </p>
        </CardContent>
      </Card>
      <div className="grid gap-3 sm:grid-cols-2">
        {round.options.map((option, i) => {
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
              className={`flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors ${extraClass}`}
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                {LETTERS[i]}
              </span>
              <span className="flex-1">{option}</span>
              {selected && option === round.answer && <CheckCircle2 className="size-4 shrink-0 text-green-600" />}
              {selected && option === selected && option !== round.answer && (
                <XCircle className="size-4 shrink-0 text-destructive" />
              )}
            </button>
          )
        })}
      </div>
      {selected && allTerms.length > 0 && (
        <Card className="border-amber-500/30 bg-amber-500/5">
          <CardContent className="flex items-start gap-2 py-3 text-sm">
            <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-500" />
            <p>
              <span className="font-semibold">{round.kind === "synonym" ? "সমার্থক শব্দসমূহ" : "বিপরীত শব্দসমূহ"}: </span>
              {allTerms.join(", ")}
            </p>
          </CardContent>
        </Card>
      )}
      {selected && (
        <div className="flex justify-center">
          <Button onClick={handleNext}>{index === rounds.length - 1 ? "ফলাফল দেখো" : "পরের প্রশ্ন"}</Button>
        </div>
      )}
    </div>
  )
}
