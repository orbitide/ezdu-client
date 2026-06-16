"use client"

import { Brain, List } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useStudyPlanStore } from "@/lib/store/study-plan-store"
import type { StudyPlanMode } from "@/lib/types/study-plan"

interface ModeCardProps {
  mode: StudyPlanMode
  icon: React.ReactNode
  title: string
  description: string
  selected: boolean
  onSelect: () => void
}

function ModeCard({ icon, title, description, selected, onSelect }: ModeCardProps) {
  return (
    <Card
      onClick={onSelect}
      className={cn(
        "cursor-pointer transition-all hover:border-primary/60",
        selected && "border-primary ring-1 ring-primary"
      )}
    >
      <CardContent className="flex items-start gap-4 py-5">
        <div className="mt-0.5 text-primary">{icon}</div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function PlanModeStep() {
  const { draft, setDraft, setStep } = useStudyPlanStore()
  const selected = draft.mode

  function pick(mode: StudyPlanMode) {
    setDraft({ mode })
    setStep(mode === "manual" ? "picker" : "duration")
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">পরিকল্পনার ধরন বেছে নাও</h2>
        <p className="mt-1 text-sm text-muted-foreground">AI স্বয়ংক্রিয়ভাবে তৈরি করুক, অথবা নিজে পাঠ বেছে নাও।</p>
      </div>
      <ModeCard
        mode="auto"
        icon={<Brain className="size-6" />}
        title="স্বয়ংক্রিয় পরিকল্পনা"
        description="AI তোমার দুর্বল বিষয়গুলো বিশ্লেষণ করে সেরা পরিকল্পনা তৈরি করবে।"
        selected={selected === "auto"}
        onSelect={() => pick("auto")}
      />
      <ModeCard
        mode="manual"
        icon={<List className="size-6" />}
        title="নিজে পাঠ বেছে নাও"
        description="তুমি নিজে বিষয় ও পাঠ বেছে নেবে, সেই অনুযায়ী পরিকল্পনা তৈরি হবে।"
        selected={selected === "manual"}
        onSelect={() => pick("manual")}
      />
    </div>
  )
}
