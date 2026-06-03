"use client"

import { badges } from "@/lib/mock/data"
import { Card, CardContent } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BadgesPage() {
  const earned = badges.filter(b => !b.locked)
  const locked = badges.filter(b => b.locked)

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Badges</h1>
        <p className="text-muted-foreground text-sm mt-1">{earned.length}/{badges.length} ব্যাজ অর্জিত</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-4">অর্জিত ব্যাজ ({earned.length})</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {earned.map(badge => (
            <Card key={badge.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={cn("h-14 w-14 rounded-xl flex items-center justify-center text-2xl shrink-0", badge.color)}>{badge.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{badge.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{badge.description}</p>
                  {badge.earnedAt && <p className="text-xs text-muted-foreground mt-1">{new Date(badge.earnedAt).toLocaleDateString("bn-BD")}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">লক করা ব্যাজ ({locked.length})</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {locked.map(badge => (
            <Card key={badge.id} className="opacity-60">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl flex items-center justify-center bg-muted shrink-0 relative">
                  <span className="text-2xl grayscale">{badge.icon}</span>
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-background/60">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{badge.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{badge.criteria}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
