import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { VocabBank } from "@/components/vocabulary/vocab-bank"

export default function VocabBankPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href="/vocabulary" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        ভোকাবুলারি হাবে ফিরে যাও
      </Link>
      <PageHeader title="শব্দ ভাণ্ডার" description="সব শব্দ খুঁজো, অর্থ ও উদাহরণ দেখো এবং বুকমার্ক করো।" />
      <VocabBank />
    </div>
  )
}
