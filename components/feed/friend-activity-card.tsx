import { AvatarSvg } from "@/components/avatar/avatar-svg"
import { Card, CardContent } from "@/components/ui/card"
import { defaultAvatarConfig } from "@/lib/avatar/avatar-data"
import type { FeedItem } from "@/lib/types/feed"

interface FriendActivityCardProps {
  item: FeedItem
}

export function FriendActivityCard({ item }: FriendActivityCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3 py-4">
        <div className="size-9 shrink-0 overflow-hidden rounded-full bg-muted">
          <AvatarSvg config={defaultAvatarConfig} />
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-medium">
            @{item.username} {item.title}
          </p>
          <p className="text-sm text-muted-foreground">{item.description}</p>
          <p className="text-xs text-muted-foreground">{item.timeAgo}</p>
        </div>
      </CardContent>
    </Card>
  )
}
