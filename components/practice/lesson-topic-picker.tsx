import Link from "next/link"
import { Clock, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { topics } from "@/lib/mock/subjects"
import { questions } from "@/lib/mock/questions"

interface LessonTopicPickerProps {
  subjectId: string
  subjectName: string
}

export function LessonTopicPicker({ subjectId, subjectName }: LessonTopicPickerProps) {
  const subjectTopics = topics.filter((t) => t.subjectId === subjectId)

  return (
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
              <Button asChild size="sm">
                <Link href={`/quiz/quick-${subjectId}`}>শুরু করো</Link>
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
