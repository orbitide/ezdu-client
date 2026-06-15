"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ArchiveSubjectGrid } from "@/components/archive/archive-subject-grid"
import { ArchiveInstituteGrid } from "@/components/archive/archive-institute-grid"

export function ArchiveBrowser() {
  return (
    <Tabs defaultValue="subject">
      <TabsList>
        <TabsTrigger value="subject">বিষয় অনুযায়ী</TabsTrigger>
        <TabsTrigger value="institute">প্রতিষ্ঠান অনুযায়ী</TabsTrigger>
      </TabsList>
      <TabsContent value="subject" className="mt-4">
        <ArchiveSubjectGrid />
      </TabsContent>
      <TabsContent value="institute" className="mt-4">
        <ArchiveInstituteGrid />
      </TabsContent>
    </Tabs>
  )
}
