"use client"

import { useState } from "react"
import { Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { VocabWord } from "@/lib/types/vocabulary"

interface FillGapsGameProps {
  words: VocabWord[]
}

function maskSentence(example: string, word: string): string {
  const pattern = new RegExp(word, "i")
  return example.replace(pattern, "_____")
}

export function FillGapsGame({ words }: FillGapsGameProps) {
  const [index, setIndex] = useState(0)
  const [value, setValue] = useState("")
  const [checked, setChecked] = useState<"correct" | "incorrect" | null>(null)
  const [score, setScore] = useState(0)

  const word = words[index]

  const handleCheck = () => {
    if (checked) return
    const isCorrect = value.trim().toLowerCase() === word.word.toLowerCase()
    setChecked(isCorrect ? "correct" : "incorrect")
    if (isCorrect) setScore((s) => s + 1)
  }

  const handleNext = () => {
    setValue("")
    setChecked(null)
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
        <CardContent className="space-y-3 py-6 text-center">
          <p className="text-lg font-medium">{maskSentence(word.example, word.word)}</p>
          <p className="text-sm text-muted-foreground">অর্থ: {word.meaning}</p>
        </CardContent>
      </Card>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="সঠিক শব্দটি লেখো"
        disabled={!!checked}
      />
      {checked && (
        <p className={`text-center text-sm font-medium ${checked === "correct" ? "text-green-600" : "text-destructive"}`}>
          {checked === "correct" ? "সঠিক উত্তর!" : `ভুল উত্তর। সঠিক শব্দ: ${word.word}`}
        </p>
      )}
      <div className="flex justify-center">
        {!checked ? (
          <Button onClick={handleCheck} disabled={!value.trim()}>
            যাচাই করো
          </Button>
        ) : (
          <Button onClick={handleNext}>{index === words.length - 1 ? "ফলাফল দেখো" : "পরের প্রশ্ন"}</Button>
        )}
      </div>
    </div>
  )
}
