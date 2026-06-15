"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Note } from "@/lib/types/note"

interface NoteEditorProps {
  note: Note
}

export function NoteEditor({ note }: NoteEditorProps) {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="note-title">শিরোনাম</Label>
          <Input id="note-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="note-content">নোট</Label>
          <Textarea id="note-content" value={content} onChange={(e) => setContent(e.target.value)} className="min-h-48" />
        </div>
        <p className="text-xs text-muted-foreground">সর্বশেষ সম্পাদনা: {note.updatedAt}</p>
      </CardContent>
    </Card>
  )
}
