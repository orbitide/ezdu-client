"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { LEAGUE_TIERS, LEAGUE_NAMES, RANK_LEAGUE_ORDER, leagueIconUrlByOrder } from "@/lib/utils/rank"
import type { RankTier } from "@/lib/types/user"

export function LeagueStrip({ currentTier }: { currentTier: RankTier }) {
  const currentOrder = RANK_LEAGUE_ORDER[currentTier]
  const [selectedOrder, setSelectedOrder] = useState(currentOrder)
  const selectedRef = useRef<HTMLButtonElement>(null)
  const didInitialScroll = useRef(false)

  useEffect(() => {
    if (didInitialScroll.current) return
    didInitialScroll.current = true
    selectedRef.current?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
  }, [])

  return (
    <Card>
      <CardContent className="overflow-x-auto py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-4 px-2 pt-2">
          {LEAGUE_TIERS.map((tier) => {
            const order = RANK_LEAGUE_ORDER[tier]
            const isSelected = order === selectedOrder
            const isCurrent = order === currentOrder
            const isLocked = order > currentOrder

            return (
              <button
                key={tier}
                ref={isSelected ? selectedRef : undefined}
                type="button"
                disabled={isLocked}
                onClick={(e) => {
                  setSelectedOrder(order)
                  e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" })
                }}
                className={cn(
                  "flex w-20 shrink-0 flex-col items-center gap-1.5 transition-opacity",
                  isLocked
                    ? "cursor-not-allowed opacity-20"
                    : isSelected || isCurrent
                      ? "opacity-100"
                      : "opacity-40"
                )}
              >
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <Image
                    src={leagueIconUrlByOrder(order)}
                    alt={LEAGUE_NAMES[order]}
                    width={64}
                    height={72}
                    className={cn(
                      "transition-transform",
                      isSelected ? "scale-100" : isCurrent ? "scale-95" : "scale-75"
                    )}
                  />
                  {isSelected && (
                    <span className="absolute -bottom-1 h-2.5 w-11 rounded-full bg-black/30 blur-[2px]" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-center text-xs",
                    isSelected ? "font-bold text-primary" : "text-muted-foreground"
                  )}
                >
                  {LEAGUE_NAMES[order]}
                </span>
              </button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
