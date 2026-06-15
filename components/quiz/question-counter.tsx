interface QuestionCounterProps {
  current: number
  total: number
}

export function QuestionCounter({ current, total }: QuestionCounterProps) {
  return (
    <span className="text-sm font-medium text-muted-foreground">
      প্রশ্ন {current} / {total}
    </span>
  )
}
