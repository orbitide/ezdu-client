"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { X, Flame } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { QuestionStem } from "@/components/quiz/question-stem"
import { ChallengeOptionList } from "@/components/challenge/challenge-option-list"
import { ChallengeFeedbackPanel } from "@/components/challenge/challenge-feedback-panel"
import { ChallengeStormOverlay } from "@/components/challenge/challenge-storm-overlay"
import { useChallengeStore } from "@/lib/store/challenge-store"
import { isMilestone } from "@/lib/utils/challenge"
import { cn } from "@/lib/utils"
import type { Question } from "@/lib/types/question"
import type { ChallengeResult } from "@/lib/types/challenge"

interface ChallengeEngineProps {
  topicId: string
  subjectId: string
  questions: Question[]
}

export function ChallengeEngine({ topicId, subjectId, questions }: ChallengeEngineProps) {
  const router = useRouter()
  const {
    topicId: activeTopicId,
    questionIds,
    currentIndex,
    status,
    wrongOptionIndexes,
    streak,
    maxStreak,
    startedAt,
    start,
    selectOption,
    nextQuestion,
  } = useChallengeStore()

  useEffect(() => {
    if (activeTopicId !== topicId) {
      start(topicId, questions.map((q) => q.id))
    }
  }, [activeTopicId, topicId, questions, start])

  const activeQuestionId = questionIds[currentIndex]
  const question = useMemo(() => questions.find((q) => q.id === activeQuestionId), [questions, activeQuestionId])

  useEffect(() => {
    if (status === "finished" && startedAt) {
      const result: ChallengeResult = {
        topicId,
        totalQuestions: questionIds.length,
        maxStreak,
        timeTakenSeconds: Math.floor((Date.now() - startedAt) / 1000),
      }
      sessionStorage.setItem(`challenge-result-${topicId}`, JSON.stringify(result))
      router.push(`/challenge/${topicId}/results`)
    }
  }, [status, startedAt, topicId, questionIds.length, maxStreak, router])

  const [dismissedStormStreak, setDismissedStormStreak] = useState<number | null>(null)

  if (questionIds.length === 0 || !question) {
    return null
  }

  const showStorm = isMilestone(streak) && streak !== dismissedStormStreak

  return (
    <div className={cn("flex flex-1 flex-col gap-4 p-4 lg:p-6", showStorm && "animate-challenge-shake")}>
      {showStorm && <ChallengeStormOverlay streak={streak} onDone={() => setDismissedStormStreak(streak)} />}

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => router.push(`/practice/challenge/${subjectId}`)}
          className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="বন্ধ করো"
        >
          <X className="size-5" />
        </button>
        <Progress
          value={((currentIndex + (status === "correct" ? 1 : 0)) / questionIds.length) * 100}
          className="flex-1"
        />
        <div
          className={cn(
            "flex items-center gap-1 rounded-full px-2.5 py-1 text-sm font-bold text-amber-600 transition-transform",
            streak > 0 && "bg-amber-500/10"
          )}
        >
          <Flame className="size-4" />
          {streak}
        </div>
      </div>

      <Card className="p-5">
        <div className="space-y-5">
          <QuestionStem question={question} />
          <ChallengeOptionList
            options={question.options}
            correctIndex={question.correctIndex}
            wrongOptionIndexes={wrongOptionIndexes}
            status={status}
            onSelect={(index) => selectOption(index, question.correctIndex)}
          />
        </div>
      </Card>

      {(status === "correct" || status === "wrong") && (
        <ChallengeFeedbackPanel
          status={status}
          explanation={question.explanation}
          onContinue={status === "correct" ? nextQuestion : undefined}
        />
      )}
    </div>
  )
}
