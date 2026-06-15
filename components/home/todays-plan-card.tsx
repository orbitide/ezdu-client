import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { todaysPlan } from "@/lib/mock/home"

export function TodaysPlanCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>আজকের পরিকল্পনা</CardTitle>
        <Link href="/study-plan" className="text-xs font-medium text-primary hover:underline">
          সব দেখুন
        </Link>
      </CardHeader>
      <CardContent className="space-y-2">
        {todaysPlan.map((item) => (
          <Link
            key={item.id}
            href="/study-plan"
            className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-accent"
          >
            {item.completed ? (
              <CheckCircle2 className="size-5 shrink-0 text-primary" />
            ) : (
              <Circle className="size-5 shrink-0 text-muted-foreground" />
            )}
            <div className="flex-1 space-y-0.5">
              <p className={cn("text-sm font-medium", item.completed && "text-muted-foreground line-through")}>
                {item.title}
              </p>
              <p className="text-xs text-muted-foreground">{item.subject}</p>
            </div>
            <Badge variant="ghost" className="gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" />
              {item.durationMinutes} মিনিট
            </Badge>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
