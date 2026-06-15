import Link from "next/link"
import { Video, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { liveClasses } from "@/lib/mock/live-classes"

export function UpcomingLiveClassCard() {
  const upcoming = liveClasses.find((lc) => lc.status === "upcoming")

  if (!upcoming) return null

  return (
    <Link href={`/learn/live-classes/${upcoming.id}`}>
      <Card className="transition hover:border-primary/40">
        <CardContent className="flex items-center gap-3 py-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-600">
            <Video className="size-5" />
          </div>
          <div className="flex-1 space-y-0.5">
            <p className="text-sm font-semibold">আসন্ন লাইভ ক্লাস</p>
            <p className="font-medium">{upcoming.title}</p>
            <p className="text-xs text-muted-foreground">
              {upcoming.date}, {upcoming.time} - {upcoming.instructor}
            </p>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  )
}
