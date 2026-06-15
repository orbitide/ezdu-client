import Link from "next/link"
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatCompactNumber } from "@/lib/utils/format"
import { miniLeaderboard } from "@/lib/mock/home"

export function MiniLeaderboardCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>সাপ্তাহিক লিডারবোর্ড</CardTitle>
        <CardAction>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/leaderboard">সব দেখো</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-1">
        {miniLeaderboard.map((entry) => (
          <div
            key={entry.id}
            className={cn(
              "flex items-center gap-3 rounded-lg p-2",
              entry.isCurrentUser && "bg-primary/10"
            )}
          >
            <span className="w-6 text-center text-sm font-semibold text-muted-foreground">
              {entry.rank}
            </span>
            <p className="flex-1 truncate text-sm font-medium">{entry.name}</p>
            <span className="text-sm font-semibold text-xp">
              {formatCompactNumber(entry.xp)} XP
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
