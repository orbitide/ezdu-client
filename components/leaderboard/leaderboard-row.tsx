import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AvatarSvg } from "@/components/avatar/avatar-svg"
import { cn } from "@/lib/utils"
import { formatCompactNumber } from "@/lib/utils/format"
import type { LeaderboardUser } from "@/lib/types/leaderboard"

interface LeaderboardRowProps {
  user: LeaderboardUser
  rankColor?: "promotion" | "demotion"
}

const rankColorClasses: Record<"promotion" | "demotion", string> = {
  promotion: "text-primary",
  demotion: "text-destructive",
}

export function LeaderboardRow({ user, rankColor }: LeaderboardRowProps) {
  return (
    <Link href={`/profile/${user.username}`}>
      <Card className={user.isCurrentUser ? "border-primary/40 bg-primary/5" : undefined}>
        <CardContent className="flex items-center gap-3 py-3">
          <Badge
            variant="ghost"
            className={cn("size-8 rounded-full text-sm", rankColor && rankColorClasses[rankColor])}
          >
            {user.rank}
          </Badge>
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
