"use client"

import { useState } from "react"
import { NotebookPen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface LessonNotesPanelProps {
  lessonId: string
}

export function LessonNotesPanel({ lessonId }: LessonNotesPanelProps) {
  const [note, setNote] = useState("")

  return (
    <Card>
      <CardContent className="space-y-2 pt-6">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <NotebookPen className="size-4" />
          আমার নোট
        </p>
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="এই লেসন সম্পর্কে নোট লিখো..."
          className="min-h-32"
          data-lesson-id={lessonId}
        />
      </CardContent>
    </Card>
  )
}
