import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { VocabModeSelector } from "@/components/vocabulary/vocab-mode-selector"
import { vocabDifficultyLabels } from "@/lib/mock/vocabulary"
import type { VocabDifficulty } from "@/lib/types/vocabulary"

export default async function VocabDifficultyPage({ params }: { params: Promise<{ difficulty: string }> }) {
  const { difficulty } = await params

  if (!(difficulty in vocabDifficultyLabels)) {
    notFound()
  }

  const label = vocabDifficultyLabels[difficulty as VocabDifficulty]

  return (
    <div className="space-y-6">
      <Link href="/vocabulary" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        ভোকাবুলারি হাবে ফিরে যাও
      </Link>
      <PageHeader title={`${label} স্তর`} description="একটি অনুশীলন মোড বেছে নাও।" />
      <VocabModeSelector difficulty={difficulty} />
    </div>
  )
}
