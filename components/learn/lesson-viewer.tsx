"use client"

import { CheckCircle2, Sparkles } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { VideoPlayer } from "@/components/learn/video-player"
import { InteractiveExplainer } from "@/components/learn/interactive-explainer"
import { AskDoubtButton } from "@/components/learn/ask-doubt-button"
import { useLearningStore } from "@/lib/store/learning-store"
import { useProgressStore } from "@/lib/store/progress-store"
import type { Lesson } from "@/lib/types/course"

interface LessonViewerProps {
  lesson: Lesson
}

export function LessonViewer({ lesson }: LessonViewerProps) {
  const completedLessonIds = useLearningStore((s) => s.completedLessonIds)
  const markLessonComplete = useLearningStore((s) => s.markLessonComplete)
  const addXp = useProgressStore((s) => s.addXp)
  const done = lesson.completed || completedLessonIds.includes(lesson.id)

  const handleComplete = () => {
    if (done) return
    markLessonComplete(lesson.id)
    addXp(lesson.xpReward)
    toast.success("লেসন সম্পন্ন হয়েছে!", {
      description: (
        <span className="flex items-center gap-1 text-xp">
          <Sparkles className="size-3.5" />
          +{lesson.xpReward} XP
        </span>
      ),
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-bold">{lesson.title}</h1>
        <p className="flex items-center gap-1.5 text-sm text-xp">
          <Sparkles className="size-4" />
          {lesson.xpReward} XP
        </p>
      </div>

      {lesson.contentType === "video" && <VideoPlayer title={lesson.title} />}

      {lesson.contentType === "text" && (
        <p className="leading-relaxed text-muted-foreground">{lesson.textContent}</p>
      )}

      {lesson.contentType === "interactive" && lesson.explainerSteps && (
        <InteractiveExplainer steps={lesson.explainerSteps} onFinish={handleComplete} />
      )}

      <div className="flex flex-wrap items-center gap-3">
        {done ? (
          <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="size-4" />
            সম্পন্ন হয়েছে
          </span>
        ) : (
          lesson.contentType !== "interactive" && (
            <Button onClick={handleComplete} className="gap-1.5">
              <CheckCircle2 className="size-4" />
              সম্পন্ন হিসেবে চিহ্নিত করো
            </Button>
          )
        )}
        <AskDoubtButton lessonId={lesson.id} />
      </div>
    </div>
  )
}
