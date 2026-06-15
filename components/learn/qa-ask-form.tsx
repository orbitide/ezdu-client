"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface QaAskFormProps {
  lessonId?: string
}

export function QaAskForm({ lessonId }: QaAskFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/learn/qa")
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="qa-title">প্রশ্নের শিরোনাম</Label>
            <Input id="qa-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="তোমার প্রশ্নটি সংক্ষেপে লেখো" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="qa-body">বিস্তারিত</Label>
            <Textarea id="qa-body" value={body} onChange={(e) => setBody(e.target.value)} className="min-h-32" placeholder="তোমার প্রশ্নটি বিস্তারিতভাবে লেখো..." />
          </div>
          {lessonId && <p className="text-xs text-muted-foreground">এই প্রশ্নটি লেসন #{lessonId} থেকে যুক্ত করা হচ্ছে।</p>}
          <Button type="submit">প্রশ্ন পোস্ট করো</Button>
        </form>
      </CardContent>
    </Card>
  )
}
