"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { QuestionCounter } from "@/components/quiz/question-counter"
import { QuizTimer } from "@/components/quiz/quiz-timer"
import { QuestionStem } from "@/components/quiz/question-stem"
import { McqOptionList } from "@/components/quiz/mcq-option-list"
import { BookmarkFlagControls } from "@/components/quiz/bookmark-flag-controls"
import { QuestionIndicatorBar } from "@/components/quiz/question-indicator-bar"
import { QuizNavBar } from "@/components/quiz/quiz-nav-bar"
import { useTimer } from "@/hooks/use-timer"
import { useQuizStore } from "@/lib/store/quiz-store"
import { scoreQuiz } from "@/lib/utils/quiz"
import { questions as allQuestions } from "@/lib/mock/questions"
import type { QuizConfig } from "@/lib/types/quiz"
import { useProgressStore } from "@/lib/store/progress-store"

interface QuizEngineProps {
  config: QuizConfig
}

export function QuizEngine({ config }: QuizEngineProps) {
  const router = useRouter()
  const { quizId, questionIds, currentIndex, answers, start, setAnswer, toggleFlag, goTo, next, prev } =
    useQuizStore()
  const addXp = useProgressStore((s) => s.addXp)
  const addCoins = useProgressStore((s) => s.addCoins)

  useEffect(() => {
    if (quizId !== config.id) {
      start(config.id, config.questionIds)
    }
  }, [config.id, config.questionIds, quizId, start])

  const handleSubmit = () => {
    const questions = config.questionIds
      .map((id) => allQuestions.find((q) => q.id === id))
      .filter((q): q is NonNullable<typeof q> => Boolean(q))
    const answerList = config.questionIds.map(
      (id) => answers[id] ?? { questionId: id, selectedIndex: null, flagged: false }
    )
    const timeTaken = config.durationSeconds - secondsLeft
    const result = scoreQuiz(config, questions, answerList, timeTaken)

    addXp(result.xpEarned)
    addCoins(result.coinsEarned)

    sessionStorage.setItem(`quiz-result-${config.id}`, JSON.stringify(result))
    router.push(`/quiz/${config.id}/results`)
  }

  const secondsLeft = useTimer(config.durationSeconds, {
    countDown: true,
    onExpire: handleSubmit,
  })

  const activeQuestionId = questionIds[currentIndex]
  const question = useMemo(() => allQuestions.find((q) => q.id === activeQuestionId), [activeQuestionId])

  if (questionIds.length === 0 || !question) {
    return null
  }

  const currentAnswer = answers[activeQuestionId]

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <QuestionCounter current={currentIndex + 1} total={questionIds.length} />
        <QuizTimer secondsLeft={secondsLeft} />
      </div>

      <Card className="p-5">
        <div className="space-y-5">
          <QuestionStem question={question} />
          <McqOptionList
            options={question.options}
            selectedIndex={currentAnswer?.selectedIndex ?? null}
            onSelect={(index) => setAnswer(activeQuestionId, index)}
          />
          <BookmarkFlagControls
            flagged={currentAnswer?.flagged ?? false}
            onToggle={() => toggleFlag(activeQuestionId)}
          />
        </div>
      </Card>

      <QuestionIndicatorBar
        questionIds={questionIds}
        answers={answers}
        currentIndex={currentIndex}
        onJump={goTo}
      />

      <QuizNavBar
        canGoPrev={currentIndex > 0}
        isLast={currentIndex === questionIds.length - 1}
        onPrev={prev}
        onNext={next}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
