import Link from "next/link"
import { ChevronRight, BookMarked, MessageCircle, Plane, Award, type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { vocabDifficulties, getWordsByDifficulty } from "@/lib/mock/vocabulary"

const iconMap: Record<string, LucideIcon> = {
  MessageCircle,
  Plane,
  Award,
}

export function VocabHub() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {vocabDifficulties.map((difficulty) => {
          const count = getWordsByDifficulty(difficulty.id).length
          const Icon = iconMap[difficulty.icon]
          return (
            <Link key={difficulty.id} href={`/vocabulary/${difficulty.id}`} className="block">
              <Card className="border-b-4 border-[color-mix(in_oklch,var(--border),black_20%)] transition hover:bg-muted/50">
                <CardContent className="flex items-center gap-3 py-4">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{difficulty.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {difficulty.subtitle} · {count} টি শব্দ
                    </p>
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
      <Link href="/vocabulary/bank" className="block">
        <Card className="border-b-4 border-[color-mix(in_oklch,var(--primary),black_20%)] bg-primary/5 transition hover:bg-primary/10">
          <CardContent className="flex items-center gap-3 py-4">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
              <BookMarked className="size-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">শব্দ ভাণ্ডার</p>
              <p className="text-xs text-muted-foreground">সব শব্দ খুঁজো ও বুকমার্ক করো</p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground" />
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
