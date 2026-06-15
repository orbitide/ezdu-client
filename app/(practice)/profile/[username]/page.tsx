import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PublicProfileView } from "@/components/profile/public-profile-view"
import { getUserByUsername } from "@/lib/mock/leaderboard"

export default async function PublicProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const user = getUserByUsername(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href="/leaderboard" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        লিডারবোর্ডে ফিরে যাও
      </Link>
      <PublicProfileView user={user} />
    </div>
  )
}
