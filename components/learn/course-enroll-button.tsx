"use client"

import { CheckCircle2, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLearningStore } from "@/lib/store/learning-store"

interface CourseEnrollButtonProps {
  courseId: string
  alreadyEnrolled: boolean
}

export function CourseEnrollButton({ courseId, alreadyEnrolled }: CourseEnrollButtonProps) {
  const isEnrolled = useLearningStore((s) => s.isEnrolled(courseId))
  const enrollCourse = useLearningStore((s) => s.enrollCourse)
  const enrolled = alreadyEnrolled || isEnrolled

  if (enrolled) {
    return (
      <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
        <CheckCircle2 className="size-4" />
        এনরোল করা হয়েছে
      </span>
    )
  }

  return (
    <Button onClick={() => enrollCourse(courseId)} className="gap-1.5">
      <GraduationCap className="size-4" />
      কোর্সে এনরোল করো
    </Button>
  )
}
