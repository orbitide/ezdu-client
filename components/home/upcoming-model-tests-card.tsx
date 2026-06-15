import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CalendarClock } from "lucide-react"
import { upcomingModelTests } from "@/lib/mock/home"

export function UpcomingModelTestsCard() {
  if (upcomingModelTests.length === 0) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>আসন্ন মডেল টেস্ট</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {upcomingModelTests.map((test) => (
          <div key={test.id} className="flex items-center gap-3 rounded-lg border p-3">
            <CalendarClock className="size-5 shrink-0 text-primary" />
            <div className="flex-1 space-y-0.5">
              <p className="text-sm font-medium">{test.title}</p>
              <p className="text-xs text-muted-foreground">{test.examGroup}</p>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              <p>{test.scheduledFor}</p>
              <p>{test.durationMinutes} মিনিট</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
