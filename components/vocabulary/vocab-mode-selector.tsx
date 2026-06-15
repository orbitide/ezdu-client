import Link from "next/link"
import { ChevronRight, Layers, Shuffle, PenLine, ArrowLeftRight, type LucideIcon } from "lucide-react"
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
    <div className="space-y-3">
      {vocabModes.map((mode) => {
        const Icon = iconMap[mode.icon]
        return (
          <Link key={mode.id} href={`/vocabulary/${difficulty}/${mode.id}`}>
            <Card className="transition hover:bg-muted/50">
              <CardContent className="flex items-center gap-3 py-5">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="size-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{mode.title}</p>
                  <p className="text-xs font-medium text-primary">{mode.subtitle}</p>
                  <p className="text-xs text-muted-foreground">{mode.description}</p>
                </div>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
