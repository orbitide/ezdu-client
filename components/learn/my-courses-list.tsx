"use client"

import { CourseCard } from "@/components/learn/course-card"
import { EmptyState } from "@/components/shared/empty-state"
import { useLearningStore } from "@/lib/store/learning-store"
import { courses } from "@/lib/mock/courses"

export function MyCoursesList() {
  const enrolledCourseIds = useLearningStore((s) => s.enrolledCourseIds)
  const enrolledCourses = courses.filter((c) => c.enrolled || enrolledCourseIds.includes(c.id))

  if (enrolledCourses.length === 0) {
    return <EmptyState title="কোনো কোর্সে এনরোল করা হয়নি" description="কোর্স ক্যাটালগ থেকে একটি কোর্সে এনরোল করো।" />
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {enrolledCourses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}
