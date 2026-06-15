import { PageHeader } from "@/components/shared/page-header"
import { FeedList } from "@/components/feed/feed-list"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function FeedPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader title="ফিড" description="ঘোষণা এবং বন্ধুদের সাম্প্রতিক কার্যক্রম দেখো।" />
      <FeedList />
    </TwoColumnShell>
  )
}
