"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChallengeResultsScreen } from "@/components/challenge/challenge-results-screen"
import { topics } from "@/lib/mock/subjects"
import type { ChallengeResult } from "@/lib/types/challenge"

export default function ChallengeResultsPage() {
  const params = useParams<{ topicId: string }>()
  const router = useRouter()
  const [result, setResult] = useState<ChallengeResult | null>(null)

  const topic = topics.find((t) => t.id === params.topicId)

  useEffect(() => {
    const raw = sessionStorage.getItem(`challenge-result-${params.topicId}`)
    if (!raw) {
      router.replace(`/challenge/${params.topicId}`)
      return
    }
    setResult(JSON.parse(raw) as ChallengeResult)
  }, [params.topicId, router])

  if (!result || !topic) {
    return null
  }

  return <ChallengeResultsScreen result={result} topicName={topic.name} subjectId={topic.subjectId} />
}
