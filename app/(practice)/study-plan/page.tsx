import { PageHeader } from "@/components/shared/page-header"
import { TodaysPlanList } from "@/components/study-plan/todays-plan-list"
import { SubjectRotationCard } from "@/components/study-plan/subject-rotation-card"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function StudyPlanPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader title="স্টাডি প্ল্যান" description="আজকের পরিকল্পনা অনুসরণ করে অনুশীলন চালিয়ে যাও।" />
      <div>
        <h2 className="mb-3 text-lg font-semibold">আজকের পরিকল্পনা</h2>
        <TodaysPlanList />
      </div>
      <SubjectRotationCard />
    </TwoColumnShell>
  )
}
