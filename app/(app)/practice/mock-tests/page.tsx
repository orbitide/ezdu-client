"use client"

import { useState } from "react"
import Link from "next/link"
import { mockTests } from "@/lib/mock/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Clock, Trophy, RefreshCw, ChevronRight, BarChart3 } from "lucide-react"

export default function MockTestsPage() {
  const [selectedTest, setSelectedTest] = useState<typeof mockTests[0] | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mock Tests</h1>
        <p className="text-muted-foreground text-sm mt-1">পূর্ণ প্রস্তুতির জন্য মডেল টেস্ট দিন</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: Trophy, color: "text-yellow-500", value: mockTests.filter(t => t.bestScore !== undefined).length, label: "টেস্ট দেওয়া হয়েছে" },
          { icon: BarChart3, color: "text-blue-500", value: `${mockTests.filter(t => t.bestScore !== undefined).length > 0 ? Math.round(mockTests.filter(t => t.bestScore !== undefined).reduce((a, t) => a + (t.bestScore ?? 0), 0) / mockTests.filter(t => t.bestScore !== undefined).length) : 0}%`, label: "গড় স্কোর" },
          { icon: RefreshCw, color: "text-green-500", value: mockTests.reduce((a, t) => a + t.attempts, 0), label: "মোট অ্যাটেম্পট" },
        ].map(({ icon: Icon, color, value, label }) => (
          <Card key={label}>
            <CardContent className="p-4 flex items-center gap-3">
              <Icon className={`h-8 w-8 ${color}`} />
              <div><p className="text-xl font-bold">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {mockTests.map(test => (
          <Card key={test.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge variant="outline" className="text-xs mb-2">{test.subject}</Badge>
                  <p className="font-semibold text-sm leading-snug">{test.title}</p>
                </div>
                {test.bestScore !== undefined && test.bestScore >= test.passMark && (
                  <Trophy className="h-5 w-5 text-yellow-500 shrink-0" />
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-muted p-2">
                  <p className="font-semibold text-sm">{test.questionCount}</p>
                  <p className="text-[10px] text-muted-foreground">প্রশ্ন</p>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <p className="font-semibold text-sm flex items-center justify-center gap-1"><Clock className="h-3 w-3" />{test.duration}m</p>
                  <p className="text-[10px] text-muted-foreground">সময়</p>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <p className="font-semibold text-sm">{test.passMark}%</p>
                  <p className="text-[10px] text-muted-foreground">পাস মার্ক</p>
                </div>
              </div>

              {test.bestScore !== undefined ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">সেরা স্কোর ({test.attempts} বার)</span>
                    <span className={test.bestScore >= test.passMark ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{test.bestScore}%</span>
                  </div>
                  <Progress value={test.bestScore} className="h-2" />
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">এখনও দেওয়া হয়নি</p>
              )}

              <Button className="w-full" variant={test.attempts > 0 ? "outline" : "default"} onClick={() => setSelectedTest(test)}>
                {test.attempts > 0 ? <><RefreshCw className="h-4 w-4 mr-2" />পুনরায় দিন</> : <><ChevronRight className="h-4 w-4 mr-2" />টেস্ট শুরু করুন</>}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
        {selectedTest && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedTest.title}</DialogTitle>
              <DialogDescription>টেস্ট শুরু করার আগে নিচের তথ্য পড়ুন</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border p-3 text-center">
                  <p className="text-2xl font-bold">{selectedTest.questionCount}</p>
                  <p className="text-xs text-muted-foreground">প্রশ্ন</p>
                </div>
                <div className="rounded-lg border border-border p-3 text-center">
                  <p className="text-2xl font-bold">{selectedTest.duration}</p>
                  <p className="text-xs text-muted-foreground">মিনিট</p>
                </div>
              </div>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                <li>• প্রতিটি সঠিক উত্তরে ১ নম্বর</li>
                <li>• ভুল উত্তরে ০.২৫ নম্বর কাটা</li>
                <li>• সময় শেষে স্বয়ংক্রিয় জমা</li>
                <li>• পাস মার্ক: {selectedTest.passMark}%</li>
              </ul>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setSelectedTest(null)}>বাতিল</Button>
                <Link href="/practice/sessions/sess-001" className="flex-1">
                  <Button className="w-full" onClick={() => setSelectedTest(null)}>শুরু করুন</Button>
                </Link>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
