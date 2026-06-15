"use client"

import Link from "next/link"
import { CheckCircle2, Circle, ChevronRight, ListChecks } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLearningStore } from "@/lib/store/learning-store"
import { getLessonsByChapterId } from "@/lib/mock/lessons"
import type { Chapter, Course } from "@/lib/types/course"

interface ChapterListProps {
  course: Course
  chapters: Chapter[]
}

export function ChapterList({ course, chapters }: ChapterListProps) {
  const completedLessonIds = useLearningStore((s) => s.completedLessonIds)

  return (
    <div className="space-y-3">
      {chapters.map((chapter) => {
        const chapterLessons = getLessonsByChapterId(chapter.id)
        const completedCount = chapterLessons.filter(
          (l) => l.completed || completedLessonIds.includes(l.id)
        ).length

        return (
          <Card key={chapter.id}>
            <CardContent className="space-y-3 py-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium">{chapter.title}</p>
                <span className="text-xs text-muted-foreground">
                  {completedCount} / {chapterLessons.length}
                </span>
              </div>
              <div className="space-y-1.5">
                {chapterLessons.map((lesson) => {
                  const done = lesson.completed || completedLessonIds.includes(lesson.id)
                  return (
                    <Link
                      key={lesson.id}
                      href={`/learn/courses/${course.id}/chapters/${chapter.id}/lessons/${lesson.id}`}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted"
                    >
                      {done ? (
                        <CheckCircle2 className="size-4 shrink-0 text-green-600" />
                      ) : (
                        <Circle className="size-4 shrink-0 text-muted-foreground" />
                      )}
                      <span className="flex-1">{lesson.title}</span>
                      <span className="text-xs text-muted-foreground">{lesson.durationMinutes} মিনিট</span>
                      <ChevronRight className="size-4 text-muted-foreground" />
                    </Link>
                  )
                })}
              </div>
              {chapter.linkedQuizId && (
                <Link
                  href={`/quiz/${chapter.linkedQuizId}`}
                  className="flex items-center gap-2 rounded-md border border-dashed border-primary/40 px-2 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                >
                  <ListChecks className="size-4" />
                  সম্পর্কিত প্র্যাকটিস কুইজ দাও
                  <ChevronRight className="ml-auto size-4" />
                </Link>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
