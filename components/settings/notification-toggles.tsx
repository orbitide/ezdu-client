"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"

const initialToggles = [
  { id: "daily-reminder", label: "দৈনিক অনুশীলন রিমাইন্ডার", description: "প্রতিদিন অনুশীলনের জন্য মনে করিয়ে দেওয়া হবে" },
  { id: "streak-alert", label: "স্ট্রিক সতর্কতা", description: "স্ট্রিক হারানোর আগে সতর্ক করা হবে" },
  { id: "leaderboard-update", label: "লিডারবোর্ড আপডেট", description: "তোমার র‍্যাংক পরিবর্তন হলে জানানো হবে" },
  { id: "new-content", label: "নতুন কন্টেন্ট", description: "নতুন মডেল টেস্ট এবং পাঠ প্রকাশিত হলে জানানো হবে" },
  { id: "achievement-unlock", label: "অ্যাচিভমেন্ট আনলক", description: "নতুন ব্যাজ বা পদক অর্জন করলে জানানো হবে" },
]

export function NotificationToggles() {
  const [toggles, setToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(initialToggles.map((t) => [t.id, true]))
  )

  return (
    <Card>
      <CardContent className="divide-y pt-6">
        {initialToggles.map((toggle) => (
          <div key={toggle.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div>
              <p className="text-sm font-medium">{toggle.label}</p>
              <p className="text-sm text-muted-foreground">{toggle.description}</p>
            </div>
            <Switch
              checked={toggles[toggle.id]}
              onCheckedChange={(checked) => setToggles((prev) => ({ ...prev, [toggle.id]: checked }))}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
