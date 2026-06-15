import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Radio, Calendar, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LiveClassPlayer } from "@/components/learn/live-class-player"
import { getLiveClassById } from "@/lib/mock/live-classes"

export default async function LiveClassDetailPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = await params
  const liveClass = getLiveClassById(classId)

  if (!liveClass) {
    notFound()
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href="/learn/live-classes" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        লাইভ ক্লাসে ফিরে যাও
      </Link>
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{liveClass.subject}</p>
        <h1 className="text-2xl font-bold">{liveClass.title}</h1>
        <p className="text-sm text-muted-foreground">{liveClass.instructor}</p>
      </div>
      <LiveClassPlayer liveClass={liveClass} />
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Calendar className="size-4" />
          {liveClass.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-4" />
          {liveClass.time} ({liveClass.durationMinutes} মিনিট)
        </span>
      </div>
      {liveClass.status === "upcoming" && (
        <Button className="gap-1.5">
          <Radio className="size-4" />
          ক্লাসে যোগ দাও
        </Button>
      )}
      {liveClass.status === "recorded" && (
        <Button className="gap-1.5">রেকর্ডিং দেখো</Button>
      )}
      <div className="space-y-2">
        <h2 className="font-semibold">ক্লাস ম্যাটেরিয়াল</h2>
        <div className="flex items-center gap-2 rounded-lg border p-3 text-sm text-muted-foreground">
          <FileText className="size-4" />
          ক্লাসের স্লাইড ও নোট এখানে যুক্ত হবে।
        </div>
      </div>
    </div>
  )
}
