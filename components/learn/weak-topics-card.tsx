import Link from "next/link"
import { AlertTriangle, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { weakTopics } from "@/lib/mock/learning-progress"

export function WeakTopicsCard() {
  return (
    <Card>
      <CardContent className="space-y-3 pt-6">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <AlertTriangle className="size-4 text-amber-600" />
          দুর্বল টপিকসমূহ
        </p>
        <div className="space-y-3">
          {weakTopics.map((topic) => (
            <Link
              key={topic.id}
              href={topic.courseId && topic.chapterId ? `/learn/courses/${topic.courseId}/chapters/${topic.chapterId}` : "#"}
              className="block space-y-1 rounded-md p-2 transition-colors hover:bg-muted"
            >
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-medium">
                  {topic.subject} - {topic.topic}
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  {topic.masteryPercent}%
                  <ChevronRight className="size-4" />
                </span>
              </div>
              <Progress value={topic.masteryPercent} />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
