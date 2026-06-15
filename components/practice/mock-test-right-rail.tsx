"use client"

import { StatsBar } from "@/components/home/stats-bar"
import { TodaysPlanCard } from "@/components/home/todays-plan-card"
import { GoProCard } from "@/components/shop/go-pro-card"
import { useProgressStore } from "@/lib/store/progress-store"

export function MockTestRightRail() {
  const isPremium = useProgressStore((s) => s.isPremium)

  return (
    <>
      <StatsBar />
      <TodaysPlanCard />
      {!isPremium && <GoProCard />}
    </>
  )
}
