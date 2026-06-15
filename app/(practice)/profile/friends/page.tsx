import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { FriendsList } from "@/components/profile/friends-list"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default function FriendsPage() {
  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <Link href="/profile" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        প্রোফাইলে ফিরে যাও
      </Link>
      <PageHeader title="বন্ধুরা" description="তোমার বন্ধুদের অগ্রগতি দেখো।" />
      <FriendsList />
    </TwoColumnShell>
  )
}
