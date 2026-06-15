import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { FriendsList } from "@/components/profile/friends-list"

export default function FriendsPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href="/profile" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        প্রোফাইলে ফিরে যাও
      </Link>
      <PageHeader title="বন্ধুরা" description="তোমার বন্ধুদের অগ্রগতি দেখো।" />
      <FriendsList />
    </div>
  )
}
