import { notFound } from "next/navigation"
import { QuizEngine } from "@/components/quiz/quiz-engine"
import { getQuizById, getQuickChallengeQuiz } from "@/lib/mock/quizzes"

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const config =
    getQuizById(id) ?? (id.startsWith("quick-") ? getQuickChallengeQuiz(id.replace("quick-", "")) : undefined)

  if (!config) {
    notFound()
  }

  return <QuizEngine config={config} />
}
