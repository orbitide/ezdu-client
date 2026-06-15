import { PageHeader } from "@/components/shared/page-header"
import { AvatarBuilder } from "@/components/avatar/avatar-builder"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function AvatarPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader
        title="অ্যাভাটার তৈরি করো"
        description="তোমার পছন্দ মতো চুল, পোশাক ও রং বেছে নিয়ে অ্যাভাটার সাজাও।"
      />
      <AvatarBuilder />
    </TwoColumnShell>
  )
}
