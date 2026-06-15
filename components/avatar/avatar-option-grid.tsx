"use client"

import { cn } from "@/lib/utils"
import type { AvatarConfig } from "@/lib/types/user"
import type { StudioCategory } from "@/lib/avatar/avatar-data"
import { formatChoiceLabel, swatchHex } from "@/lib/avatar/avatar-data"

interface AvatarOptionGridProps {
  category: StudioCategory
  config: AvatarConfig
  onChange: (key: keyof AvatarConfig, value: string) => void
}

export function AvatarOptionGrid({ category, config, onChange }: AvatarOptionGridProps) {
  const current = config[category.optionKey]

  if (category.colorKind) {
    return (
      <div className="flex flex-wrap gap-2">
        {category.values.map((value) => {
          const hex = swatchHex(category.colorKind!, value)
          const active = current === value
          return (
            <button
              key={value}
              type="button"
              title={formatChoiceLabel(value)}
              onClick={() => onChange(category.optionKey, value)}
              className={cn(
                "size-9 shrink-0 rounded-full ring-2 ring-offset-2 ring-offset-background transition",
                active ? "ring-primary" : "ring-transparent hover:ring-foreground/20"
              )}
              style={{ backgroundColor: hex }}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {category.values.map((value) => {
        const active = current === value
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(category.optionKey, value)}
            className={cn(
              "rounded-lg border px-3 py-2 text-left text-sm transition",
              active
                ? "border-primary bg-primary/10 text-primary"
                : "border-input hover:bg-muted"
            )}
          >
            {formatChoiceLabel(value)}
          </button>
        )
      })}
    </div>
  )
}
