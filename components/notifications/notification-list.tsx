import { Card, CardContent } from "@/components/ui/card"
import { NotificationItem } from "@/components/notifications/notification-item"
import { notifications } from "@/lib/mock/notifications"

export function NotificationList() {
  return (
    <Card>
      <CardContent className="divide-y pt-6">
        {notifications.map((notification) => (
          <div key={notification.id} className="py-1 first:pt-0 last:pb-0">
            <NotificationItem notification={notification} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
