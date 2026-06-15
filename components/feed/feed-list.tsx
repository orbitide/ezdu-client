import { AnnouncementCard } from "@/components/feed/announcement-card"
import { FriendActivityCard } from "@/components/feed/friend-activity-card"
import { feedItems } from "@/lib/mock/feed"

export function FeedList() {
  return (
    <div className="space-y-3">
      {feedItems.map((item) =>
        item.type === "announcement" ? (
          <AnnouncementCard key={item.id} item={item} />
        ) : (
          <FriendActivityCard key={item.id} item={item} />
        )
      )}
    </div>
  )
}
