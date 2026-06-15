import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { AvatarSvg } from "@/components/avatar/avatar-svg"
import { cn } from "@/lib/utils"
import { formatCompactNumber } from "@/lib/utils/format"
import type { LeaderboardUser } from "@/lib/types/leaderboard"

interface LeaderboardRowProps {
  user: LeaderboardUser
  rankColorClass?: string
}

export function LeaderboardRow({ user, rankColorClass }: LeaderboardRowProps) {
  return (
    <Link href={`/profile/${user.username}`}>
      <Card className={user.isCurrentUser ? "border-primary/40 bg-primary/5" : undefined}>
        <CardContent className="flex items-center gap-3 py-3">
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold",
              rankColorClass
            )}
          >
            {user.rank}
          </span>
          <AvatarSvg config={user.avatar} size={36} />
          <div className="flex-1">
            <p className="font-medium">{user.name}</p>
          </div>
          <span className="text-sm font-semibold">{formatCompactNumber(user.xp)} XP</span>
        </CardContent>
      </Card>
    </Link>
  )
}
