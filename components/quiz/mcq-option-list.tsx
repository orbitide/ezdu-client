"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface McqOptionListProps {
  options: string[]
  selectedIndex: number | null
  onSelect: (index: number) => void
  /** When set, show correct/incorrect highlighting (results review mode) */
  correctIndex?: number
}

export function McqOptionList({ options, selectedIndex, onSelect, correctIndex }: McqOptionListProps) {
  const reviewMode = correctIndex !== undefined

  return (
    <RadioGroup
      value={selectedIndex !== null ? String(selectedIndex) : undefined}
      onValueChange={(value) => {
        if (!reviewMode) onSelect(Number(value))
      }}
      className="gap-3"
    >
      {options.map((option, index) => {
        let extraClass = "border-border"
        if (reviewMode) {
          if (index === correctIndex) {
            extraClass = "border-green-500 bg-green-500/10"
          } else if (index === selectedIndex && index !== correctIndex) {
            extraClass = "border-destructive bg-destructive/10"
          }
        } else if (selectedIndex === index) {
          extraClass = "border-primary bg-primary/5"
        }

        return (
          <label
            key={index}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 text-sm transition-colors ${extraClass} ${
              reviewMode ? "cursor-default" : "hover:border-primary/50"
            }`}
          >
            <RadioGroupItem value={String(index)} disabled={reviewMode} />
            <span className="flex-1">{option}</span>
          </label>
        )
      })}
    </RadioGroup>
  )
}
