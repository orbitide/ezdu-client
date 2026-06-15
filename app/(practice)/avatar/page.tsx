import { PageHeader } from "@/components/shared/page-header"
import { AvatarBuilder } from "@/components/avatar/avatar-builder"

export default function AvatarPage() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <PageHeader
        title="অ্যাভাটার তৈরি করো"
        description="তোমার পছন্দ মতো চুল, পোশাক ও রং বেছে নিয়ে অ্যাভাটার সাজাও।"
      />
      <AvatarBuilder />
    </div>
  )
}
