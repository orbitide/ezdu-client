import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DifficultyBadge } from "@/components/shared/difficulty-badge"
import { Sparkles } from "lucide-react"
import { recommendedQuizzes } from "@/lib/mock/home"

export function RecommendedQuizzesSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>তোমার জন্য সুপারিশকৃত</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-3">
        {recommendedQuizzes.map((quiz) => (
          <Link
            key={quiz.id}
            href={`/quiz/${quiz.id}`}
            className="space-y-2 rounded-lg border p-3 transition-colors hover:border-primary/50"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium">{quiz.title}</p>
              <DifficultyBadge difficulty={quiz.difficulty} />
            </div>
            <p className="text-xs text-muted-foreground">{quiz.subject}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{quiz.questionCount} প্রশ্ন</span>
              <span className="inline-flex items-center gap-1 text-xp">
                <Sparkles className="size-3.5" />
                {quiz.xpReward} XP
              </span>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
