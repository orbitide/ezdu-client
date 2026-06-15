"use client"

import { useState } from "react"
import { CheckCircle2, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function AssignmentSubmissionForm() {
  const [submitted, setSubmitted] = useState(false)
  const [answer, setAnswer] = useState("")

  if (submitted) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-400">
        <CheckCircle2 className="size-5" />
        তোমার অ্যাসাইনমেন্ট জমা দেওয়া হয়েছে।
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <Textarea
        placeholder="তোমার উত্তর এখানে লেখো..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="min-h-32"
      />
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-1.5" type="button">
          <Paperclip className="size-4" />
          ফাইল যুক্ত করো
        </Button>
        <Button onClick={() => setSubmitted(true)} disabled={!answer.trim()}>
          জমা দাও
        </Button>
      </div>
    </div>
  )
}
