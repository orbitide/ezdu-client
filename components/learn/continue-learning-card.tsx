import Link from "next/link"
import { PlayCircle, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { courses } from "@/lib/mock/courses"

export function ContinueLearningCard() {
  const course = courses.find((c) => c.enrolled && c.progressPercent < 100)

  if (!course) return null

  return (
    <Link href={`/learn/courses/${course.id}`}>
      <Card className="transition hover:border-primary/40">
        <CardContent className="flex items-center gap-3 py-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <PlayCircle className="size-5" />
          </div>
          <div className="flex-1 space-y-1.5">
            <p className="text-sm font-semibold">চালিয়ে যাও</p>
            <p className="font-medium">{course.title}</p>
            <Progress value={course.progressPercent} />
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  )
}
