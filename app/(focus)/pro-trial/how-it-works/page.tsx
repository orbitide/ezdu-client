"use client"

import Link from "next/link"
import { Unlock, Bell, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const TIMELINE = [
  {
    icon: Unlock,
    day: "আজ",
    title: "সব ফিচার আনলক",
    desc: "তুমি সাথে সাথে প্রো অ্যাক্সেস পাবে — কোনো সীমাবদ্ধতা নেই।",
    highlight: true,
  },
  {
    icon: Bell,
    day: "৫ম দিন",
    title: "রিমাইন্ডার পাবে",
    desc: "ট্রায়াল শেষ হওয়ার ২ দিন আগে আমরা তোমাকে জানাব।",
    highlight: false,
  },
  {
    icon: RefreshCw,
    day: "৭ম দিন",
    title: "সাবস্ক্রিপশন শুরু",
    desc: "যদি বাতিল না করো, তাহলে তোমার বেছে নেওয়া প্ল্যান চালু হবে। যেকোনো সময় বাতিল করা যাবে।",
    highlight: false,
  },
]

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between gap-8 px-6 py-12">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col gap-1 text-center">
          <h1 className="text-2xl font-bold">এভাবে কাজ করে</h1>
          <p className="text-sm text-muted-foreground">ট্রায়াল শেষ হওয়ার আগেই মনে করিয়ে দেব।</p>
        </div>

        <div className="flex flex-col gap-4">
          {TIMELINE.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                      item.highlight ? "bg-pro/15 text-pro" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-5" />
                  </div>
                  {i < TIMELINE.length - 1 && <div className="mt-1 w-px flex-1 bg-border" />}
                </div>
                <Card className={`mb-4 flex-1 ${item.highlight ? "border-pro/40 bg-pro/5" : ""}`}>
                  <CardContent className="py-3">
                    <p className="text-xs font-semibold text-muted-foreground">{item.day}</p>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex w-full max-w-md flex-col gap-3">
        <Button asChild variant="pro" size="lg" className="w-full">
          <Link href="/pro-trial/plans">শুরু করি</Link>
        </Button>
        <Button asChild variant="ghost" size="lg" className="w-full text-muted-foreground">
          <Link href="/dashboard">না থাক</Link>
        </Button>
      </div>
    </div>
  )
}
