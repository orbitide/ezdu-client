import Link from "next/link"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { QaForumList } from "@/components/learn/qa-forum-list"

export default function QaForumPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-center justify-between gap-4">
        <PageHeader title="প্রশ্ন-উত্তর" description="তোমার পড়াশোনা সংক্রান্ত প্রশ্ন জিজ্ঞাসা করো বা অন্যদের সাহায্য করো।" />
        <Button asChild className="gap-1.5">
          <Link href="/learn/qa/new">
            <Plus className="size-4" />
            নতুন প্রশ্ন
          </Link>
        </Button>
      </div>
      <QaForumList />
    </div>
  )
}
