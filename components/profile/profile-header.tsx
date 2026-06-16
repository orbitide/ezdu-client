"use client"

import Link from "next/link"
import { Pencil } from "lucide-react"
import { AvatarSvg } from "@/components/avatar/avatar-svg"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/lib/store/auth-store"
import { useProgressStore } from "@/lib/store/progress-store"

export function ProfileHeader() {
  const user = useAuthStore((s) => s.user)
  const { streakDays } = useProgressStore((s) => s)

  const joinedLabel = "জানু ২০২৫ থেকে"
  const username = user?.username ?? "user"

  return (
    <div className="space-y-4">
      {/* Avatar centered on a tinted band */}
      <div className="flex justify-center rounded-xl bg-primary/10 py-6">
        <Link href="/avatar" aria-label="অ্যাভাটার সম্পাদনা করো" className="group relative inline-block">
          <AvatarSvg config={user?.avatar} size={112} />
          <span className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-110">
            <Pencil className="size-4" />
          </span>
        </Link>
      </div>

      {/* Username + join date */}
      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
        @{username} — {joinedLabel}
      </p>

      {/* Following / Followers */}
      <div className="flex gap-8">
        <div>
          <p className="text-base font-bold">১৪২</p>
          <p className="text-sm text-muted-foreground">ফলো করছি</p>
        </div>
        <div>
          <p className="text-base font-bold">৮৯</p>
          <p className="text-sm text-muted-foreground">ফলোয়ার</p>
        </div>
      </div>

      {/* Add friend button */}
      <Button asChild variant="outline" className="w-full">
        <Link href="/profile/friends">বন্ধু অ্যাড করো</Link>
      </Button>
    </div>
  )
}
