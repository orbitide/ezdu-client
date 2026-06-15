import { Megaphone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { FeedItem } from "@/lib/types/feed"

interface AnnouncementCardProps {
  item: FeedItem
}

export function AnnouncementCard({ item }: AnnouncementCardProps) {
  return (
    <Card>
      <CardContent className="flex items-start gap-3 py-4">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Megaphone className="size-4.5" />
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-medium">{item.title}</p>
          <p className="text-sm text-muted-foreground">{item.description}</p>
          <p className="text-xs text-muted-foreground">{item.timeAgo}</p>
        </div>
      </CardContent>
    </Card>
  )
}
