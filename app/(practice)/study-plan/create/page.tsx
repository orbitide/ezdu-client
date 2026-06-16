import { PlanCreationWizard } from "@/components/study-plan/plan-creation-wizard"
import { PageHeader } from "@/components/shared/page-header"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function CreateStudyPlanPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader title="নতুন পরিকল্পনা তৈরি করো" description="ধাপে ধাপে তোমার পার্সোনালাইজড স্টাডি প্ল্যান সেট আপ করো।" />
      <PlanCreationWizard />
    </TwoColumnShell>
  )
}
