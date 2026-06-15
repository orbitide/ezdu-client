import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress, ProgressTrack, ProgressIndicator } from "@/components/ui/progress"
import { subjectMastery } from "@/lib/mock/progress"

export function MasterySubjectList() {
  return (
    <div className="space-y-3">
      {subjectMastery.map((subject) => (
        <Link key={subject.subjectId} href={`/progress/mastery/${subject.subjectId}`}>
          <Card className="transition hover:bg-muted/50">
            <CardContent className="flex items-center gap-4 py-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{subject.subjectName}</p>
                  <span className="text-sm font-semibold text-primary">{subject.accuracy}%</span>
                </div>
                <Progress value={subject.accuracy}>
                  <ProgressTrack>
                    <ProgressIndicator />
                  </ProgressTrack>
                </Progress>
                <p className="text-xs text-muted-foreground">{subject.questionsAnswered} টি প্রশ্নের উত্তর দেওয়া হয়েছে</p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
