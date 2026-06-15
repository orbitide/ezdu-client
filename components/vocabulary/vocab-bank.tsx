"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { VocabWordCard } from "@/components/vocabulary/vocab-word-card"
import { EmptyState } from "@/components/shared/empty-state"
import { vocabWords } from "@/lib/mock/vocabulary"

export function VocabBank() {
  const [query, setQuery] = useState("")

  const filtered = vocabWords.filter((word) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return word.word.toLowerCase().includes(q) || word.meaning.includes(q)
  })

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="শব্দ বা অর্থ খুঁজো..."
          className="pl-9"
        />
      </div>
      {filtered.length === 0 ? (
        <EmptyState title="কোনো শব্দ পাওয়া যায়নি" description="অন্য কিছু লিখে আবার চেষ্টা করো।" />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((word) => (
            <VocabWordCard key={word.id} word={word} />
          ))}
        </div>
      )}
    </div>
  )
}
