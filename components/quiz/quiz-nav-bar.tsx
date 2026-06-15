"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuizNavBarProps {
  canGoPrev: boolean
  isLast: boolean
  onPrev: () => void
  onNext: () => void
  onSubmit: () => void
}

export function QuizNavBar({ canGoPrev, isLast, onPrev, onNext, onSubmit }: QuizNavBarProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <Button type="button" variant="outline" onClick={onPrev} disabled={!canGoPrev} className="gap-1.5">
        <ChevronLeft className="size-4" />
        আগের প্রশ্ন
      </Button>
      {isLast ? (
        <Button type="button" onClick={onSubmit}>
          জমা দাও
        </Button>
      ) : (
        <Button type="button" onClick={onNext} className="gap-1.5">
          পরের প্রশ্ন
          <ChevronRight className="size-4" />
        </Button>
      )}
    </div>
  )
}
