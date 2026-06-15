import { PageHeader } from "@/components/shared/page-header"
import { NewsList } from "@/components/current-affairs/news-list"

export default function CurrentAffairsPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="কারেন্ট অ্যাফেয়ার্স" description="পরীক্ষার জন্য গুরুত্বপূর্ণ সাম্প্রতিক ঘটনাবলি জানো।" />
      <NewsList />
    </div>
  )
}
