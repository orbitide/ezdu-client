import type { QuizAnswer } from "@/lib/types/quiz"

interface QuestionIndicatorBarProps {
  questionIds: string[]
  answers: Record<string, QuizAnswer>
  currentIndex: number
  onJump: (index: number) => void
}

export function QuestionIndicatorBar({ questionIds, answers, currentIndex, onJump }: QuestionIndicatorBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {questionIds.map((id, index) => {
        const answer = answers[id]
        const isCurrent = index === currentIndex
        const isAnswered = answer?.selectedIndex !== null && answer?.selectedIndex !== undefined
        const isFlagged = answer?.flagged

        let className = "border-border bg-background text-foreground"
        if (isCurrent) {
          className = "border-primary bg-primary text-primary-foreground"
        } else if (isFlagged) {
          className = "border-amber-500 bg-amber-500/10 text-amber-600"
        } else if (isAnswered) {
          className = "border-primary/40 bg-primary/10 text-primary"
        }

        return (
          <button
            key={id}
            type="button"
            onClick={() => onJump(index)}
            className={`flex size-9 items-center justify-center rounded-md border text-sm font-medium transition-colors ${className}`}
          >
            {index + 1}
          </button>
        )
      })}
    </div>
  )
}
