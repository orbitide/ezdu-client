"use client"

import { use } from "react"
import { practiceQuestions } from "@/lib/mock/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, XCircle, MinusCircle, Trophy, BarChart3, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

const resultAnswers: Record<string, string> = {
  "q-001": "a", "q-002": "b", "q-003": "b", "q-004": "c",
  "q-005": "c", "q-006": "a", "q-007": "b", "q-008": "a",
}
const questions = practiceQuestions.slice(0, 8)

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  use(params)
  const correct = questions.filter(q => resultAnswers[q.id] === q.correctOptionId).length
  const wrong = questions.filter(q => resultAnswers[q.id] && resultAnswers[q.id] !== q.correctOptionId).length
  const skipped = questions.filter(q => !resultAnswers[q.id]).length
  const score = Math.round((correct / questions.length) * 100)
  const passed = score >= 60

  const subjectMap: Record<string, { correct: number; total: number }> = {}
  questions.forEach(q => {
    if (!subjectMap[q.subject]) subjectMap[q.subject] = { correct: 0, total: 0 }
    subjectMap[q.subject].total++
    if (resultAnswers[q.id] === q.correctOptionId) subjectMap[q.subject].correct++
  })

  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card>
        <CardContent className="p-8 text-center space-y-4">
          <div className="text-5xl">{passed ? "🏆" : "📚"}</div>
          <div>
            <p className="text-5xl font-bold">{score}%</p>
            <p className={cn("text-lg font-semibold mt-1", passed ? "text-green-600" : "text-red-600")}>{passed ? "পাস!" : "ফেল"}</p>
          </div>
          <Progress value={score} className="h-3 max-w-sm mx-auto" />
          <div className="flex justify-center gap-8 text-sm">
            <div className="text-center"><p className="text-2xl font-bold text-green-600">{correct}</p><p className="text-muted-foreground text-xs">সঠিক</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-red-600">{wrong}</p><p className="text-muted-foreground text-xs">ভুল</p></div>
            <div className="text-center"><p className="text-2xl font-bold text-muted-foreground">{skipped}</p><p className="text-muted-foreground text-xs">বাদ</p></div>
          </div>
        </CardContent>
      </Card>

      {/* Subject breakdown */}
      <Card>
        <CardHeader className="pb-3"><CardTitle className="text-base">বিষয়ভিত্তিক ফলাফল</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(subjectMap).map(([subject, data]) => (
            <div key={subject} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span>{subject}</span>
                <span className="font-medium">{data.correct}/{data.total}</span>
              </div>
              <Progress value={(data.correct / data.total) * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Question review */}
      <div className="space-y-3">
        <h2 className="font-semibold text-lg">প্রশ্নভিত্তিক পর্যালোচনা</h2>
        {questions.map((q, i) => {
          const userAnswer = resultAnswers[q.id]
          const isCorrect = userAnswer === q.correctOptionId
          const isSkipped = !userAnswer
          return (
            <Card key={q.id}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start gap-3">
                  {isSkipped ? <MinusCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    : isCorrect ? <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    : <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Q{i + 1}</span>
                      <Badge variant="outline" className="text-xs">{q.subject}</Badge>
                    </div>
                    <p className="text-sm font-medium leading-relaxed">{q.text}</p>
                    <div className="space-y-1.5">
                      {q.options.map(opt => {
                        const isRight = opt.id === q.correctOptionId
                        const isUser = opt.id === userAnswer
                        return (
                          <div key={opt.id} className={cn("flex items-center gap-2 rounded px-3 py-1.5 text-sm",
                            isRight && "bg-green-50 text-green-800",
                            isUser && !isRight && "bg-red-50 text-red-800",
                            !isRight && !isUser && "text-muted-foreground"
                          )}>
                            {isRight ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                              : isUser ? <XCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                              : <span className="h-3.5 w-3.5 shrink-0" />}
                            <span className="flex-1">{opt.text}</span>
                            {isRight && <Badge className="text-[10px] h-4 bg-green-600">সঠিক</Badge>}
                            {isUser && !isRight && <Badge className="text-[10px] h-4 bg-red-600">আপনার উত্তর</Badge>}
                          </div>
                        )
                      })}
                    </div>
                    <div className="rounded bg-muted/50 p-2.5 text-xs text-muted-foreground">
                      <span className="font-medium">ব্যাখ্যা: </span>{q.explanation}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-3 pb-6">
        <Link href="/practice/mock-tests"><Button variant="outline"><BarChart3 className="h-4 w-4 mr-2" />সব টেস্ট</Button></Link>
        <Link href="/practice/sessions/sess-001"><Button><RefreshCw className="h-4 w-4 mr-2" />পুনরায় দিন</Button></Link>
      </div>
    </div>
  )
}
