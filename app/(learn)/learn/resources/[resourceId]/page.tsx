import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getResourceById } from "@/lib/mock/resources"

export default async function ResourceDetailPage({ params }: { params: Promise<{ resourceId: string }> }) {
  const { resourceId } = await params
  const resource = getResourceById(resourceId)

  if (!resource) {
    notFound()
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href="/learn/resources" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        রিসোর্স লাইব্রেরিতে ফিরে যাও
      </Link>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{resource.subject}</p>
        <h1 className="text-2xl font-bold">{resource.title}</h1>
        <p className="text-muted-foreground">{resource.description}</p>
      </div>
      <div className="flex aspect-[3/4] max-w-sm flex-col items-center justify-center gap-2 rounded-xl bg-muted text-muted-foreground">
        <FileText className="size-12" />
        <p className="text-sm">{resource.pageCount} পৃষ্ঠা</p>
      </div>
      <Button className="gap-1.5">
        <Download className="size-4" />
        ডাউনলোড করো
      </Button>
    </div>
  )
}
