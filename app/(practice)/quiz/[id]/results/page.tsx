"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { QuizResultsScreen } from "@/components/quiz/quiz-results-screen"
import { getQuizById, getQuickChallengeQuiz } from "@/lib/mock/quizzes"
import type { QuizResult } from "@/lib/types/quiz"

export default function QuizResultsPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [result, setResult] = useState<QuizResult | null>(null)

  const config =
    getQuizById(params.id) ??
    (params.id.startsWith("quick-") ? getQuickChallengeQuiz(params.id.replace("quick-", "")) : undefined)

  useEffect(() => {
    const raw = sessionStorage.getItem(`quiz-result-${params.id}`)
    if (!raw) {
      router.replace(`/quiz/${params.id}`)
      return
    }
    setResult(JSON.parse(raw) as QuizResult)
  }, [params.id, router])

  if (!result || !config) {
    return null
  }

  return <QuizResultsScreen result={result} title={config.title} />
}
