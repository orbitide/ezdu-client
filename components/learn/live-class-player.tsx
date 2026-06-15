import { Radio, PlayCircle, Video } from "lucide-react"
import type { LiveClass } from "@/lib/types/live-class"

interface LiveClassPlayerProps {
  liveClass: LiveClass
}

export function LiveClassPlayer({ liveClass }: LiveClassPlayerProps) {
  const Icon = liveClass.status === "recorded" ? PlayCircle : liveClass.status === "live" ? Radio : Video

  return (
    <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl bg-muted text-muted-foreground">
      <Icon className="size-12" />
      <p className="text-sm">
        {liveClass.status === "upcoming" && "ক্লাসটি শুরু হলে এখানে জয়েন করতে পারবে"}
        {liveClass.status === "live" && "লাইভ ক্লাস চলছে"}
        {liveClass.status === "recorded" && "রেকর্ডকৃত ক্লাস"}
      </p>
    </div>
  )
}
