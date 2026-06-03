"use client"

import { useState } from "react"
import { discussions } from "@/lib/mock/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ThumbsUp, MessageCircle, Pin, Lock, CheckCircle2, Search, PlusCircle, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "@/lib/time"

const subjects = ["সব", "পদার্থবিজ্ঞান", "রসায়নবিজ্ঞান", "গণিত", "জীববিজ্ঞান", "ইংরেজি"]

export default function DiscussionsPage() {
  const [activeSubject, setActiveSubject] = useState("সব")
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<typeof discussions[0] | null>(null)
  const [newOpen, setNewOpen] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newBody, setNewBody] = useState("")
  const [replyText, setReplyText] = useState("")
  const [upvoted, setUpvoted] = useState<Record<string, boolean>>({})

  const filtered = discussions.filter(d => {
    const matchSubject = activeSubject === "সব" || d.subject === activeSubject
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase())
    return matchSubject && matchSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Discussions</h1>
          <p className="text-muted-foreground text-sm mt-1">প্রশ্ন করুন, উত্তর দিন, একসাথে শিখুন</p>
        </div>
        <Button onClick={() => setNewOpen(true)} className="gap-2">
          <PlusCircle className="h-4 w-4" /> নতুন প্রশ্ন
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="প্রশ্ন খুঁজুন..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <div className="flex flex-wrap gap-2">
          {subjects.map(s => (
            <Button key={s} size="sm" variant={activeSubject === s ? "default" : "outline"} onClick={() => setActiveSubject(s)} className="h-8 text-xs">{s}</Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(thread => (
          <Card key={thread.id} className={cn("hover:shadow-md transition-shadow cursor-pointer", thread.pinned && "border-primary/40")} onClick={() => setSelected(thread)}>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={thread.author.avatar} />
                  <AvatarFallback>{thread.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                    {thread.pinned && <Pin className="h-3 w-3 text-primary" />}
                    {thread.locked && <Lock className="h-3 w-3 text-muted-foreground" />}
                    {thread.resolved && <Badge variant="outline" className="text-[10px] h-4 px-1 text-green-600 border-green-300">Resolved</Badge>}
                    <Badge variant="secondary" className="text-[10px] h-4 px-1">{thread.subject}</Badge>
                  </div>
                  <p className="font-medium text-sm leading-snug line-clamp-2">{thread.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{thread.body}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground pl-11">
                <span>{thread.author.name}</span>
                <span>·</span>
                <span>{formatDistanceToNow(thread.createdAt)}</span>
                <span className="flex items-center gap-1 ml-auto"><ThumbsUp className="h-3 w-3" />{thread.upvotes}</span>
                <span className="flex items-center gap-1"><MessageCircle className="h-3 w-3" />{thread.replyCount}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <div className="text-center py-16 text-muted-foreground">কোনো আলোচনা পাওয়া যায়নি।</div>}
      </div>

      {/* Thread dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        {selected && (
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex flex-wrap gap-1.5 mb-2">
                <Badge variant="secondary" className="text-xs">{selected.subject}</Badge>
                {selected.resolved && <Badge variant="outline" className="text-xs text-green-600 border-green-300">Resolved</Badge>}
              </div>
              <DialogTitle className="text-base leading-snug text-left">{selected.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={selected.author.avatar} />
                  <AvatarFallback>{selected.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{selected.author.name}</span>
                    {selected.author.role === "instructor" && <Badge className="text-[10px] h-4 px-1 bg-blue-600">Instructor</Badge>}
                    <span className="text-xs text-muted-foreground ml-auto">{formatDistanceToNow(selected.createdAt)}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{selected.body}</p>
                  <button
                    onClick={() => setUpvoted(p => ({ ...p, [selected.id]: !p[selected.id] }))}
                    className={cn("flex items-center gap-1 text-xs mt-2 transition-colors", upvoted[selected.id] ? "text-primary" : "text-muted-foreground hover:text-primary")}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {selected.upvotes + (upvoted[selected.id] ? 1 : 0)}
                  </button>
                </div>
              </div>

              {selected.replies.length > 0 && (
                <>
                  <Separator />
                  <p className="text-sm font-medium text-muted-foreground">{selected.replies.length}টি উত্তর</p>
                  {selected.replies.map(reply => (
                    <div key={reply.id} className={cn("flex gap-3 pl-4 border-l-2", reply.isAnswer ? "border-green-400" : "border-border")}>
                      <Avatar className="h-7 w-7 shrink-0">
                        <AvatarImage src={reply.author.avatar} />
                        <AvatarFallback>{reply.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">{reply.author.name}</span>
                          {reply.author.role === "instructor" && <Badge className="text-[10px] h-4 px-1 bg-blue-600">Instructor</Badge>}
                          {reply.isAnswer && <Badge className="text-[10px] h-4 px-1 bg-green-600 flex items-center gap-0.5"><CheckCircle2 className="h-2.5 w-2.5" />Best Answer</Badge>}
                        </div>
                        <p className="text-sm leading-relaxed">{reply.body}</p>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {!selected.locked && (
                <>
                  <Separator />
                  <Textarea placeholder="উত্তর লিখুন..." value={replyText} onChange={e => setReplyText(e.target.value)} className="min-h-20" />
                  <div className="flex justify-end">
                    <Button size="sm" disabled={!replyText.trim()} onClick={() => setReplyText("")}>উত্তর দিন</Button>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* New question dialog */}
      <Dialog open={newOpen} onOpenChange={setNewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>নতুন প্রশ্ন করুন</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="প্রশ্নের শিরোনাম..." value={newTitle} onChange={e => setNewTitle(e.target.value)} />
            <Textarea placeholder="প্রশ্নের বিস্তারিত লিখুন..." value={newBody} onChange={e => setNewBody(e.target.value)} className="min-h-28" />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewOpen(false)}>বাতিল</Button>
              <Button disabled={!newTitle.trim() || !newBody.trim()} onClick={() => { setNewOpen(false); setNewTitle(""); setNewBody("") }}>পোস্ট করুন</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
