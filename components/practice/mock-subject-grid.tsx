import Link from "next/link"
import { Atom, FlaskConical, Leaf, Sigma, BookOpen, Languages, type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { subjects } from "@/lib/mock/subjects"

const iconMap: Record<string, LucideIcon> = {
  Atom,
  FlaskConical,
  Leaf,
  Sigma,
  BookOpen,
  Languages,
}

export function MockSubjectGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {subjects.map((subject) => {
        const Icon = iconMap[subject.icon]
        return (
          <Link key={subject.id} href={`/practice/mock-tests/${subject.id}`}>
            <Card className="transition hover:bg-muted/50">
              <CardContent className="flex flex-col items-center gap-2 py-5 text-center">
                <Icon className="size-7 text-primary" />
                <p className="text-sm font-medium">{subject.name}</p>
                <p className="text-xs text-muted-foreground">{subject.topicCount} টপিক</p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
