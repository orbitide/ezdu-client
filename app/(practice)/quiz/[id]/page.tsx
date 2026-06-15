import { notFound } from "next/navigation"
import { QuizEngine } from "@/components/quiz/quiz-engine"
import { getQuizById } from "@/lib/mock/quizzes"

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const config = getQuizById(id)

  if (!config) {
    notFound()
  }

  return <QuizEngine config={config} />
}
