"use client"

import { useRef } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArchiveSubjectGrid } from "@/components/archive/archive-subject-grid"
import { ArchiveInstituteGrid } from "@/components/archive/archive-institute-grid"

export function ArchiveBrowser() {
  const subjectRef = useRef<HTMLDivElement>(null)
  const instituteRef = useRef<HTMLDivElement>(null)

  const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    subject: subjectRef,
    institute: instituteRef,
  }

  const scrollTo = (value: string) => {
    refs[value]?.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="subject"
        onValueChange={(value) => scrollTo(value as string)}
        className="sticky top-0 z-20 bg-background py-2"
      >
        <TabsList>
          <TabsTrigger value="subject">বিষয় অনুযায়ী</TabsTrigger>
          <TabsTrigger value="institute">প্রতিষ্ঠান অনুযায়ী</TabsTrigger>
        </TabsList>
      </Tabs>
      <div ref={subjectRef} className="scroll-mt-16 space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">বিষয় অনুযায়ী</h2>
        <ArchiveSubjectGrid />
      </div>
      <div ref={instituteRef} className="scroll-mt-16 space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground">প্রতিষ্ঠান অনুযায়ী</h2>
        <ArchiveInstituteGrid />
      </div>
      <div className="h-[60vh]" aria-hidden="true" />
    </div>
  )
}
