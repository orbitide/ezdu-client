import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { QuizAttemptDetail } from "@/components/progress/quiz-attempt-detail"
import { getAttemptById } from "@/lib/mock/quiz-attempts"

export default async function AttemptDetailPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params
  const attempt = getAttemptById(attemptId)

  if (!attempt) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <Link href="/progress/history" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        ইতিহাসে ফিরে যাও
      </Link>
      <QuizAttemptDetail attempt={attempt} />
    </div>
  )
}
