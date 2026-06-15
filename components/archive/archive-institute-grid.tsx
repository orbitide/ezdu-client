import Link from "next/link"
import { Building2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { archiveInstitutes, getArchiveExamsByInstitute } from "@/lib/mock/archive"

export function ArchiveInstituteGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {archiveInstitutes.map((institute) => {
        const examCount = getArchiveExamsByInstitute(institute.id).length

        return (
          <Link key={institute.id} href={`/archive/institute/${institute.id}`}>
            <Card className="transition hover:bg-muted/50">
              <CardContent className="flex flex-col items-center gap-2 py-5 text-center">
                <Building2 className="size-7 text-primary" />
                <p className="text-sm font-medium">{institute.name}</p>
                <p className="text-xs text-muted-foreground">{examCount} প্রশ্নপত্র</p>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
