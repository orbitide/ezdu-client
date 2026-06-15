import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { RankBadge } from "@/components/shared/rank-badge"
import { formatCompactNumber } from "@/lib/utils/format"
import type { LeaderboardUser } from "@/lib/types/leaderboard"

interface LeaderboardRowProps {
  user: LeaderboardUser
}

export function LeaderboardRow({ user }: LeaderboardRowProps) {
  return (
    <Link href={`/profile/${user.username}`}>
      <Card className={user.isCurrentUser ? "border-primary/40 bg-primary/5" : undefined}>
        <CardContent className="flex items-center gap-3 py-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold">
            {user.rank}
          </span>
          <div className="flex-1">
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">লেভেল {user.level}</p>
          </div>
          <RankBadge tier={user.rankTier} />
          <span className="text-sm font-semibold text-xp">{formatCompactNumber(user.xp)} XP</span>
        </CardContent>
      </Card>
    </Link>
  )
}
