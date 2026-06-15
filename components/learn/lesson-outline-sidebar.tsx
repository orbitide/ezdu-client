"use client"

import Link from "next/link"
import { CheckCircle2, Circle, PlayCircle, FileText, Lightbulb } from "lucide-react"
import { useLearningStore } from "@/lib/store/learning-store"
import { getLessonsByChapterId } from "@/lib/mock/lessons"
import { cn } from "@/lib/utils"
import type { Chapter, Course, Lesson } from "@/lib/types/course"

const iconByType = {
  video: PlayCircle,
  text: FileText,
  interactive: Lightbulb,
}

interface LessonOutlineSidebarProps {
  course: Course
  chapter: Chapter
  activeLessonId: string
}

export function LessonOutlineSidebar({ course, chapter, activeLessonId }: LessonOutlineSidebarProps) {
  const completedLessonIds = useLearningStore((s) => s.completedLessonIds)
  const lessons = getLessonsByChapterId(chapter.id)

  return (
    <div className="space-y-1">
      <p className="px-2 pb-2 text-sm font-semibold">{chapter.title}</p>
      {lessons.map((lesson: Lesson) => {
        const done = lesson.completed || completedLessonIds.includes(lesson.id)
        const Icon = iconByType[lesson.contentType]
        const isActive = lesson.id === activeLessonId
        return (
          <Link
            key={lesson.id}
            href={`/learn/courses/${course.id}/chapters/${chapter.id}/lessons/${lesson.id}`}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors",
              isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
            )}
          >
            {done ? (
              <CheckCircle2 className="size-4 shrink-0 text-green-600" />
            ) : (
              <Circle className="size-4 shrink-0 text-muted-foreground" />
            )}
            <Icon className="size-4 shrink-0 text-muted-foreground" />
            <span className="flex-1">{lesson.title}</span>
          </Link>
        )
      })}
    </div>
  )
}
