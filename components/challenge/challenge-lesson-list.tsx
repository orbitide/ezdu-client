"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/shared/empty-state"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { subjects, topics } from "@/lib/mock/subjects"
import { getQuestionsByTopic } from "@/lib/utils/challenge"

interface ChallengeLessonListProps {
  subjectId: string
}

export function ChallengeLessonList({ subjectId }: ChallengeLessonListProps) {
  const router = useRouter()
  const subject = subjects.find((s) => s.id === subjectId)
  const lessons = topics.filter((t) => t.subjectId === subjectId && getQuestionsByTopic(t.name).length > 0)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [confirmOpen, setConfirmOpen] = useState(false)

  if (!subject) {
    return null
  }

  if (lessons.length === 0) {
    return <EmptyState title="এই বিষয়ে এখনো কোনো লেসন নেই" description="অন্য একটি বিষয় বেছে নাও।" />
  }

  const toggleLesson = (lessonId: string) => {
    setSelectedIds((prev) => (prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]))
  }

  const selectedLessons = lessons.filter((l) => selectedIds.includes(l.id))
  const totalQuestions = selectedLessons.reduce((sum, l) => sum + getQuestionsByTopic(l.name).length, 0)

  const handleConfirm = () => {
    router.push(`/challenge/${selectedIds.join("+")}`)
  }

  return (
    <div className="space-y-3 pb-20">
      {lessons.map((lesson, index) => (
        <Card
          key={lesson.id}
          className="cursor-pointer transition-colors hover:border-primary/50"
          onClick={() => toggleLesson(lesson.id)}
        >
          <CardContent className="flex items-center gap-3 py-4">
            <Checkbox checked={selectedIds.includes(lesson.id)} onCheckedChange={() => toggleLesson(lesson.id)} />
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {index + 1}
            </div>
            <div className="flex-1 space-y-0.5">
              <p className="font-medium">{lesson.name}</p>
              <p className="text-xs text-muted-foreground">{lesson.questionCount} টি প্রশ্ন</p>
            </div>
            <ChevronRight className="size-5 text-muted-foreground" />
          </CardContent>
        </Card>
      ))}

      {selectedIds.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background p-4 md:left-16 lg:left-64">
          <Button className="w-full" size="lg" onClick={() => setConfirmOpen(true)}>
            শুরু করো ({selectedIds.length} টি লেসন)
          </Button>
        </div>
      )}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>চ্যালেঞ্জ শুরু করবে?</DialogTitle>
            <DialogDescription>নির্বাচিত লেসন থেকে প্রশ্ন নিয়ে চ্যালেঞ্জ শুরু হবে।</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            {selectedLessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center justify-between text-sm">
                <span>{lesson.name}</span>
                <span className="text-muted-foreground">{getQuestionsByTopic(lesson.name).length} প্রশ্ন</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-2 text-sm font-medium">
              <span>সর্বমোট</span>
              <span>{totalQuestions} প্রশ্ন</span>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleConfirm} className="w-full">
              শুরু করো
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
