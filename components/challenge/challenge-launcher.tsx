import Link from "next/link"
import { Atom, FlaskConical, Leaf, Sigma, BookOpen, Languages, BookMarked, type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { subjects } from "@/lib/mock/subjects"

const iconMap: Record<string, LucideIcon> = {
  Atom,
  FlaskConical,
  Leaf,
  Sigma,
  BookOpen,
  Languages,
}

export function ChallengeLauncher() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {subjects.map((subject) => {
        const Icon = iconMap[subject.icon]
        return (
          <Card key={subject.id}>
            <CardContent className="flex items-center justify-between gap-3 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{subject.name}</p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <BookMarked className="size-3.5" />
                    {subject.topicCount} টি লেসন
                  </div>
                </div>
              </div>
              <Button asChild size="sm">
                <Link href={`/challenge/subject/${subject.id}`}>শুরু করো</Link>
              </Button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
