"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ExplainerStep } from "@/lib/types/course"

interface InteractiveExplainerProps {
  steps: ExplainerStep[]
  onFinish?: () => void
}

export function InteractiveExplainer({ steps, onFinish }: InteractiveExplainerProps) {
  const [index, setIndex] = useState(0)
  const step = steps[index]
  const isLast = index === steps.length - 1

  return (
    <Card>
      <CardContent className="space-y-4 py-6">
        <p className="text-sm text-muted-foreground">
          {index + 1} / {steps.length}
        </p>
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lightbulb className="size-4.5" />
          </div>
          <div className="space-y-1.5">
            <p className="font-semibold">{step.title}</p>
            <p className="leading-relaxed text-muted-foreground">{step.body}</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setIndex((i) => Math.max(i - 1, 0))} disabled={index === 0} className="gap-1.5">
            <ChevronLeft className="size-4" />
            আগের
          </Button>
          {isLast ? (
            <Button onClick={onFinish} className="gap-1.5">
              সম্পন্ন করো
            </Button>
          ) : (
            <Button onClick={() => setIndex((i) => Math.min(i + 1, steps.length - 1))} className="gap-1.5">
              পরের
              <ChevronRight className="size-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
