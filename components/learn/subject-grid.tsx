import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { courses } from "@/lib/mock/courses"

export function SubjectGrid() {
  const subjects = Array.from(new Set(courses.map((c) => c.subject)))

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {subjects.map((subject) => (
        <Link key={subject} href={`/learn/courses?subject=${encodeURIComponent(subject)}`}>
          <Card className="transition hover:border-primary/40">
            <CardContent className="flex items-center justify-center py-4 text-center">
              <p className="text-sm font-medium">{subject}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
