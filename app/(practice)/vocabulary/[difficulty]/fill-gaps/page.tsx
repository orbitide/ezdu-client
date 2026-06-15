import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { FillGapsGame } from "@/components/vocabulary/fill-gaps-game"
import { getWordsByDifficulty, vocabDifficultyLabels } from "@/lib/mock/vocabulary"
import type { VocabDifficulty } from "@/lib/types/vocabulary"

export default async function FillGapsPage({ params }: { params: Promise<{ difficulty: string }> }) {
  const { difficulty } = await params

  if (!(difficulty in vocabDifficultyLabels)) {
    notFound()
  }

  const words = getWordsByDifficulty(difficulty as VocabDifficulty)

  return (
    <div className="space-y-6">
      <Link
        href={`/vocabulary/${difficulty}`}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        মোড নির্বাচনে ফিরে যাও
      </Link>
      <PageHeader title="ফাঁকা পূরণ" description="বাক্যের ফাঁকা জায়গায় সঠিক শব্দ বসাও।" />
      <FillGapsGame words={words} difficulty={difficulty} />
    </div>
  )
}
