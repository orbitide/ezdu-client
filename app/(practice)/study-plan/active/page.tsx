import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PlanActiveView } from "@/components/study-plan/plan-active-view"
import { PageHeader } from "@/components/shared/page-header"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"
import { Button } from "@/components/ui/button"

export default function ActiveStudyPlanPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <Link href="/study-plan" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        স্টাডি প্ল্যানে ফিরে যাও
      </Link>
      <PageHeader
        title="সক্রিয় পরিকল্পনা"
        description="প্রতিটি পাঠ সম্পন্ন করে চেকমার্ক দাও।"
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href="/study-plan/create">নতুন পরিকল্পনা</Link>
          </Button>
        }
      />
      <PlanActiveView />
    </TwoColumnShell>
  )
}
