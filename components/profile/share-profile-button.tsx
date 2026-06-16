"use client"

import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useAuthStore } from "@/lib/store/auth-store"
import { useProgressStore } from "@/lib/store/progress-store"

export function ShareProfileButton() {
  const user = useAuthStore((s) => s.user)
  const { xp, streakDays, rankTier } = useProgressStore((s) => s)

  function handleShare() {
    const text = `আমি Ezdu-তে পড়াশোনা করছি!\n👤 ${user?.name ?? "ব্যবহারকারী"}\n✨ XP: ${xp} | 🔥 স্ট্রিক: ${streakDays} দিন | 🏆 ${rankTier}\n\nতুমিও যোগ দাও!`

    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({ text }).catch(() => {})
    } else {
      navigator.clipboard.writeText(text).then(() => {
        toast.success("প্রোফাইল লিংক কপি হয়েছে!")
      })
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={handleShare} title="শেয়ার করো">
      <Share2 className="size-5" />
    </Button>
  )
}
