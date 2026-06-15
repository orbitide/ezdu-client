import Link from "next/link"
import { ChevronRight, CheckCircle2, XCircle, MinusCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { quizAttempts } from "@/lib/mock/quiz-attempts"
import { formatDuration } from "@/lib/utils/quiz"

const TYPE_LABELS: Record<string, string> = {
  model: "মডেল টেস্ট",
  mock: "মক টেস্ট",
  quick: "কুইক চ্যালেঞ্জ",
  archive: "আর্কাইভ",
  preset: "প্রিসেট সেট",
}

export function HistoryList() {
  return (
    <div className="space-y-3">
      {quizAttempts.map((attempt) => (
        <Link key={attempt.id} href={`/progress/history/${attempt.id}`}>
          <Card className="transition hover:bg-muted/50">
            <CardContent className="flex items-center justify-between gap-3 py-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{attempt.title}</p>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                    {TYPE_LABELS[attempt.type]}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{attempt.date}</span>
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle2 className="size-3.5" />
                    {attempt.correct}
                  </span>
                  <span className="flex items-center gap-1 text-destructive">
                    <XCircle className="size-3.5" />
                    {attempt.incorrect}
                  </span>
                  <span className="flex items-center gap-1">
                    <MinusCircle className="size-3.5" />
                    {attempt.skipped}
                  </span>
                  <span>{formatDuration(attempt.timeTakenSeconds)}</span>
                </div>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
