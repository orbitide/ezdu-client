import { ArchiveExamCard } from "@/components/archive/archive-exam-card"
import type { ArchiveExam } from "@/lib/types/archive"

interface ArchiveExamListProps {
  exams: ArchiveExam[]
}

export function ArchiveExamList({ exams }: ArchiveExamListProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {exams.map((exam) => (
        <ArchiveExamCard key={exam.id} exam={exam} />
      ))}
    </div>
  )
}
