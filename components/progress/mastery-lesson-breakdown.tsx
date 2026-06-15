import { Card, CardContent } from "@/components/ui/card"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import type { SubjectMastery } from "@/lib/types/progress"

interface MasteryLessonBreakdownProps {
  subject: SubjectMastery
}

export function MasteryLessonBreakdown({ subject }: MasteryLessonBreakdownProps) {
  return (
    <div className="space-y-3">
      {subject.topics.map((topic) => (
        <Card key={topic.topicId}>
          <CardContent className="space-y-2 py-4">
            <div className="flex items-center justify-between">
              <p className="font-medium">{topic.topicName}</p>
              <span className="text-sm font-semibold text-primary">{topic.accuracy}%</span>
            </div>
            <Progress value={topic.accuracy}>
              <ProgressTrack>
                <ProgressIndicator />
              </ProgressTrack>
            </Progress>
            <p className="text-xs text-muted-foreground">{topic.questionsAnswered} টি প্রশ্নের উত্তর দেওয়া হয়েছে</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
