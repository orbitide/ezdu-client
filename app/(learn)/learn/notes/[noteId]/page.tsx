import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { NoteEditor } from "@/components/learn/note-editor"
import { getNoteById } from "@/lib/mock/notes"

export default async function NoteDetailPage({ params }: { params: Promise<{ noteId: string }> }) {
  const { noteId } = await params
  const note = getNoteById(noteId)

  if (!note) {
    notFound()
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href="/learn/notes" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        নোটসে ফিরে যাও
      </Link>
      <PageHeader title="নোট সম্পাদনা" description={note.subject} />
      <NoteEditor note={note} />
    </div>
  )
}
