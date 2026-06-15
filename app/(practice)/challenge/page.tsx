import { PageHeader } from "@/components/shared/page-header"
import { ChallengeLauncher } from "@/components/challenge/challenge-launcher"

export default function ChallengePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="চ্যালেঞ্জ" description="বিষয় বেছে নিয়ে কুইক চ্যালেঞ্জ শুরু করো।" />
      <ChallengeLauncher />
    </div>
  )
}
