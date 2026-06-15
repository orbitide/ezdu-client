"use client"

import { CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChallengeFeedbackPanelProps {
  status: "correct" | "wrong"
  explanation: string
  onContinue?: () => void
}

export function ChallengeFeedbackPanel({ status, explanation, onContinue }: ChallengeFeedbackPanelProps) {
  const isCorrect = status === "correct"

  return (
    <div
      className={cn(
        "space-y-3 rounded-lg border p-4",
        isCorrect ? "border-green-500/40 bg-green-500/10" : "border-amber-500/40 bg-amber-500/10"
      )}
    >
      <div className={cn("flex items-center gap-2 font-semibold", isCorrect ? "text-green-700" : "text-amber-700")}>
        {isCorrect ? <CheckCircle2 className="size-5" /> : <AlertCircle className="size-5" />}
        {isCorrect ? "চমৎকার!" : "প্রায় ঠিক!"}
      </div>
      {isCorrect && <p className="text-sm text-muted-foreground">{explanation}</p>}
      {isCorrect && onContinue && (
        <Button onClick={onContinue} className="w-full sm:w-auto">
          চালিয়ে যাও
        </Button>
      )}
    </div>
  )
}
