export type NotificationType = "xp" | "streak" | "achievement" | "system" | "social"

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  timeAgo: string
  read: boolean
}
