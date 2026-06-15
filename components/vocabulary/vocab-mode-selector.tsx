import Link from "next/link"
import { Layers, Shuffle, PenLine, ArrowLeftRight, type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { vocabModes } from "@/lib/mock/vocabulary"

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Shuffle,
  PenLine,
  ArrowLeftRight,
}

interface VocabModeSelectorProps {
  difficulty: string
}

export function VocabModeSelector({ difficulty }: VocabModeSelectorProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {vocabModes.map((mode) => {
        const Icon = iconMap[mode.icon]
        return (
          <Link key={mode.id} href={`/vocabulary/${difficulty}/${mode.id}`}>
            <Card className="transition hover:bg-muted/50">
              <CardContent className="flex items-center gap-3 py-5">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{mode.title}</p>
                  <p className="text-xs text-muted-foreground">{mode.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
