import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { AchievementsSection } from "@/components/profile/achievements-section"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function AchievementsPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <Link href="/profile" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        প্রোফাইলে ফিরে যাও
      </Link>
      <PageHeader title="অর্জনসমূহ" description="তোমার সব ব্যাজ ও অর্জন দেখো।" />
      <AchievementsSection />
    </TwoColumnShell>
  )
}
