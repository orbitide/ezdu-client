import { Progress } from "@/components/ui/progress"

interface LessonProgressBarProps {
  completed: number
  total: number
}

export function LessonProgressBar({ completed, total }: LessonProgressBarProps) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">কোর্স অগ্রগতি</span>
        <span className="text-muted-foreground">
          {completed} / {total} লেসন সম্পন্ন
        </span>
      </div>
      <Progress value={percent} />
    </div>
  )
}
