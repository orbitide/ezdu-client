import { CheckCircle2, MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { QaQuestion } from "@/lib/types/qa"

interface QaQuestionThreadProps {
  question: QaQuestion
}

export function QaQuestionThread({ question }: QaQuestionThreadProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-2 py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-muted px-2 py-0.5">{question.subject}</span>
            <span>@{question.author}</span>
            <span>{question.timeAgo}</span>
          </div>
          <h1 className="text-lg font-semibold">{question.title}</h1>
          <p className="text-muted-foreground">{question.body}</p>
        </CardContent>
      </Card>

      <div className="space-y-1 px-1">
        <p className="flex items-center gap-1.5 text-sm font-semibold">
          <MessageCircle className="size-4" />
          {question.answerCount} উত্তর
        </p>
      </div>

      <div className="space-y-3">
        {question.answers.map((answer) => (
          <Card key={answer.id} className={answer.accepted ? "border-green-500/40" : undefined}>
            <CardContent className="space-y-2 py-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{answer.author}</span>
                <span>{answer.timeAgo}</span>
                {answer.accepted && (
                  <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-green-600">
                    <CheckCircle2 className="size-3.5" />
                    সঠিক উত্তর
                  </span>
                )}
              </div>
              <p className="text-muted-foreground">{answer.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
