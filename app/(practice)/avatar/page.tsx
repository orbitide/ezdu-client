"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageHeader } from "@/components/shared/page-header"
import { AvatarBuilder } from "@/components/avatar/avatar-builder"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"
import { useAuthStore } from "@/lib/store/auth-store"
import { useAvatarStore } from "@/lib/store/avatar-store"
import type { AvatarConfig } from "@/lib/types/user"

export default function AvatarPage() {
  const router = useRouter()
  const user = useAuthStore((s) => s.user)
  const updateAvatar = useAuthStore((s) => s.updateAvatar)
  const setOption = useAvatarStore((s) => s.setOption)

  // Seed the builder with the user's current avatar when they arrive
  useEffect(() => {
    if (!user?.avatar) return
    const cfg = user.avatar
    ;(Object.keys(cfg) as (keyof AvatarConfig)[]).forEach((key) => {
      setOption(key, cfg[key])
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSave(config: AvatarConfig) {
    updateAvatar(config)
    router.push("/profile")
  }

  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <PageHeader
        title="অ্যাভাটার তৈরি করো"
        description="তোমার পছন্দ মতো চুল, পোশাক ও রং বেছে নিয়ে অ্যাভাটার সাজাও।"
      />
      <AvatarBuilder onSave={handleSave} saveLabel="সংরক্ষণ করো" />
    </TwoColumnShell>
  )
}
