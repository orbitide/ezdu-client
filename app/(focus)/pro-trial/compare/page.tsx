"use client"

import Link from "next/link"
import Image from "next/image"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const ROWS = [
  { label: "মডেল টেস্ট", free: "সীমিত", pro: true },
  { label: "বিজ্ঞাপন", free: "আছে", pro: false },
  { label: "ব্যক্তিগতকৃত প্র্যাকটিস", free: false, pro: true },
  { label: "পারফরম্যান্স অ্যানালিটিক্স", free: false, pro: true },
  { label: "অফলাইন অ্যাক্সেস", free: false, pro: true },
  { label: "এক্সক্লুসিভ অ্যাভাটার", free: false, pro: true },
  { label: "অগ্রাধিকার সাপোর্ট", free: false, pro: true },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="mx-auto size-5 text-primary" />
  if (value === false) return <X className="mx-auto size-5 text-muted-foreground/40" />
  return <span className="text-xs text-muted-foreground">{value}</span>
}

export default function ComparePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-8 px-6 py-12">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <Image src="/icons/pro_badge.svg" alt="" width={64} height={64} className="size-16" />
          <h1 className="text-2xl font-bold">প্রো ট্রায়াল শুরু করো</h1>
          <p className="text-sm text-muted-foreground">৭ দিন সম্পূর্ণ বিনামূল্যে। কোনো চার্জ নেই।</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-3 border-b border-border bg-muted/50 px-4 py-2 text-center text-xs font-semibold">
            <span className="text-left">ফিচার</span>
            <span>ফ্রি</span>
            <span className="text-pro">প্রো</span>
          </div>
          {ROWS.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-3 items-center border-b border-border/50 px-4 py-3 last:border-0 text-center"
            >
              <span className="text-left text-sm">{row.label}</span>
              <Cell value={row.free} />
              <Cell value={row.pro} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col gap-3">
        <Button asChild variant="pro" size="lg" className="w-full">
          <Link href="/pro-trial/how-it-works">৭ দিন ফ্রি শুরু করো</Link>
        </Button>
        <Button asChild variant="ghost" size="lg" className="w-full text-muted-foreground">
          <Link href="/dashboard">না থাক</Link>
        </Button>
      </div>
    </div>
  )
}
