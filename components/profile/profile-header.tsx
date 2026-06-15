"use client"

import { Settings } from "lucide-react"
import Link from "next/link"
import { AvatarSvg } from "@/components/avatar/avatar-svg"
import { Button } from "@/components/ui/button"
import { RankBadge } from "@/components/shared/rank-badge"
import { XpBadge } from "@/components/shared/xp-badge"
import { StreakBadge } from "@/components/shared/streak-badge"
import { useAuthStore } from "@/lib/store/auth-store"
import { useProgressStore } from "@/lib/store/progress-store"

export function ProfileHeader() {
  const user = useAuthStore((s) => s.user)
  const { xp, level, streakDays, rankTier } = useProgressStore((s) => s)

  return (
    <div className="flex flex-wrap items-center gap-4">
      <AvatarSvg config={user?.avatar} size={88} />
      <div className="flex-1 space-y-2">
        <div>
          <h1 className="text-xl font-bold">{user?.name ?? "গেস্ট"}</h1>
          <p className="text-sm text-muted-foreground">
            {user?.examGroup} {user?.className && `· ${user.className}`}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <RankBadge tier={rankTier} />
          <XpBadge xp={xp} level={level} />
          <StreakBadge days={streakDays} />
        </div>
      </div>
      <Button asChild variant="outline" size="sm" className="gap-1.5">
        <Link href="/settings/profile">
          <Settings className="size-4" />
          প্রোফাইল সম্পাদনা
        </Link>
      </Button>
    </div>
  )
}
