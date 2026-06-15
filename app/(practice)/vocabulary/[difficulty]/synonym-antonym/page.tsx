import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { SynonymAntonymGame } from "@/components/vocabulary/synonym-antonym-game"
import { getWordsByDifficulty, vocabDifficultyLabels } from "@/lib/mock/vocabulary"
import type { VocabDifficulty } from "@/lib/types/vocabulary"

export default async function SynonymAntonymPage({ params }: { params: Promise<{ difficulty: string }> }) {
  const { difficulty } = await params

  if (!(difficulty in vocabDifficultyLabels)) {
    notFound()
  }

  const words = getWordsByDifficulty(difficulty as VocabDifficulty)

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link
        href={`/vocabulary/${difficulty}`}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        মোড নির্বাচনে ফিরে যাও
      </Link>
      <PageHeader title="সমার্থক ও বিপরীত শব্দ" description="সমার্থক ও বিপরীত শব্দ চেনার অনুশীলন করো।" />
      <SynonymAntonymGame words={words} />
    </div>
  )
}
