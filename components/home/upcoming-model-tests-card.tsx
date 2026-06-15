import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CalendarClock } from "lucide-react"
import { upcomingModelTests } from "@/lib/mock/home"

export function UpcomingModelTestsCard() {
  if (upcomingModelTests.length === 0) return null

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>আসন্ন মডেল টেস্ট</CardTitle>
        <Link href="/mock-test" className="text-xs font-medium text-primary hover:underline">
          সব দেখুন
        </Link>
      </CardHeader>
      <CardContent className="space-y-2">
        {upcomingModelTests.map((test) => (
          <Link
            key={test.id}
            href="/mock-test"
            className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
          >
            <CalendarClock className="size-5 shrink-0 text-primary" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium">{test.title}</p>
              <p className="text-xs text-muted-foreground">{test.examGroup}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{test.scheduledFor}</span>
                <span>{test.durationMinutes} মিনিট</span>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
