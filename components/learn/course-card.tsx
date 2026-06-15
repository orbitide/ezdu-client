import Link from "next/link"
import { BookOpen, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Course } from "@/lib/types/course"
import { cn } from "@/lib/utils"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/learn/courses/${course.id}`}>
      <Card className="overflow-hidden transition hover:border-primary/40">
        <div className={cn("h-2 w-full bg-gradient-to-r", course.coverColor)} />
        <CardContent className="space-y-2 py-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <GraduationCap className="size-3.5" />
            {course.examGroup}
          </div>
          <p className="font-medium">{course.title}</p>
          <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <BookOpen className="size-3.5" />
            {course.totalLessons} টি লেসন
          </div>
          {course.enrolled && (
            <div className="space-y-1 pt-1">
              <Progress value={course.progressPercent} />
              <p className="text-xs text-muted-foreground">{course.progressPercent}% সম্পন্ন</p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
