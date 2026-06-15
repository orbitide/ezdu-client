import { AvatarSvg } from "@/components/avatar/avatar-svg"
import { RankBadge } from "@/components/shared/rank-badge"
import { XpBadge } from "@/components/shared/xp-badge"
import { Card, CardContent } from "@/components/ui/card"
import { defaultAvatarConfig } from "@/lib/avatar/avatar-data"
import type { LeaderboardUser } from "@/lib/types/leaderboard"

interface PublicProfileViewProps {
  user: LeaderboardUser
}

export function PublicProfileView({ user }: PublicProfileViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <AvatarSvg config={defaultAvatarConfig} size={88} />
        <div className="flex-1 space-y-2">
          <div>
            <h1 className="text-xl font-bold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <RankBadge tier={user.rankTier} />
            <XpBadge xp={user.xp} level={user.level} />
          </div>
        </div>
      </div>
      <Card>
        <CardContent className="flex items-center justify-between py-4">
          <p className="text-sm text-muted-foreground">লিডারবোর্ডে অবস্থান</p>
          <p className="text-lg font-bold">#{user.rank}</p>
        </CardContent>
      </Card>
    </div>
  )
}
