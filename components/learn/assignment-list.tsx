import { AssignmentCard } from "@/components/learn/assignment-card"
import { assignments } from "@/lib/mock/assignments"

export function AssignmentList() {
  return (
    <div className="space-y-3">
      {assignments.map((assignment) => (
        <AssignmentCard key={assignment.id} assignment={assignment} />
      ))}
    </div>
  )
}
