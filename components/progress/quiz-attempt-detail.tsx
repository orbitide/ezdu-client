import { CheckCircle2, XCircle, MinusCircle, Sparkles, Coins, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { formatDuration } from "@/lib/utils/quiz"
import type { QuizAttempt } from "@/lib/types/progress"

interface QuizAttemptDetailProps {
  attempt: QuizAttempt
}

export function QuizAttemptDetail({ attempt }: QuizAttemptDetailProps) {
  const accuracy = attempt.total > 0 ? Math.round((attempt.correct / attempt.total) * 100) : 0

  return (
    <Card className="p-5">
      <div className="space-y-1 text-center">
        <h1 className="text-xl font-bold">{attempt.title}</h1>
        <p className="text-sm text-muted-foreground">{attempt.date}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="space-y-1 text-center">
          <p className="text-2xl font-bold">{accuracy}%</p>
          <p className="text-xs text-muted-foreground">সঠিকতা</p>
        </div>
        <div className="space-y-1 text-center">
          <p className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600">
            <CheckCircle2 className="size-5" />
            {attempt.correct}
          </p>
          <p className="text-xs text-muted-foreground">সঠিক</p>
        </div>
        <div className="space-y-1 text-center">
          <p className="flex items-center justify-center gap-1 text-2xl font-bold text-destructive">
            <XCircle className="size-5" />
            {attempt.incorrect}
          </p>
          <p className="text-xs text-muted-foreground">ভুল</p>
        </div>
        <div className="space-y-1 text-center">
          <p className="flex items-center justify-center gap-1 text-2xl font-bold text-muted-foreground">
            <MinusCircle className="size-5" />
            {attempt.skipped}
          </p>
          <p className="text-xs text-muted-foreground">এড়িয়ে যাওয়া</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-6 border-t pt-4">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
          <Sparkles className="size-4" />+{attempt.xpEarned} এক্সপি
        </span>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-600">
          <Coins className="size-4" />+{attempt.coinsEarned} কয়েন
        </span>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
          <Clock className="size-4" />
          {formatDuration(attempt.timeTakenSeconds)}
        </span>
      </div>
    </Card>
  )
}
