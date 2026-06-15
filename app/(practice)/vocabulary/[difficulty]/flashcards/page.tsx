import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { FlashcardDeck } from "@/components/vocabulary/flashcard-deck"
import { getWordsByDifficulty, vocabDifficultyLabels } from "@/lib/mock/vocabulary"
import type { VocabDifficulty } from "@/lib/types/vocabulary"

export default async function FlashcardsPage({ params }: { params: Promise<{ difficulty: string }> }) {
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
      <PageHeader title="ফ্ল্যাশকার্ড" description="শব্দ ও অর্থ দেখে মনে রাখো।" />
      <FlashcardDeck words={words} />
    </div>
  )
}
