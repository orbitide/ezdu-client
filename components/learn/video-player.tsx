import { PlayCircle } from "lucide-react"

interface VideoPlayerProps {
  title: string
}

export function VideoPlayer({ title }: VideoPlayerProps) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center gap-2 rounded-xl bg-muted text-muted-foreground">
      <PlayCircle className="size-12" />
      <p className="text-sm">{title}</p>
    </div>
  )
}
