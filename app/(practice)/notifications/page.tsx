import { PageHeader } from "@/components/shared/page-header"
import { NotificationList } from "@/components/notifications/notification-list"

export default function NotificationsPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="নোটিফিকেশন" description="তোমার সাম্প্রতিক আপডেট ও সতর্কতা দেখো।" />
      <NotificationList />
    </div>
  )
}
