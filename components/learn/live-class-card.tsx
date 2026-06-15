import Link from "next/link"
import { Video, Radio, PlayCircle, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { LiveClass } from "@/lib/types/live-class"

const statusConfig = {
  upcoming: { icon: Video, label: "আসন্ন", className: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
  live: { icon: Radio, label: "লাইভ চলছে", className: "bg-red-500/10 text-red-700 dark:text-red-400" },
  recorded: { icon: PlayCircle, label: "রেকর্ডকৃত", className: "bg-muted text-muted-foreground" },
}

interface LiveClassCardProps {
  liveClass: LiveClass
}

export function LiveClassCard({ liveClass }: LiveClassCardProps) {
  const config = statusConfig[liveClass.status]
  const Icon = config.icon

  return (
    <Link href={`/learn/live-classes/${liveClass.id}`}>
      <Card className="transition hover:border-primary/40">
        <CardContent className="flex items-center gap-3 py-4">
          <div className={`flex size-10 shrink-0 items-center justify-center rounded-full ${config.className}`}>
            <Icon className="size-5" />
          </div>
          <div className="flex-1 space-y-0.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className={`rounded-full px-2 py-0.5 ${config.className}`}>{config.label}</span>
              <span>{liveClass.subject}</span>
            </div>
            <p className="font-medium">{liveClass.title}</p>
            <p className="text-xs text-muted-foreground">
              {liveClass.date}, {liveClass.time} - {liveClass.instructor}
            </p>
          </div>
          <ChevronRight className="size-4 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  )
}
