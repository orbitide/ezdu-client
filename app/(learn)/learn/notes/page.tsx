import { PageHeader } from "@/components/shared/page-header"
import { NotesList } from "@/components/learn/notes-list"

export default function NotesPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="নোটস" description="তোমার সব নোট ও হাইলাইট এক জায়গায়।" />
      <NotesList />
    </div>
  )
}
