import { Sparkles, Flame, Award, Bell, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import type { AppNotification } from "@/lib/types/notification"

const iconByType = {
  xp: Sparkles,
  streak: Flame,
  achievement: Award,
  system: Bell,
  social: Users,
}

const colorByType = {
  xp: "bg-xp/10 text-xp",
  streak: "bg-streak/10 text-streak",
  achievement: "bg-amber-500/10 text-amber-600",
  system: "bg-primary/10 text-primary",
  social: "bg-blue-500/10 text-blue-600",
}

interface NotificationItemProps {
  notification: AppNotification
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const Icon = iconByType[notification.type]

  return (
    <div className={cn("flex items-start gap-3 rounded-lg p-3", !notification.read && "bg-primary/5")}>
      <div className={cn("flex size-9 shrink-0 items-center justify-center rounded-full", colorByType[notification.type])}>
        <Icon className="size-4.5" />
      </div>
      <div className="flex-1 space-y-0.5">
        <p className="text-sm font-medium">{notification.title}</p>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        <p className="text-xs text-muted-foreground">{notification.timeAgo}</p>
      </div>
      {!notification.read && <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />}
    </div>
  )
}
