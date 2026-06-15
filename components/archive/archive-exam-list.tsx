import { ArchiveExamCard } from "@/components/archive/archive-exam-card"
import { archiveExams } from "@/lib/mock/archive"

export function ArchiveExamList() {
  return (
    <div className="space-y-3">
      {archiveExams.map((exam) => (
        <ArchiveExamCard key={exam.id} exam={exam} />
      ))}
    </div>
  )
}
