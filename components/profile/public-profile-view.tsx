import { AvatarSvg } from "@/components/avatar/avatar-svg"
import { RankBadge } from "@/components/shared/rank-badge"
import { XpBadge } from "@/components/shared/xp-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { defaultAvatarConfig } from "@/lib/avatar/avatar-data"
import { ActivityBarChart } from "@/components/charts/activity-bar-chart"
import { weeklyActivity } from "@/lib/mock/progress"
import { CheckCircle2, Target, Sparkles } from "lucide-react"
import { formatCompactNumber } from "@/lib/utils/format"
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
          <div className="flex gap-4 text-sm text-muted-foreground">
            <span><strong className="text-foreground">98</strong> ফলো করছে</span>
            <span><strong className="text-foreground">54</strong> ফলোয়ার</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="space-y-1 py-4 text-center">
            <Sparkles className="mx-auto size-5 text-xp" />
            <p className="text-lg font-bold">{formatCompactNumber(user.xp)}</p>
            <p className="text-xs text-muted-foreground">মোট এক্সপি</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-1 py-4 text-center">
            <Target className="mx-auto size-5 text-primary" />
            <p className="text-lg font-bold">৭৪%</p>
            <p className="text-xs text-muted-foreground">সঠিকতা</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-1 py-4 text-center">
            <CheckCircle2 className="mx-auto size-5 text-green-600" />
            <p className="text-lg font-bold">#{user.rank}</p>
            <p className="text-xs text-muted-foreground">র‍্যাংক</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">সাপ্তাহিক কার্যক্রম</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityBarChart data={weeklyActivity} />
        </CardContent>
      </Card>
    </div>
  )
}
