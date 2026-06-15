import { PageHeader } from "@/components/shared/page-header"
import { SubjectGrid } from "@/components/learn/subject-grid"
import { StudyPlanCard } from "@/components/learn/study-plan-card"
import { WeakTopicsCard } from "@/components/learn/weak-topics-card"
import { ContinueLearningCard } from "@/components/learn/continue-learning-card"
import { UpcomingLiveClassCard } from "@/components/learn/upcoming-live-class-card"
import { RecentNotesCard } from "@/components/learn/recent-notes-card"
import { AssignmentsDueCard } from "@/components/learn/assignments-due-card"

export default function LearnDashboardPage() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <PageHeader
        title="তোমার স্টাডি প্ল্যান"
        description="তোমার অগ্রগতি ও লক্ষ্য অনুযায়ী এখন কোথায় ফোকাস করবে।"
      />
      <ContinueLearningCard />
      <div className="grid gap-4 lg:grid-cols-2">
        <StudyPlanCard />
        <WeakTopicsCard />
        <UpcomingLiveClassCard />
        <AssignmentsDueCard />
        <RecentNotesCard />
      </div>
      <div>
        <h2 className="mb-3 text-lg font-semibold">বিষয়সমূহ</h2>
        <SubjectGrid />
      </div>
    </div>
  )
}
