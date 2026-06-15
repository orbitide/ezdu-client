"use client"

import { Flag } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookmarkFlagControlsProps {
  flagged: boolean
  onToggle: () => void
}

export function BookmarkFlagControls({ flagged, onToggle }: BookmarkFlagControlsProps) {
  return (
    <Button
      type="button"
      variant={flagged ? "default" : "outline"}
      size="sm"
      onClick={onToggle}
      className="gap-1.5"
    >
      <Flag className="size-4" />
      {flagged ? "চিহ্নিত করা হয়েছে" : "প্রশ্নটি চিহ্নিত করো"}
    </Button>
  )
}
