export type FeedItemType = "announcement" | "friend-activity"

export interface FeedItem {
  id: string
  type: FeedItemType
  title: string
  description: string
  timeAgo: string
  username?: string
  avatarSeed?: string
}
