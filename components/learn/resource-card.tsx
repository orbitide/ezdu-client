import Link from "next/link"
import { FileText, BookMarked, Calculator, ScrollText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Resource, ResourceType } from "@/lib/types/resource"

const iconByType: Record<ResourceType, typeof FileText> = {
  pdf: FileText,
  "cheat-sheet": BookMarked,
  "formula-sheet": Calculator,
  "past-paper": ScrollText,
}

const labelByType: Record<ResourceType, string> = {
  pdf: "পিডিএফ",
  "cheat-sheet": "চিট শীট",
  "formula-sheet": "সূত্র শীট",
  "past-paper": "প্রশ্নব্যাংক",
}

interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = iconByType[resource.type]

  return (
    <Link href={`/learn/resources/${resource.id}`}>
      <Card className="transition hover:border-primary/40">
        <CardContent className="flex items-start gap-3 py-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="size-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-muted px-2 py-0.5">{labelByType[resource.type]}</span>
              <span>{resource.subject}</span>
            </div>
            <p className="font-medium">{resource.title}</p>
            <p className="text-sm text-muted-foreground">{resource.description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
