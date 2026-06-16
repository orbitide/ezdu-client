"use client"

import { Sparkles } from "lucide-react"
import { useProgressStore } from "@/lib/store/progress-store"

const highlights = [
  "তোমার সঠিকতা গত সপ্তাহে ৫% বেড়েছে — চালিয়ে যাও!",
  "রসায়নে আরো মনোযোগ দাও — এটি তোমার দুর্বল বিষয়।",
  "তুমি এই সপ্তাহে ১১১টি প্রশ্নের উত্তর দিয়েছ — অসাধারণ!",
]

function InsightCard({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border p-4">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
        <Sparkles className="size-4 text-primary" />
      </div>
      <p className="mt-1 text-sm font-semibold leading-snug">{text}</p>
    </div>
  )
}

export function ProfileInsightsSection() {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold">ইনসাইটস</h2>
      {highlights.map((h, i) => (
        <InsightCard key={i} text={h} />
      ))}
    </div>
  )
}
