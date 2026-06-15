import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { QaAskForm } from "@/components/learn/qa-ask-form"

export default async function QaNewQuestionPage({
  searchParams,
}: {
  searchParams: Promise<{ lessonId?: string }>
}) {
  const { lessonId } = await searchParams

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href="/learn/qa" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        প্রশ্ন-উত্তরে ফিরে যাও
      </Link>
      <PageHeader title="নতুন প্রশ্ন করো" description="তোমার প্রশ্নটি স্পষ্টভাবে লেখো যাতে অন্যরা সহজে সাহায্য করতে পারে।" />
      <QaAskForm lessonId={lessonId} />
    </div>
  )
}
