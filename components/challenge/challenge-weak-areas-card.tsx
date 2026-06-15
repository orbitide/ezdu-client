import Link from "next/link"
import { AlertTriangle, ChevronRight } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { subjectMastery } from "@/lib/mock/progress"

export function ChallengeWeakAreasCard() {
  const weakSubjects = [...subjectMastery]
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-amber-600" />
          দুর্বল বিষয় ও টপিক
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {weakSubjects.map((subject) => (
          <Link
            key={subject.subjectId}
            href={`/challenge/subject/${subject.subjectId}`}
            className="block space-y-1 rounded-md p-2 transition-colors hover:bg-accent"
          >
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-medium">{subject.subjectName}</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                {subject.accuracy}%
                <ChevronRight className="size-4" />
              </span>
            </div>
            <Progress value={subject.accuracy} />
            {subject.topics.map((topic) => (
              <p key={topic.topicId} className="pl-1 text-xs text-muted-foreground">
                {topic.topicName} - {topic.accuracy}%
              </p>
            ))}
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
