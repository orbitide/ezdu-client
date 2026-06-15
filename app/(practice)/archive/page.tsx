import { PageHeader } from "@/components/shared/page-header"
import { ArchiveBrowser } from "@/components/archive/archive-browser"
import { ArchiveRightRail } from "@/components/archive/archive-right-rail"
import { TwoColumnShell } from "@/components/layout/two-column-shell"

export default function ArchivePage() {
  return (
    <TwoColumnShell right={<ArchiveRightRail />}>
      <PageHeader title="আর্কাইভ" description="বিষয় বা প্রতিষ্ঠান বেছে নিয়ে পুরোনো বছরের প্রশ্নপত্র অনুশীলন করো।" />
      <ArchiveBrowser />
    </TwoColumnShell>
  )
}
