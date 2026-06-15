import { PageHeader } from "@/components/shared/page-header"
import { TodaysPlanList } from "@/components/study-plan/todays-plan-list"
import { SubjectRotationCard } from "@/components/study-plan/subject-rotation-card"

export default function StudyPlanPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="স্টাডি প্ল্যান" description="আজকের পরিকল্পনা অনুসরণ করে অনুশীলন চালিয়ে যাও।" />
      <div>
        <h2 className="mb-3 text-lg font-semibold">আজকের পরিকল্পনা</h2>
        <TodaysPlanList />
      </div>
      <SubjectRotationCard />
    </div>
  )
}
