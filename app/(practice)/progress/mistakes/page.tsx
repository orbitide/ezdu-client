import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import { mistakeQuestions } from "@/lib/mock/quiz-attempts"
import { questions } from "@/lib/mock/questions"

export default function MistakesPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="ভুল প্রশ্ন রিভিশন" description="তুমি যেসব প্রশ্নে ভুল করেছ, সেগুলো এখানে রিভিশন করো।" />
      {mistakeQuestions.length === 0 ? (
        <EmptyState title="কোনো ভুল প্রশ্ন নেই" description="তুমি এখনো কোনো প্রশ্নে ভুল করোনি। চালিয়ে যাও!" />
      ) : (
        <div className="space-y-3">
          {mistakeQuestions.map((mistake) => {
            const question = questions.find((q) => q.id === mistake.questionId)
            if (!question) return null
            return (
              <Card key={`${mistake.attemptId}-${mistake.questionId}`}>
                <CardContent className="space-y-2 py-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">{question.subject}</span>
                    <span>{question.topic}</span>
                    <span>· {mistake.date}</span>
                  </div>
                  <p className="font-medium">{question.stem}</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">সঠিক উত্তর: </span>
                    {question.options[question.correctIndex]}
                  </p>
                </CardContent>
              </Card>
            )
          })}
          <div className="flex justify-center pt-2">
            <Button asChild>
              <Link href="/progress/history">সম্পূর্ণ ইতিহাস দেখো</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
