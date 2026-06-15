import { PageHeader } from "@/components/shared/page-header"
import { CourseCatalog } from "@/components/learn/course-catalog"

export default async function CourseCatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ subject?: string }>
}) {
  const { subject } = await searchParams

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="কোর্স ক্যাটালগ" description="বিষয় ও পরীক্ষার ধরন অনুযায়ী কোর্স খুঁজে নাও।" />
      <CourseCatalog initialSubject={subject} />
    </div>
  )
}
