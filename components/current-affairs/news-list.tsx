import { NewsArticleCard } from "@/components/current-affairs/news-article-card"
import { currentAffairsArticles } from "@/lib/mock/current-affairs"

export function NewsList() {
  return (
    <div className="space-y-3">
      {currentAffairsArticles.map((article) => (
        <NewsArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}
