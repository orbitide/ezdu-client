import Link from "next/link"
import { Archive, Swords, BrainCircuit, ClipboardList, Trophy, BookOpen, type LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { homeGridItems } from "@/lib/mock/home"

const iconMap: Record<string, LucideIcon> = {
  Archive,
  Swords,
  BrainCircuit,
  ClipboardList,
  Trophy,
  BookOpen,
}

export function HomeGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {homeGridItems.map((item) => {
        const Icon = iconMap[item.icon]
        return (
          <Link key={item.id} href={item.href}>
            <Card className="transition hover:bg-muted/50">
              <CardContent className="flex flex-col items-center gap-2 py-4 text-center">
                <Icon className="size-7 text-primary" />
                <p className="text-xs font-medium">{item.label}</p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
