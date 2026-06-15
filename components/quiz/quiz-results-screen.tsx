"use client"

import Link from "next/link"
import { CheckCircle2, XCircle, MinusCircle, Sparkles, Coins } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QuestionStem } from "@/components/quiz/question-stem"
import { McqOptionList } from "@/components/quiz/mcq-option-list"
import { formatDuration } from "@/lib/utils/quiz"
import { questions as allQuestions } from "@/lib/mock/questions"
import type { QuizResult } from "@/lib/types/quiz"

interface QuizResultsScreenProps {
  result: QuizResult
  title: string
}

export function QuizResultsScreen({ result, title }: QuizResultsScreenProps) {
  const accuracy = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6">
      <div className="text-center space-y-2">
        <p className="text-sm font-medium text-primary">অভিনন্দন!</p>
        <h1 className="text-2xl font-bold">{title} সম্পন্ন হয়েছে</h1>
        <p className="text-sm text-muted-foreground">সময় লেগেছে {formatDuration(result.timeTakenSeconds)}</p>
      </div>

      <Card className="p-5">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="space-y-1 text-center">
            <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
            <p className="text-xs text-muted-foreground">সঠিকতা</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600">
              <CheckCircle2 className="size-5" />
              {result.correct}
            </p>
            <p className="text-xs text-muted-foreground">সঠিক</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-destructive">
              <XCircle className="size-5" />
              {result.incorrect}
            </p>
            <p className="text-xs text-muted-foreground">ভুল</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-muted-foreground">
              <MinusCircle className="size-5" />
              {result.skipped}
            </p>
            <p className="text-xs text-muted-foreground">এড়িয়ে যাওয়া</p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-6 border-t pt-4">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
            <Sparkles className="size-4" />+{result.xpEarned} এক্সপি
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-amber-600">
            <Coins className="size-4" />+{result.coinsEarned} কয়েন
          </span>
        </div>
      </Card>

      <div className="flex justify-center gap-3">
        <Button asChild variant="outline">
          <Link href="/home">হোমে যাও</Link>
        </Button>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">উত্তরপত্র পর্যালোচনা</h2>
        {result.answers.map((answer) => {
          const question = allQuestions.find((q) => q.id === answer.questionId)
          if (!question) return null
          return (
            <Card key={answer.questionId} className="p-5">
              <div className="space-y-4">
                <QuestionStem question={question} />
                <McqOptionList
                  options={question.options}
                  selectedIndex={answer.selectedIndex}
                  onSelect={() => {}}
                  correctIndex={question.correctIndex}
                />
                <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">ব্যাখ্যা: </span>
                  {question.explanation}
                </p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
