"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { premiumPlans } from "@/lib/mock/shop"
import type { PremiumPlan } from "@/lib/types/shop"

const DEFAULT_PLAN_IDS = ["plan-3m", "plan-12m"]

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: PremiumPlan
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full rounded-xl border p-4 text-left transition-all",
        selected
          ? "border-pro bg-pro/5 ring-1 ring-pro"
          : "border-border hover:border-pro/40"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{plan.title}</span>
            {plan.badge && (
              <Badge variant="secondary" className="text-xs">
                {plan.badge}
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            ৭ দিন ফ্রি ট্রায়াল, তারপর{" "}
            <span className="font-semibold text-foreground">{plan.price}৳</span> / {plan.period}
          </p>
        </div>
        <div
          className={cn(
            "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            selected ? "border-pro bg-pro" : "border-muted-foreground/30"
          )}
        >
          {selected && <Check className="size-3 text-white" />}
        </div>
      </div>
    </button>
  )
}

export default function PlansPage() {
  const [selectedId, setSelectedId] = useState("plan-12m")
  const [showAll, setShowAll] = useState(false)

  const visiblePlans = showAll
    ? premiumPlans
    : premiumPlans.filter((p) => DEFAULT_PLAN_IDS.includes(p.id))

  const selectedPlan = premiumPlans.find((p) => p.id === selectedId)

  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-8 px-6 py-12">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold">একটি প্ল্যান বেছে নাও</h1>
          <p className="text-sm text-muted-foreground">
            ৭ দিন বিনামূল্যে — তারপর যেকোনো সময় বাতিল করা যাবে।
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {visiblePlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              selected={selectedId === plan.id}
              onSelect={() => setSelectedId(plan.id)}
            />
          ))}
        </div>

        {!showAll && (
          <Button
            variant="ghost"
            size="sm"
            className="mx-auto text-muted-foreground"
            onClick={() => setShowAll(true)}
          >
            সব প্ল্যান দেখো
          </Button>
        )}
      </div>

      <div className="flex w-full max-w-md flex-col gap-3">
        <Button variant="pro" size="lg" className="w-full">
          {selectedPlan
            ? `শুরু করি — ${selectedPlan.price}৳ / ${selectedPlan.period}`
            : "শুরু করি"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          ৭ দিন ফ্রি, তারপর চার্জ হবে। যেকোনো সময় বাতিল করা যাবে।
        </p>
      </div>
    </div>
  )
}
