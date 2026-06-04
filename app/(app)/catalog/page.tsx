"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { classes } from "@/lib/mock/data"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Search, BookOpen, Users, Star, Lock, Play } from "lucide-react"
import { cn } from "@/lib/utils"

const levels = ["সব", "SSC", "HSC", "Admission", "Class 6", "Class 7", "Class 8"]
const urlLevelToDataLevel: Record<string, string> = {
  hsc: "HSC",
  ssc: "SSC",
  admission: "Admission",
  olympiad: "Olympiad",
  ielts: "IELTS",
  job: "Job Prep",
  skills: "Skills",
  "class-6": "Class 6",
  "class-7": "Class 7",
  "class-8": "Class 8",
}
const entitlementConfig = {
  subscribed: { label: "Subscribed", cls: "bg-green-600 text-white hover:bg-green-600" },
  free: { label: "Free", cls: "bg-blue-600 text-white hover:bg-blue-600" },
  preview: { label: "Preview", cls: "bg-amber-500 text-white hover:bg-amber-500" },
  locked: { label: "Paid", cls: "" },
}

export default function CatalogPage() {
  const searchParams = useSearchParams()
  const levelParam = searchParams.get("level") ?? ""
  const qParam = searchParams.get("q") ?? ""
  const [search, setSearch] = useState(qParam)
  const [activeLevel, setActiveLevel] = useState(urlLevelToDataLevel[levelParam] ?? "সব")

  const filtered = classes.filter(cls => {
    const matchSearch = cls.title.toLowerCase().includes(search.toLowerCase()) || cls.level.toLowerCase().includes(search.toLowerCase())
    const matchLevel = activeLevel === "সব" || cls.level === activeLevel
    return matchSearch && matchLevel
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Catalog</h1>
        <p className="text-muted-foreground text-sm mt-1">{classes.length}টি কোর্স পাওয়া গেছে</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="কোর্স খুঁজুন..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Tabs value={activeLevel} onValueChange={setActiveLevel}>
          <TabsList>{levels.map(l => <TabsTrigger key={l} value={l} className="text-xs">{l}</TabsTrigger>)}</TabsList>
        </Tabs>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">কোনো কোর্স পাওয়া যায়নি।</div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(cls => {
            const cfg = entitlementConfig[cls.entitlement]
            const isLocked = cls.entitlement === "locked"
            return (
              <Link key={cls.id} href={`/catalog/classes/${cls.slug}`}>
                <Card className="group hover:shadow-lg transition-shadow cursor-pointer overflow-hidden h-full flex flex-col">
                  <div className="h-44 bg-cover bg-center relative shrink-0" style={{ backgroundImage: `url(${cls.thumbnail})` }}>
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <Badge variant="secondary" className="text-xs">{cls.level}</Badge>
                      <Badge className={cn("text-xs", cfg.cls)}>{cfg.label}</Badge>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {isLocked
                        ? <Lock className="h-6 w-6 text-white/70" />
                        : <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center shadow"><Play className="h-5 w-5 ml-0.5" /></div>
                      }
                    </div>
                  </div>
                  <CardContent className="p-4 flex flex-col gap-2 flex-1">
                    <p className="font-semibold text-sm leading-snug">{cls.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{cls.description}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{cls.subjectCount} বিষয়</span>
                      <span className="flex items-center gap-1"><Users className="h-3 w-3" />{cls.enrolledCount.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />{cls.rating}</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between pt-1">
                      {cls.price === 0
                        ? <span className="text-sm font-bold text-green-600">বিনামূল্যে</span>
                        : <span className="text-sm font-bold">৳{cls.price.toLocaleString()}/মাস</span>
                      }
                      <Button size="sm" variant={isLocked ? "outline" : "default"} className="h-7 text-xs">
                        {cls.entitlement === "subscribed" ? "Continue" : cls.entitlement === "free" ? "Enroll" : cls.entitlement === "preview" ? "Preview" : "Subscribe"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
