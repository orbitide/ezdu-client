"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Clock, ListTodo } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { learningPlan } from "@/lib/mock/learning-progress"
import { cn } from "@/lib/utils"

export function StudyPlanCard() {
  const [done, setDone] = useState<Record<string, boolean>>(
    Object.fromEntries(learningPlan.map((item) => [item.id, item.done]))
  )

  return (
    <Card>
      <CardContent className="space-y-3 pt-6">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <ListTodo className="size-4" />
          আজকের লার্নিং পরিকল্পনা
        </p>
        <div className="space-y-1">
          {learningPlan.map((item) => (
            <button
              key={item.id}
              onClick={() => setDone((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
              className="flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors hover:bg-muted"
            >
              {done[item.id] ? (
                <CheckCircle2 className="size-5 shrink-0 text-green-600" />
              ) : (
                <Circle className="size-5 shrink-0 text-muted-foreground" />
              )}
              <div className="flex-1">
                <p className={cn("text-sm font-medium", done[item.id] && "text-muted-foreground line-through")}>
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3.5" />
                {item.durationMinutes} মিনিট
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
