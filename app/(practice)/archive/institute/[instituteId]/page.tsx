import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { ArchiveExamList } from "@/components/archive/archive-exam-list"
import { ArchiveRightRail } from "@/components/archive/archive-right-rail"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import {
  archiveInstitutes,
  getArchiveExamsByInstitute,
  getArchiveExamsByInstituteUnit,
  getArchiveInstituteUnits,
} from "@/lib/mock/archive"

export default async function ArchiveInstitutePage({
  params,
  searchParams,
}: {
  params: Promise<{ instituteId: string }>
  searchParams: Promise<{ unit?: string }>
}) {
  const { instituteId } = await params
  const { unit: unitId } = await searchParams
  const institute = archiveInstitutes.find((i) => i.id === instituteId)

  if (!institute) {
    notFound()
  }

  const units = getArchiveInstituteUnits(institute.id)
  const selectedUnit = unitId ? units.find((u) => u.id === unitId) : undefined

  const backHref = selectedUnit ? `/archive/institute/${institute.id}` : "/archive"
  const backLabel = selectedUnit ? "ইউনিট নির্বাচনে ফিরে যাও" : "প্রতিষ্ঠান নির্বাচনে ফিরে যাও"
  const title = selectedUnit ? selectedUnit.name : institute.name

  let content
  if (units.length > 0 && !selectedUnit) {
    content = (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {units.map((unit) => (
          <Link key={unit.id} href={`/archive/institute/${institute.id}?unit=${unit.id}`}>
            <Card className="transition hover:bg-muted/50">
              <CardContent className="flex flex-col items-center gap-2 py-5 text-center">
                <p className="text-sm font-medium">{unit.name}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    )
  } else if (selectedUnit) {
    content = <ArchiveExamList exams={getArchiveExamsByInstituteUnit(selectedUnit.id)} />
  } else {
    content = <ArchiveExamList exams={getArchiveExamsByInstitute(institute.id)} />
  }

  return (
    <TwoColumnShell right={<ArchiveRightRail />}>
      <div className="space-y-4">
        <Link href={backHref} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          {backLabel}
        </Link>
        <h2 className="text-lg font-semibold">{title}</h2>
        {content}
      </div>
    </TwoColumnShell>
  )
}
