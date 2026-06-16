"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Minus, Unlock, Bell, RefreshCw, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { premiumPlans } from "@/lib/mock/shop"
import type { PremiumPlan } from "@/lib/types/shop"

// ── Step 1: Compare ────────────────────────────────────────────────────────────

const COMPARE_ROWS = [
  { label: "মডেল টেস্ট", free: "সীমিত", pro: true },
  { label: "বিজ্ঞাপন", free: "আছে", pro: false },
  { label: "ব্যক্তিগতকৃত প্র্যাকটিস", free: false, pro: true },
  { label: "পারফরম্যান্স অ্যানালিটিক্স", free: false, pro: true },
  { label: "অফলাইন অ্যাক্সেস", free: false, pro: true },
  { label: "এক্সক্লুসিভ অ্যাভাটার", free: false, pro: true },
]

function CompareCell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="mx-auto size-5 text-primary" />
  if (value === false) return <Minus className="mx-auto size-5 text-muted-foreground/40" />
  return <span className="text-sm text-muted-foreground">{value}</span>
}

function StepCompare({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-12">
      <h2 className="text-4xl font-bold">প্রো দিয়ে আরও দ্রুত এগিয়ে যাও!</h2>

      <table className="overflow-hidden rounded-2xl border border-border bg-muted/40 text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-5 pl-8 pr-16 text-left text-base font-semibold text-muted-foreground">ফিচার</th>
            <th className="px-12 py-5 text-base font-semibold text-muted-foreground">ফ্রি</th>
            <th className="px-12 py-5 text-base font-semibold text-pro">প্রো</th>
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((row) => (
            <tr key={row.label} className="border-b border-border/40 last:border-0">
              <td className="py-5 pl-8 pr-16">{row.label}</td>
              <td className="px-12 py-5 text-center"><CompareCell value={row.free as boolean | string} /></td>
              <td className="px-12 py-5 text-center"><CompareCell value={row.pro} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col items-center gap-3">
        <Button variant="pro" size="lg" onClick={onNext}>
          ৭ দিন ফ্রি শুরু করো
        </Button>
        <DialogClose render={<Button variant="ghost" size="lg" className="text-muted-foreground" />}>
          না থাক
        </DialogClose>
      </div>
    </div>
  )
}

// ── Step 2: How it works ───────────────────────────────────────────────────────

const TIMELINE = [
  {
    Icon: Unlock,
    day: "আজ",
    title: "সব ফিচার আনলক",
    desc: "তুমি সাথে সাথে প্রো অ্যাক্সেস পাবে — কোনো সীমাবদ্ধতা নেই।",
    highlight: true,
  },
  {
    Icon: Bell,
    day: "৫ম দিন",
    title: "রিমাইন্ডার পাবে",
    desc: "ট্রায়াল শেষ হওয়ার ২ দিন আগে আমরা তোমাকে জানাব।",
    highlight: false,
  },
  {
    Icon: RefreshCw,
    day: "৭ম দিন",
    title: "সাবস্ক্রিপশন শুরু",
    desc: "যদি বাতিল না করো, তাহলে তোমার বেছে নেওয়া প্ল্যান চালু হবে। যেকোনো সময় বাতিল করা যাবে।",
    highlight: false,
  },
]

function StepHowItWorks({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-12">
      <h2 className="text-4xl font-bold">ট্রায়াল শেষের ২ দিন আগেই মনে করিয়ে দেব</h2>

      <div className="w-full max-w-sm">
        {TIMELINE.map(({ Icon, day, title, desc, highlight }, i) => (
          <div key={i} className="flex gap-5">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-full",
                  highlight ? "bg-pro/15 text-pro" : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="size-6" />
              </div>
              {i < TIMELINE.length - 1 && <div className="my-2 w-0.5 flex-1 bg-border" />}
            </div>
            <div className={cn("flex flex-col gap-1 pb-8", i === TIMELINE.length - 1 && "pb-0")}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{day}</p>
              <p className="text-base font-semibold">{title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button variant="pro" size="lg" onClick={onNext}>
          শুরু করি
        </Button>
        <DialogClose render={<Button variant="ghost" size="lg" className="text-muted-foreground" />}>
          না থাক
        </DialogClose>
      </div>
    </div>
  )
}

// ── Step 3: Plans ──────────────────────────────────────────────────────────────

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
        "rounded-2xl border p-5 text-left transition-all",
        selected ? "border-pro bg-pro/5 ring-1 ring-pro" : "border-border hover:border-pro/40"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold">{plan.title}</span>
            {plan.badge && (
              <Badge variant="secondary" className="text-xs">
                {plan.badge}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{plan.price}৳</span> / {plan.period}
          </p>
        </div>
        <div
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            selected ? "border-pro bg-pro" : "border-muted-foreground/30"
          )}
        >
          {selected && <Check className="size-3.5 text-white" />}
        </div>
      </div>
    </button>
  )
}

function StepPlans() {
  const [selectedId, setSelectedId] = useState("plan-12m")
  const [showAll, setShowAll] = useState(false)

  const visible = showAll ? premiumPlans : premiumPlans.filter((p) => DEFAULT_PLAN_IDS.includes(p.id))
  const selectedPlan = premiumPlans.find((p) => p.id === selectedId)

  return (
    <div className="flex flex-1 flex-col items-center gap-12">
      <h2 className="text-4xl font-bold">একটি প্ল্যান বেছে নাও</h2>

      <div className="flex w-full max-w-md flex-col gap-4">
        {visible.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            selected={selectedId === plan.id}
            onSelect={() => setSelectedId(plan.id)}
          />
        ))}

      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="text-xs text-muted-foreground">
          ৭ দিন ফ্রি, তারপর চার্জ হবে। যেকোনো সময় বাতিল করা যাবে।
        </p>
        <DialogClose render={<Button variant="pro" size="lg" />}>
          {selectedPlan ? `শুরু করি — ${selectedPlan.price}৳ / ${selectedPlan.period}` : "শুরু করি"}
        </DialogClose>
        {!showAll && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => setShowAll(true)}
          >
            সব প্ল্যান দেখো
          </Button>
        )}
      </div>
    </div>
  )
}

// ── Root modal ─────────────────────────────────────────────────────────────────

export function ProTrialModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setStep(0) }}>
      <span className="contents" onClick={() => setOpen(true)}>{children}</span>
      <DialogContent
        showCloseButton={false}
        className="!fixed !inset-0 !top-0 !left-0 !translate-x-0 !translate-y-0 flex !h-screen !w-screen !max-w-none flex-col !rounded-none p-0 bg-background bg-[radial-gradient(ellipse_80%_50%_at_-10%_-10%,color-mix(in_oklch,var(--color-pro)_30%,transparent),transparent),radial-gradient(ellipse_70%_50%_at_110%_110%,color-mix(in_oklch,var(--color-primary)_25%,transparent),transparent)]"
      >
        <DialogTitle className="sr-only">প্রো ট্রায়াল</DialogTitle>

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5">
          <DialogClose render={<Button variant="ghost" size="icon-sm" />}>
            <X className="size-4" />
            <span className="sr-only">বন্ধ করো</span>
          </DialogClose>
          <div className="flex items-center gap-4">
            <Image src="/icons/pro_badge.svg" alt="" width={48} height={48} className="size-12" />
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === step ? "w-10 bg-pro" : i < step ? "w-6 bg-pro/40" : "w-6 bg-muted"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-12 py-8">
          {step === 0 && <StepCompare onNext={() => setStep(1)} />}
          {step === 1 && <StepHowItWorks onNext={() => setStep(2)} />}
          {step === 2 && <StepPlans />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
