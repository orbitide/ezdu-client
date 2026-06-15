import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { EmptyState } from "@/components/shared/empty-state"
import { subjects, topics } from "@/lib/mock/subjects"
import { getQuestionsByTopic } from "@/lib/utils/challenge"

interface ChallengeLessonListProps {
  subjectId: string
}

export function ChallengeLessonList({ subjectId }: ChallengeLessonListProps) {
  const subject = subjects.find((s) => s.id === subjectId)
  const lessons = topics.filter((t) => t.subjectId === subjectId && getQuestionsByTopic(t.name).length > 0)

  if (!subject) {
    return null
  }

  if (lessons.length === 0) {
    return <EmptyState title="এই বিষয়ে এখনো কোনো লেসন নেই" description="অন্য একটি বিষয় বেছে নাও।" />
  }

  return (
    <div className="space-y-3">
      {lessons.map((lesson, index) => (
        <Link key={lesson.id} href={`/challenge/${lesson.id}`}>
          <Card className="transition-colors hover:border-primary/50">
            <CardContent className="flex items-center gap-3 py-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {index + 1}
              </div>
              <div className="flex-1 space-y-0.5">
                <p className="font-medium">{lesson.name}</p>
                <p className="text-xs text-muted-foreground">{lesson.questionCount} টি প্রশ্ন</p>
              </div>
              <ChevronRight className="size-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
