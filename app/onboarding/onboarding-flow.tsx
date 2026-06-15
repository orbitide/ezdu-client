"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import {
  segments,
  studentClasses,
  jobClasses,
  type ClassOption,
} from "@/lib/data/onboarding-options"

type Step = "segment" | "class" | "group" | "final"

export function OnboardingFlow() {
  const router = useRouter()
  const setExamGroup = useOnboardingStore((s) => s.setExamGroup)
  const setClassName = useOnboardingStore((s) => s.setClassName)
  const setSubjects = useOnboardingStore((s) => s.setSubjects)
  const complete = useOnboardingStore((s) => s.complete)

  const [step, setStep] = useState<Step>("segment")
  const [segmentId, setSegmentId] = useState<string | null>(null)
  const [classId, setClassId] = useState<string | null>(null)
  const [groupId, setGroupId] = useState<string | null>(null)

  const classOptions = segmentId === "job" ? jobClasses : studentClasses
  const selectedClass: ClassOption | undefined = classOptions.find((c) => c.id === classId)
  const hasGroups = (selectedClass?.groups.length ?? 0) > 0

  const steps: Step[] = useMemo(() => {
    return hasGroups ? ["segment", "class", "group", "final"] : ["segment", "class", "final"]
  }, [hasGroups])

  const stepIndex = steps.indexOf(step)
  const progress = ((stepIndex + 1) / steps.length) * 100

  function goNext() {
    const idx = steps.indexOf(step)
    if (idx < steps.length - 1) {
      setStep(steps[idx + 1])
    }
  }

  function goBack() {
    const idx = steps.indexOf(step)
    if (idx > 0) {
      setStep(steps[idx - 1])
    }
  }

  function handleFinish() {
    const segmentLabel = segments.find((s) => s.id === segmentId)?.label ?? "শিক্ষার্থী"
    const examGroup = selectedClass ? `${segmentLabel} - ${selectedClass.label}` : segmentLabel
    setExamGroup(examGroup)
    setClassName(selectedClass?.label ?? "")
    const group = selectedClass?.groups.find((g) => g.id === groupId)
    setSubjects(group ? [group.label] : [])
    complete()
    router.replace("/home")
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className="space-y-4">
        <Progress value={progress} />
        <div>
          <CardTitle>তোমার স্টাডি প্রোফাইল সেট করো</CardTitle>
          <CardDescription>এটি তোমার জন্য প্র্যাকটিস ও কনটেন্ট সাজাতে সাহায্য করবে।</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {step === "segment" && (
          <StepSegment
            value={segmentId}
            onSelect={(id) => {
              setSegmentId(id)
              setClassId(null)
              setGroupId(null)
            }}
            onNext={goNext}
          />
        )}

        {step === "class" && (
          <StepClass
            options={classOptions}
            value={classId}
            onSelect={(id) => {
              setClassId(id)
              setGroupId(null)
            }}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === "group" && selectedClass && (
          <StepGroup
            options={selectedClass.groups}
            value={groupId}
            onSelect={setGroupId}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {step === "final" && (
          <StepFinal
            segmentLabel={segments.find((s) => s.id === segmentId)?.label ?? ""}
            classLabel={selectedClass?.label ?? ""}
            groupLabel={selectedClass?.groups.find((g) => g.id === groupId)?.label}
            onBack={goBack}
            onFinish={handleFinish}
          />
        )}
      </CardContent>
    </Card>
  )
}

function OptionButton({
  label,
  description,
  selected,
  onClick,
}: {
  label: string
  description?: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-lg border p-4 text-left transition-colors hover:border-primary",
        selected ? "border-primary bg-primary/5" : "border-border"
      )}
    >
      <div className="font-semibold">{label}</div>
      {description && <div className="text-sm text-muted-foreground">{description}</div>}
    </button>
  )
}

function StepSegment({
  value,
  onSelect,
  onNext,
}: {
  value: string | null
  onSelect: (id: string) => void
  onNext: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {segments.map((segment) => (
          <OptionButton
            key={segment.id}
            label={segment.label}
            description={segment.description}
            selected={value === segment.id}
            onClick={() => onSelect(segment.id)}
          />
        ))}
      </div>
      <Button className="w-full" disabled={!value} onClick={onNext}>
        চালিয়ে যাও
      </Button>
    </div>
  )
}

function StepClass({
  options,
  value,
  onSelect,
  onNext,
  onBack,
}: {
  options: ClassOption[]
  value: string | null
  onSelect: (id: string) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {options.map((option) => (
          <OptionButton
            key={option.id}
            label={option.label}
            selected={value === option.id}
            onClick={() => onSelect(option.id)}
          />
        ))}
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onBack}>
          পেছনে
        </Button>
        <Button className="flex-1" disabled={!value} onClick={onNext}>
          চালিয়ে যাও
        </Button>
      </div>
    </div>
  )
}

function StepGroup({
  options,
  value,
  onSelect,
  onNext,
  onBack,
}: {
  options: { id: string; label: string }[]
  value: string | null
  onSelect: (id: string) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {options.map((option) => (
          <OptionButton
            key={option.id}
            label={option.label}
            selected={value === option.id}
            onClick={() => onSelect(option.id)}
          />
        ))}
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onBack}>
          পেছনে
        </Button>
        <Button className="flex-1" disabled={!value} onClick={onNext}>
          চালিয়ে যাও
        </Button>
      </div>
    </div>
  )
}

function StepFinal({
  segmentLabel,
  classLabel,
  groupLabel,
  onBack,
  onFinish,
}: {
  segmentLabel: string
  classLabel: string
  groupLabel?: string
  onBack: () => void
  onFinish: () => void
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-muted/40 p-4">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">ফোকাস</dt>
            <dd className="font-medium">{segmentLabel}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">লেভেল</dt>
            <dd className="font-medium">{classLabel}</dd>
          </div>
          {groupLabel && (
            <div className="flex justify-between">
              <dt className="text-muted-foreground">বিশেষায়ন</dt>
              <dd className="font-medium">{groupLabel}</dd>
            </div>
          )}
        </dl>
      </div>
      <p className="text-sm text-muted-foreground">
        তুমি যেকোনো সময় প্রোফাইল থেকে অ্যাভাটার কাস্টমাইজ করতে ও এই পছন্দগুলো পরিবর্তন করতে পারবে।
      </p>
      <div className="flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onBack}>
          পেছনে
        </Button>
        <Button className="flex-1" onClick={onFinish}>
          সেটআপ সম্পন্ন করো
        </Button>
      </div>
    </div>
  )
}
