import { PageHeader } from "@/components/shared/page-header"
import { NotificationList } from "@/components/notifications/notification-list"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function NotificationsPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader title="নোটিফিকেশন" description="তোমার সাম্প্রতিক আপডেট ও সতর্কতা দেখো।" />
      <NotificationList />
    </TwoColumnShell>
  )
}
