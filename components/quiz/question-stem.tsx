import { DifficultyBadge } from "@/components/shared/difficulty-badge"
import type { Question } from "@/lib/types/question"

interface QuestionStemProps {
  question: Question
}

export function QuestionStem({ question }: QuestionStemProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
          {question.subject}
        </span>
        <span className="text-xs text-muted-foreground">{question.topic}</span>
        <DifficultyBadge difficulty={question.difficulty} />
      </div>
      <p className="text-lg font-semibold leading-relaxed">{question.stem}</p>
    </div>
  )
}
