import { notFound } from "next/navigation"
import { QuizEngine } from "@/components/quiz/quiz-engine"
import { getQuizById, getQuickChallengeQuiz, getMockTestQuiz } from "@/lib/mock/quizzes"

function getMockTestQuizFromId(id: string) {
  const [, subjectId, time, max] = id.match(/^mock-(.+)-(\d+)-(\d+)$/) ?? []
  if (!subjectId) return undefined
  return getMockTestQuiz(subjectId, Number(time), Number(max))
}

export default async function QuizPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const config =
    getQuizById(id) ??
    (id.startsWith("quick-") ? getQuickChallengeQuiz(id.replace("quick-", "")) : undefined) ??
    (id.startsWith("mock-") ? getMockTestQuizFromId(id) : undefined)

  if (!config) {
    notFound()
  }

  return <QuizEngine config={config} />
}
