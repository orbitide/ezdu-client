import { Clock } from "lucide-react"
import { formatDuration } from "@/lib/utils/quiz"

interface QuizTimerProps {
  secondsLeft: number
}

export function QuizTimer({ secondsLeft }: QuizTimerProps) {
  const isLow = secondsLeft <= 60

  return (
    <span
      className={`flex items-center gap-1.5 text-sm font-semibold tabular-nums ${
        isLow ? "text-destructive" : "text-foreground"
      }`}
    >
      <Clock className="size-4" />
      {formatDuration(secondsLeft)}
    </span>
  )
}
