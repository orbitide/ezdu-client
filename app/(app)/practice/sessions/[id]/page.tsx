"use client"

import { use, useState, useEffect } from "react"
import { practiceQuestions } from "@/lib/mock/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, ChevronLeft, ChevronRight, Send, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const SESSION_QUESTIONS = practiceQuestions.slice(0, 8)
const TOTAL_SECONDS = 20 * 60

export default function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  use(params)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS)
  const [submitted, setSubmitted] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    if (submitted) return
    const t = setInterval(() => setTimeLeft(s => { if (s <= 1) { clearInterval(t); setSubmitted(true); return 0 } return s - 1 }), 1000)
    return () => clearInterval(t)
  }, [submitted])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isLow = timeLeft < 120
  const q = SESSION_QUESTIONS[current]

  if (submitted) {
    const correct = SESSION_QUESTIONS.filter((q, i) => answers[i] === q.correctOptionId).length
    const score = Math.round((correct / SESSION_QUESTIONS.length) * 100)
    return (
      <div className="max-w-lg mx-auto text-center py-12 space-y-5">
        <div className="text-6xl">{score >= 60 ? "🎉" : "📚"}</div>
        <div>
          <h1 className="text-4xl font-bold">{score}%</h1>
          <p className="text-muted-foreground mt-1">{correct}/{SESSION_QUESTIONS.length} সঠিক</p>
        </div>
        <Progress value={score} className="h-3 max-w-xs mx-auto" />
        <Alert className={cn(score >= 60 ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50")}>
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription className={score >= 60 ? "text-green-800" : "text-red-800"}>
            {score >= 60 ? "পাস! চমৎকার কাজ করেছেন।" : "ফেল। আরও অনুশীলন করুন।"}
          </AlertDescription>
        </Alert>
        <div className="flex gap-3 justify-center">
          <Link href="/practice/mock-tests"><Button variant="outline">মক টেস্ট তালিকা</Button></Link>
          <Link href="/practice/sessions/sess-001/results"><Button>বিস্তারিত দেখুন</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">প্রশ্ন {current + 1}/{SESSION_QUESTIONS.length}</span>
        <div className={cn("flex items-center gap-1.5 font-mono font-semibold text-sm px-3 py-1.5 rounded-full", isLow ? "bg-red-100 text-red-700" : "bg-muted")}>
          <Clock className="h-3.5 w-3.5" />
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
        <Button variant="outline" size="sm" onClick={() => setConfirmOpen(true)}>
          <Send className="h-3.5 w-3.5 mr-1.5" /> Submit
        </Button>
      </div>

      <Progress value={((current + 1) / SESSION_QUESTIONS.length) * 100} className="h-1.5" />

      <div className="rounded-lg border border-border p-6 space-y-5">
        <Badge variant="outline" className="text-xs">{q.subject}</Badge>
        <p className="font-medium text-base leading-relaxed">{q.text}</p>
        <RadioGroup value={answers[current] ?? ""} onValueChange={val => setAnswers(p => ({ ...p, [current]: val }))} className="space-y-2">
          {q.options.map(opt => (
            <div key={opt.id} className={cn("flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors hover:bg-muted/40", answers[current] === opt.id && "border-primary bg-primary/5")}>
              <RadioGroupItem value={opt.id} id={`opt-${opt.id}`} />
              <Label htmlFor={`opt-${opt.id}`} className="flex-1 cursor-pointer font-normal">{opt.text}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrent(i => i - 1)} disabled={current === 0}>
          <ChevronLeft className="h-4 w-4 mr-1" /> আগের
        </Button>
        {current < SESSION_QUESTIONS.length - 1
          ? <Button onClick={() => setCurrent(i => i + 1)}>পরের <ChevronRight className="h-4 w-4 ml-1" /></Button>
          : <Button onClick={() => setConfirmOpen(true)}><Send className="h-4 w-4 mr-1.5" /> জমা দিন</Button>
        }
      </div>

      <div className="flex flex-wrap gap-2">
        {SESSION_QUESTIONS.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={cn("h-8 w-8 rounded text-xs font-medium border transition-colors",
              i === current && "border-primary bg-primary text-primary-foreground",
              answers[i] && i !== current && "border-green-500 bg-green-50 text-green-700",
              !answers[i] && i !== current && "border-border hover:bg-muted"
            )}>
            {i + 1}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">{Object.keys(answers).length}/{SESSION_QUESTIONS.length} উত্তর দেওয়া হয়েছে</p>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>টেস্ট জমা দিতে চান?</DialogTitle>
            <DialogDescription>
              {Object.keys(answers).length}/{SESSION_QUESTIONS.length} প্রশ্নের উত্তর দেওয়া হয়েছে।
              {Object.keys(answers).length < SESSION_QUESTIONS.length && (
                <span className="text-amber-600 block mt-1">{SESSION_QUESTIONS.length - Object.keys(answers).length}টি প্রশ্ন বাদ।</span>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setConfirmOpen(false)}>ফিরে যান</Button>
            <Button className="flex-1" onClick={() => { setConfirmOpen(false); setSubmitted(true) }}>হ্যাঁ, জমা দিন</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
