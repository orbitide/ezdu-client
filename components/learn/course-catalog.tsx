"use client"

import { useState } from "react"
import { CourseCard } from "@/components/learn/course-card"
import { courses } from "@/lib/mock/courses"
import { cn } from "@/lib/utils"

interface CourseCatalogProps {
  initialSubject?: string
}

export function CourseCatalog({ initialSubject }: CourseCatalogProps) {
  const examGroups = Array.from(new Set(courses.map((c) => c.examGroup)))
  const [activeGroup, setActiveGroup] = useState<string | null>(null)
  const subjectFilter = initialSubject

  const filtered = courses.filter((c) => {
    if (subjectFilter && c.subject !== subjectFilter) return false
    if (activeGroup && c.examGroup !== activeGroup) return false
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveGroup(null)}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            activeGroup === null ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
          )}
        >
          সব
        </button>
        {examGroups.map((group) => (
          <button
            key={group}
            onClick={() => setActiveGroup(group)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              activeGroup === group ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {group}
          </button>
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
