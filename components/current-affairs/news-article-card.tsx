import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { CurrentAffairsArticle } from "@/lib/types/current-affairs"

interface NewsArticleCardProps {
  article: CurrentAffairsArticle
}

export function NewsArticleCard({ article }: NewsArticleCardProps) {
  return (
    <Link href={`/current-affairs/${article.id}`}>
      <Card className="transition hover:border-primary/40">
        <CardContent className="space-y-1.5 py-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{article.category}</span>
            <span className="text-xs text-muted-foreground">{article.date}</span>
          </div>
          <p className="font-medium">{article.title}</p>
          <p className="text-sm text-muted-foreground">{article.summary}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
