import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { VocabBank } from "@/components/vocabulary/vocab-bank"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function VocabBankPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <Link href="/vocabulary" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        ভোকাবুলারি হাবে ফিরে যাও
      </Link>
      <PageHeader title="শব্দ ভাণ্ডার" description="সব শব্দ খুঁজো, অর্থ ও উদাহরণ দেখো এবং বুকমার্ক করো।" />
      <VocabBank />
    </TwoColumnShell>
  )
}
