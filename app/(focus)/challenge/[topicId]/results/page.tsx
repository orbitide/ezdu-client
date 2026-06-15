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

  const topicIds = params.topicId.split("+")
  const selectedTopics = topicIds.map((id) => topics.find((t) => t.id === id)).filter((t) => t !== undefined)

  useEffect(() => {
    const raw = sessionStorage.getItem(`challenge-result-${params.topicId}`)
    if (!raw) {
      router.replace(`/challenge/${params.topicId}`)
      return
    }
    setResult(JSON.parse(raw) as ChallengeResult)
  }, [params.topicId, router])

  if (!result || selectedTopics.length === 0) {
    return null
  }

  const topicName = selectedTopics.map((t) => t.name).join(", ")

  return <ChallengeResultsScreen result={result} topicName={topicName} subjectId={selectedTopics[0].subjectId} />
}
