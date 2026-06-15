import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getCurrentAffairsArticleById } from "@/lib/mock/current-affairs"
import { TwoColumnShell } from "@/components/layout/two-column-shell"
import { DefaultRightRail } from "@/components/layout/default-right-rail"

export default async function CurrentAffairsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = getCurrentAffairsArticleById(id)

  if (!article) {
    notFound()
  }

  return (
    <TwoColumnShell right={<DefaultRightRail />}>
      <div className="space-y-6">
        <Link href="/current-affairs" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          কারেন্ট অ্যাফেয়ার্সে ফিরে যাও
        </Link>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{article.category}</span>
            <span className="text-xs text-muted-foreground">{article.date}</span>
          </div>
          <h1 className="text-2xl font-bold">{article.title}</h1>
          <p className="leading-relaxed text-muted-foreground">{article.content}</p>
          <p className="text-xs text-muted-foreground">সূত্র: {article.source}</p>
        </div>
      </div>
    </TwoColumnShell>
  )
}
