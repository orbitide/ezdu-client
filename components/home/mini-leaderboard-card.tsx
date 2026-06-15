import Link from "next/link"
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { formatCompactNumber } from "@/lib/utils/format"
import { miniLeaderboard } from "@/lib/mock/home"

const medalStyles: Record<number, string> = {
  1: "bg-amber-400/20 text-amber-600 dark:text-amber-400",
  2: "bg-slate-400/20 text-slate-500 dark:text-slate-300",
  3: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 1)
    .join("")
    .toUpperCase()
}

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
              "flex items-center gap-3 rounded-lg p-2 transition-colors",
              entry.isCurrentUser ? "bg-primary/10 ring-1 ring-primary/20" : "hover:bg-muted/50"
            )}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-muted-foreground",
                medalStyles[entry.rank]
              )}
            >
              {entry.rank}
            </span>

            <Avatar size="sm">
              <AvatarFallback>{getInitials(entry.name)}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">
                {entry.name}
                {entry.isCurrentUser && <span className="ml-1.5 text-xs text-primary">(তুমি)</span>}
              </p>
            </div>

            <span className="text-sm font-semibold text-xp shrink-0">
              {formatCompactNumber(entry.xp)} XP
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
