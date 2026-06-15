import { PageHeader } from "@/components/shared/page-header"
import { NewsList } from "@/components/current-affairs/news-list"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function CurrentAffairsPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader title="কারেন্ট অ্যাফেয়ার্স" description="পরীক্ষার জন্য গুরুত্বপূর্ণ সাম্প্রতিক ঘটনাবলি জানো।" />
      <NewsList />
    </TwoColumnShell>
  )
}
