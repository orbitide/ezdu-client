import { PageHeader } from "@/components/shared/page-header"
import { ResourceLibraryGrid } from "@/components/learn/resource-library-grid"

export default function ResourcesPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="রিসোর্স লাইব্রেরি" description="পিডিএফ, চিট শীট, সূত্র শীট এবং প্রশ্নব্যাংক খুঁজে নাও।" />
      <ResourceLibraryGrid />
    </div>
  )
}
