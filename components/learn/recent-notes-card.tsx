import Link from "next/link"
import { FileText, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { notes } from "@/lib/mock/notes"

export function RecentNotesCard() {
  const recent = notes.slice(0, 3)

  return (
    <Card>
      <CardContent className="space-y-3 pt-6">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <FileText className="size-4" />
          সাম্প্রতিক নোট
        </p>
        <div className="space-y-1">
          {recent.map((note) => (
            <Link
              key={note.id}
              href={`/learn/notes/${note.id}`}
              className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-muted"
            >
              <div className="flex-1">
                <p className="text-sm font-medium">{note.title}</p>
                <p className="text-xs text-muted-foreground">{note.subject} - {note.updatedAt}</p>
              </div>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
