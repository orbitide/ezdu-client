import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { QaQuestion } from "@/lib/types/qa"

interface QaQuestionCardProps {
  question: QaQuestion
}

export function QaQuestionCard({ question }: QaQuestionCardProps) {
  return (
    <Link href={`/learn/qa/${question.id}`}>
      <Card className="transition hover:border-primary/40">
        <CardContent className="space-y-1.5 py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-muted px-2 py-0.5">{question.subject}</span>
            <span>@{question.author}</span>
            <span>{question.timeAgo}</span>
          </div>
          <p className="font-medium">{question.title}</p>
          <p className="line-clamp-2 text-sm text-muted-foreground">{question.body}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MessageCircle className="size-3.5" />
            {question.answerCount} উত্তর
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
