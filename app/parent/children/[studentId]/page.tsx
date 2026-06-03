"use client"

import { use } from "react"
import { children } from "@/lib/mock/data"
import { notFound } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Clock, BookOpen } from "lucide-react"
import { formatDistanceToNow } from "@/lib/time"
import { cn } from "@/lib/utils"

export default function ChildDetailPage({ params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = use(params)
  const child = children.find(c => c.id === studentId)
  if (!child) notFound()

  const avgScore = child.mockTestScores.length > 0
    ? Math.round(child.mockTestScores.reduce((s, t) => s + t.score, 0) / child.mockTestScores.length)
    : null

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={child.avatar} alt={child.name} />
          <AvatarFallback className="text-xl">{child.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{child.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="secondary">{child.class}</Badge>
            <Badge className={child.subscriptionStatus === "active" ? "bg-green-600" : "bg-muted text-muted-foreground"}>
              {child.subscriptionStatus === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Clock className="h-3 w-3" />{formatDistanceToNow(child.lastActive)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          ["সামগ্রিক অগ্রগতি", `${child.progress}%`],
          ["ব্যাজ", child.badgeCount],
          ["মক টেস্ট", child.mockTestScores.length],
          ["গড় স্কোর", avgScore !== null ? `${avgScore}%` : "—"],
        ].map(([l, v]) => (
          <Card key={l}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{v}</p>
              <p className="text-xs text-muted-foreground">{l}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-5 space-y-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">ভর্তি কোর্সসমূহ</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {child.enrolledClasses.map((cls, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <BookOpen className="h-4 w-4 text-muted-foreground" /><span>{cls}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-sm">সামগ্রিক অগ্রগতি</CardTitle></CardHeader>
            <CardContent>
              <Progress value={child.progress} className="h-3" />
              <p className="text-xs text-muted-foreground mt-1">{child.progress}%</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="mt-5">
          <Card>
            <CardContent className="pt-5 space-y-4">
              {child.subjectProgress.map(sp => (
                <div key={sp.subject} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{sp.subject}</span>
                    <span className="text-muted-foreground">{sp.percent}%</span>
                  </div>
                  <Progress value={sp.percent} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="mt-5">
          <div className="grid gap-3 sm:grid-cols-2">
            {child.badges.map(badge => (
              <Card key={badge.id}>
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center text-xl shrink-0", badge.color)}>{badge.icon}</div>
                  <div>
                    <p className="font-semibold text-sm">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.description}</p>
                    {badge.earnedAt && <p className="text-xs text-muted-foreground mt-0.5">{new Date(badge.earnedAt).toLocaleDateString("bn-BD")}</p>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assessments" className="mt-5">
          <Card>
            <CardContent className="p-0 divide-y divide-border">
              {child.mockTestScores.length === 0
                ? <p className="text-sm text-muted-foreground p-6 text-center">কোনো মক টেস্ট দেওয়া হয়নি।</p>
                : child.mockTestScores.map((ts, i) => (
                  <div key={i} className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-medium">{ts.test}</p>
                      <p className="text-xs text-muted-foreground">{ts.date}</p>
                    </div>
                    <Badge className={ts.score >= 60 ? "bg-green-600" : "bg-red-600"}>{ts.score}%</Badge>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions" className="mt-5">
          <Card>
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{child.enrolledClasses[0]}</p>
                  <p className="text-xs text-muted-foreground">মাসিক সাবস্ক্রিপশন</p>
                </div>
                <Badge className={child.subscriptionStatus === "active" ? "bg-green-600" : "bg-muted text-muted-foreground"}>
                  {child.subscriptionStatus === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
