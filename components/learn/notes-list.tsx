"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/shared/empty-state"
import { FileText } from "lucide-react"
import { notes } from "@/lib/mock/notes"

export function NotesList() {
  const [query, setQuery] = useState("")

  const filtered = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.subject.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="বিষয় বা শিরোনাম দিয়ে খুঁজো..."
          className="pl-9"
        />
      </div>
      {filtered.length === 0 ? (
        <EmptyState icon={FileText} title="কোনো নোট পাওয়া যায়নি" description="অন্য কিছু দিয়ে খুঁজে দেখো।" />
      ) : (
        <div className="space-y-3">
          {filtered.map((note) => (
            <Link key={note.id} href={`/learn/notes/${note.id}`}>
              <Card className="transition hover:border-primary/40">
                <CardContent className="flex items-center gap-3 py-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-muted px-2 py-0.5">{note.subject}</span>
                      <span>{note.updatedAt}</span>
                    </div>
                    <p className="font-medium">{note.title}</p>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{note.content}</p>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
