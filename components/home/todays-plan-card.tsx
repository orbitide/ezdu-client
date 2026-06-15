import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { todaysPlan } from "@/lib/mock/home"

export function TodaysPlanCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>আজকের পরিকল্পনা</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {todaysPlan.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg border p-3"
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
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
