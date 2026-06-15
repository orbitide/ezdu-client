"use client"

import { useState } from "react"
import { Clock, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QuizConfigDialog } from "@/components/practice/quiz-config-dialog"
import { topics } from "@/lib/mock/subjects"
import { questions } from "@/lib/mock/questions"

interface MockTestLessonPickerProps {
  subjectId: string
  subjectName: string
}

export function MockTestLessonPicker({ subjectId, subjectName }: MockTestLessonPickerProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const subjectTopics = topics.filter((t) => t.subjectId === subjectId)
  const subjectQuestions = questions.filter((q) => q.subject === subjectName)

  return (
    <>
      <div className="space-y-3">
        {subjectTopics.map((topic) => {
          const topicQuestions = questions.filter((q) => q.subject === subjectName && q.topic === topic.name)
          const durationMinutes = topicQuestions.length
          const xpReward = topicQuestions.length * 10

          return (
            <Card key={topic.id}>
              <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div className="space-y-1.5">
                  <p className="font-medium">{topic.name}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{topic.questionCount} প্রশ্ন</span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {durationMinutes} মিনিট
                    </span>
                    <span className="flex items-center gap-1 text-xp">
                      <Sparkles className="size-3.5" />
                      {xpReward}
                    </span>
                  </div>
                </div>
                <Button size="sm" onClick={() => setDialogOpen(true)}>
                  শুরু করো
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <QuizConfigDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        subjectId={subjectId}
        availableQuestionCount={subjectQuestions.length}
      />
    </>
  )
}
