import Link from "next/link"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ArchiveExam } from "@/lib/types/archive"

interface ArchiveExamCardProps {
  exam: ArchiveExam
}

export function ArchiveExamCard({ exam }: ArchiveExamCardProps) {
  return (
    <Card className="relative overflow-hidden p-4">
      <div className="absolute -right-5 -top-5 size-20 rounded-full bg-primary/10" />

      <div className="relative flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <FileText className="size-5" />
        </div>
        {exam.attempted && (
          <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600">
            <CheckCircle2 className="size-3.5" />
            সম্পন্ন
          </span>
        )}
      </div>

      <div className="relative mt-3 space-y-1">
        <p className="line-clamp-2 text-sm font-semibold leading-snug">{exam.title}</p>
        <p className="text-xs text-muted-foreground">
          {exam.board}, {exam.year}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{exam.questionCount} প্রশ্ন</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {exam.durationMinutes} মিনিট
          </span>
        </div>
      </div>

      <Button asChild size="sm" className="relative mt-3 w-full">
        <Link href={`/quiz/${exam.id}`}>{exam.attempted ? "আবার দাও" : "শুরু করো"}</Link>
      </Button>
    </Card>
  )
}
