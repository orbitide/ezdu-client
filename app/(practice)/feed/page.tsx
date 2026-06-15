import { PageHeader } from "@/components/shared/page-header"
import { FeedList } from "@/components/feed/feed-list"

export default function FeedPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="ফিড" description="ঘোষণা এবং বন্ধুদের সাম্প্রতিক কার্যক্রম দেখো।" />
      <FeedList />
    </div>
  )
}
