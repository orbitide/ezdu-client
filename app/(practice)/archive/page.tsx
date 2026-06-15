import { PageHeader } from "@/components/shared/page-header"
import { ArchiveBrowser } from "@/components/archive/archive-browser"

export default function ArchivePage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="আর্কাইভ" description="বিষয় বা প্রতিষ্ঠান বেছে নিয়ে পুরোনো বছরের প্রশ্নপত্র অনুশীলন করো।" />
      <ArchiveBrowser />
    </div>
  )
}
