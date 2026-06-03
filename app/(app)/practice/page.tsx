"use client"

import { useState } from "react"
import Link from "next/link"
import { practiceQuestions, mockTests } from "@/lib/mock/data"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PenTool, CheckCircle2, XCircle, ChevronRight, ChevronLeft, Trophy, Clock, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const subjects = ["সব", "পদার্থবিজ্ঞান", "রসায়নবিজ্ঞান", "গণিত", "জীববিজ্ঞান", "ইংরেজি"]
const difficultyLabel = { easy: "সহজ", medium: "মাঝারি", hard: "কঠিন" }
const difficultyColor = { easy: "bg-green-100 text-green-700", medium: "bg-amber-100 text-amber-700", hard: "bg-red-100 text-red-700" }

export default function PracticePage() {
  const [activeSubject, setActiveSubject] = useState("সব")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<Record<number, string>>({})

  const filtered = activeSubject === "সব" ? practiceQuestions : practiceQuestions.filter(q => q.subject === activeSubject)
  const current = filtered[currentIndex]
  const isCorrect = submitted && selected === current?.correctOptionId

  function handleSubmit() {
    if (!selected || !current) return
    setSubmitted(true)
    setAnswered(p => ({ ...p, [currentIndex]: selected }))
    if (selected === current.correctOptionId) setScore(s => s + 1)
  }

  function handleNext() {
    setSelected(null); setSubmitted(false)
    setCurrentIndex(i => Math.min(i + 1, filtered.length - 1))
  }

  function changeSubject(subj: string) {
    setActiveSubject(subj); setCurrentIndex(0); setSelected(null)
    setSubmitted(false); setAnswered({}); setScore(0)
  }

  if (!current) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Practice</h1>
          <p className="text-muted-foreground text-sm mt-1">বিষয়ভিত্তিক MCQ অনুশীলন</p>
        </div>
        <Link href="/practice/mock-tests">
          <Button variant="outline" className="gap-2">
            <Trophy className="h-4 w-4" /> Mock Tests
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: PenTool, color: "text-blue-500 bg-blue-50", value: Object.keys(answered).length, label: "উত্তর দেওয়া" },
          { icon: CheckCircle2, color: "text-green-500 bg-green-50", value: score, label: "সঠিক" },
          { icon: BarChart3, color: "text-purple-500 bg-purple-50", value: `${Object.keys(answered).length > 0 ? Math.round((score / Object.keys(answered).length) * 100) : 0}%`, label: "সাফল্যের হার" },
        ].map(({ icon: Icon, color, value, label }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${color}`}><Icon className="h-5 w-5" /></div>
              <div><p className="text-xl font-bold">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap gap-2">
            {subjects.map(s => (
              <Button key={s} size="sm" variant={activeSubject === s ? "default" : "outline"} onClick={() => changeSubject(s)} className="h-7 text-xs">{s}</Button>
            ))}
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{current.subject}</Badge>
                  <Badge className={cn("text-xs", difficultyColor[current.difficulty])}>{difficultyLabel[current.difficulty]}</Badge>
                </div>
                <span className="text-sm text-muted-foreground">{currentIndex + 1}/{filtered.length}</span>
              </div>
              <Progress value={((currentIndex + 1) / filtered.length) * 100} className="h-1" />
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="font-medium leading-relaxed">{current.text}</p>

              <RadioGroup value={selected ?? ""} onValueChange={val => { if (!submitted) setSelected(val) }} className="space-y-2">
                {current.options.map(opt => {
                  const isRight = opt.id === current.correctOptionId
                  const isSelected = opt.id === selected
                  return (
                    <div key={opt.id} className={cn(
                      "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                      !submitted && isSelected && "border-primary bg-primary/5",
                      !submitted && !isSelected && "border-border hover:bg-muted/30",
                      submitted && isRight && "border-green-500 bg-green-50",
                      submitted && isSelected && !isRight && "border-red-500 bg-red-50"
                    )}>
                      <RadioGroupItem value={opt.id} id={`opt-${opt.id}`} disabled={submitted} />
                      <Label htmlFor={`opt-${opt.id}`} className="flex-1 cursor-pointer font-normal">{opt.text}</Label>
                      {submitted && isRight && <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />}
                      {submitted && isSelected && !isRight && <XCircle className="h-4 w-4 text-red-500 shrink-0" />}
                    </div>
                  )
                })}
              </RadioGroup>

              {submitted && (
                <Alert className={cn(isCorrect ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}>
                  <AlertDescription className={isCorrect ? "text-green-800" : "text-red-800"}>
                    <span className="font-semibold">{isCorrect ? "✓ সঠিক! " : "✗ ভুল। "}</span>
                    {current.explanation}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={() => { setSelected(null); setSubmitted(false); setCurrentIndex(i => i - 1) }} disabled={currentIndex === 0}>
                  <ChevronLeft className="h-4 w-4 mr-1" /> আগে
                </Button>
                {!submitted
                  ? <Button size="sm" onClick={handleSubmit} disabled={!selected} className="flex-1">উত্তর দিন</Button>
                  : <Button size="sm" onClick={handleNext} disabled={currentIndex === filtered.length - 1} className="flex-1">পরের প্রশ্ন <ChevronRight className="h-4 w-4 ml-1" /></Button>
                }
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          <h2 className="font-semibold">মক টেস্ট</h2>
          {mockTests.slice(0, 4).map(test => (
            <Link key={test.id} href="/practice/mock-tests">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 space-y-2">
                  <p className="font-medium text-sm leading-snug">{test.title}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{test.duration}m</span>
                    <span>{test.questionCount} প্রশ্ন</span>
                  </div>
                  {test.bestScore !== undefined
                    ? <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">সেরা</span>
                        <span className="font-medium text-green-600">{test.bestScore}%</span>
                      </div>
                      <Progress value={test.bestScore} className="h-1" />
                    </div>
                    : <Badge variant="outline" className="text-xs">দেওয়া হয়নি</Badge>
                  }
                </CardContent>
              </Card>
            </Link>
          ))}
          <Link href="/practice/mock-tests">
            <Button variant="outline" size="sm" className="w-full">সব মক টেস্ট</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
