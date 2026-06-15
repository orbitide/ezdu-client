import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
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
            className="group flex flex-col gap-3 rounded-xl border p-4 transition-all hover:border-primary/50 hover:shadow-sm"
          >
            <Badge variant="ghost" className="self-start bg-muted text-muted-foreground">
              {quiz.subject}
            </Badge>

            <p className="text-sm font-semibold leading-snug line-clamp-2">{quiz.title}</p>

            <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              শুরু করো
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
