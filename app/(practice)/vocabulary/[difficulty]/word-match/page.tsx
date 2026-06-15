import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { WordMatchGame } from "@/components/vocabulary/word-match-game"
import { getWordsByDifficulty, vocabDifficultyLabels } from "@/lib/mock/vocabulary"
import type { VocabDifficulty } from "@/lib/types/vocabulary"

export default async function WordMatchPage({ params }: { params: Promise<{ difficulty: string }> }) {
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
      <PageHeader title="শব্দ মেলানো" description="শব্দের সাথে সঠিক অর্থ মেলাও।" />
      <WordMatchGame words={words} difficulty={difficulty} />
    </div>
  )
}
