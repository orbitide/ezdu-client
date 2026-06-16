import Link from "next/link"
import { Settings, Share2 } from "lucide-react"
import { ProfileHeader } from "@/components/profile/profile-header"
import { WeeklyActivityChart } from "@/components/profile/weekly-activity-chart"
import { UserRankCard } from "@/components/profile/user-rank-card"
import { ProfileInsightsSection } from "@/components/profile/profile-insights-section"
import { ProfileLastQuizSection } from "@/components/profile/profile-last-quiz-section"
import { ShareProfileButton } from "@/components/profile/share-profile-button"
import { Button } from "@/components/ui/button"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function ProfilePage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      {/* Header bar: name + share + settings */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">প্রোফাইল</h1>
        <div className="flex items-center gap-1">
          <ShareProfileButton />
          <Button asChild variant="ghost" size="icon">
            <Link href="/settings/profile">
              <Settings className="size-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Avatar + username + following + friend button */}
      <ProfileHeader />

      {/* সংক্ষিপ্ত বিবরণ */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold">সংক্ষিপ্ত বিবরণ</h2>
        <UserRankCard />
      </div>

      {/* সাপ্তাহিক কার্যক্রম */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold">সাপ্তাহিক কার্যক্রম</h2>
        <WeeklyActivityChart hideTitle />
      </div>

      {/* ইনসাইটস */}
      <ProfileInsightsSection />

      {/* সাম্প্রতিক কুইজ */}
      <ProfileLastQuizSection />

      {/* Achievements / Friends links */}
      <div className="flex gap-3">
        <Button asChild variant="outline" className="flex-1">
          <Link href="/profile/achievements">অর্জনসমূহ</Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href="/profile/friends">বন্ধুরা</Link>
        </Button>
      </div>
    </TwoColumnShell>
  )
}
