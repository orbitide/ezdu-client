"use client"

import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChallengeStatus } from "@/lib/types/challenge"

interface ChallengeOptionListProps {
  options: string[]
  correctIndex: number
  wrongOptionIndexes: number[]
  status: ChallengeStatus
  onSelect: (index: number) => void
}

export function ChallengeOptionList({
  options,
  correctIndex,
  wrongOptionIndexes,
  status,
  onSelect,
}: ChallengeOptionListProps) {
  const isCorrect = status === "correct"

  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isWrong = wrongOptionIndexes.includes(index)
        const isRevealedCorrect = isCorrect && index === correctIndex
        const isLastWrong = isWrong && index === wrongOptionIndexes[wrongOptionIndexes.length - 1]

        return (
          <button
            key={index}
            type="button"
            disabled={isCorrect || isWrong}
            onClick={() => onSelect(index)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors",
              "border-border hover:border-primary/50",
              isWrong && "border-destructive bg-destructive/10 hover:border-destructive",
              isRevealedCorrect && "border-green-500 bg-green-500/10",
              isLastWrong && "animate-challenge-shake",
              (isCorrect || isWrong) && "cursor-default"
            )}
          >
            <span className="flex-1">{option}</span>
            {isRevealedCorrect && <Check className="size-5 shrink-0 text-green-600" />}
            {isWrong && <X className="size-5 shrink-0 text-destructive" />}
          </button>
        )
      })}
    </div>
  )
}
