import Link from "next/link"
import { ListChecks, ChevronRight } from "lucide-react"

interface PracticeLinkCalloutProps {
  quizId: string
  label?: string
}

export function PracticeLinkCallout({ quizId, label = "সম্পর্কিত প্র্যাকটিস কুইজ দাও" }: PracticeLinkCalloutProps) {
  return (
    <Link
      href={`/quiz/${quizId}`}
      className="flex items-center gap-2 rounded-md border border-dashed border-primary/40 px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
    >
      <ListChecks className="size-4" />
      {label}
      <ChevronRight className="ml-auto size-4" />
    </Link>
  )
}
