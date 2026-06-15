"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TIME_PRESETS = [15, 20, 30, 40]
const QUESTION_PRESETS = [15, 20, 30, 40]
const MIN_QUESTIONS = 15
const MAX_QUESTIONS = 100

interface QuizConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subjectId: string
  availableQuestionCount: number
}

export function QuizConfigDialog({ open, onOpenChange, subjectId, availableQuestionCount }: QuizConfigDialogProps) {
  const router = useRouter()
  const [timeMinutes, setTimeMinutes] = useState(20)
  const [maxQuestions, setMaxQuestions] = useState(20)
  const [customQuestions, setCustomQuestions] = useState(false)

  const effectiveMax = Math.min(maxQuestions, availableQuestionCount)

  const handleStart = () => {
    router.push(`/quiz/mock-${subjectId}-${timeMinutes}-${maxQuestions}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>পরীক্ষার সেটিংস</DialogTitle>
          <DialogDescription>সময় ও প্রশ্নের সংখ্যা নির্ধারণ করো।</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">সময় (মিনিট)</p>
            <div className="grid grid-cols-4 gap-2">
              {TIME_PRESETS.map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  onClick={() => setTimeMinutes(minutes)}
                  className={cn(
                    "rounded-md border px-2 py-2 text-sm font-medium transition-colors",
                    timeMinutes === minutes
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  {minutes}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">প্রশ্নের সংখ্যা</p>
            <div className="grid grid-cols-4 gap-2">
              {QUESTION_PRESETS.map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => {
                    setMaxQuestions(count)
                    setCustomQuestions(false)
                  }}
                  className={cn(
                    "rounded-md border px-2 py-2 text-sm font-medium transition-colors",
                    !customQuestions && maxQuestions === count
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  {count}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setCustomQuestions(true)}
              className={cn(
                "w-full rounded-md border px-2 py-2 text-sm font-medium transition-colors",
                customQuestions
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              কাস্টম
            </button>
            {customQuestions && (
              <input
                type="number"
                min={MIN_QUESTIONS}
                max={MAX_QUESTIONS}
                value={maxQuestions}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  setMaxQuestions(Math.min(MAX_QUESTIONS, Math.max(MIN_QUESTIONS, value || MIN_QUESTIONS)))
                }}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                placeholder={`${MIN_QUESTIONS}-${MAX_QUESTIONS}`}
              />
            )}
            <p className="text-xs text-muted-foreground">এই বিষয়ে {availableQuestionCount} টি প্রশ্ন উপলব্ধ আছে।</p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleStart} disabled={effectiveMax === 0} className="w-full">
            পরীক্ষা শুরু করো
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
