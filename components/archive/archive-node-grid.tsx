import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { getArchiveNodeChildren } from "@/lib/mock/archive"
import type { ArchiveNode } from "@/lib/types/archive"

interface ArchiveNodeGridProps {
  subjectId: string
  nodes: ArchiveNode[]
}

export function ArchiveNodeGrid({ subjectId, nodes }: ArchiveNodeGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {nodes.map((node) => {
        const isLeaf = getArchiveNodeChildren(subjectId, node.id).length === 0
        const examIds = node.examIds ?? []
        const href =
          isLeaf && examIds.length === 1
            ? `/quiz/${examIds[0]}`
            : `/archive/${subjectId}?node=${node.id}`

        return (
          <Link key={node.id} href={href}>
            <Card className="transition hover:bg-muted/50">
              <CardContent className="flex flex-col items-center gap-2 py-5 text-center">
                <p className="text-sm font-medium">{node.name}</p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
