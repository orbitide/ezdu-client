import Link from "next/link"
import { ClipboardCheck, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { assignments } from "@/lib/mock/assignments"

export function AssignmentsDueCard() {
  const pending = assignments.filter((a) => a.status === "pending")

  if (pending.length === 0) return null

  return (
    <Card>
      <CardContent className="space-y-3 pt-6">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <ClipboardCheck className="size-4" />
          জমা দেওয়া বাকি অ্যাসাইনমেন্ট
        </p>
        <div className="space-y-1">
          {pending.map((assignment) => (
            <Link
              key={assignment.id}
              href={`/learn/assignments/${assignment.id}`}
              className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">{assignment.title}</p>
                <p className="text-xs text-muted-foreground">শেষ তারিখ: {assignment.dueDate}</p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
