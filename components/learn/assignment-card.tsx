import Link from "next/link"
import { Clock, CheckCircle2, FileCheck2, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Assignment } from "@/lib/types/assignment"

const statusConfig = {
  pending: { icon: Clock, label: "জমা দিতে হবে", className: "bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  submitted: { icon: FileCheck2, label: "জমা দেওয়া হয়েছে", className: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  graded: { icon: CheckCircle2, label: "মূল্যায়ন হয়েছে", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" },
}

interface AssignmentCardProps {
  assignment: Assignment
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  const config = statusConfig[assignment.status]
  const Icon = config.icon

  return (
    <Link href={`/learn/assignments/${assignment.id}`}>
      <Card className="transition hover:border-primary/40">
        <CardContent className="flex items-center gap-3 py-4">
          <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${config.className}`}>
            <Icon className="size-5" />
          </div>
          <div className="flex-1 space-y-0.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={`rounded-full px-2 py-0.5 ${config.className}`}>{config.label}</span>
              <span>{assignment.subject}</span>
            </div>
            <p className="font-medium">{assignment.title}</p>
            <p className="text-xs text-muted-foreground">শেষ তারিখ: {assignment.dueDate}</p>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  )
}
