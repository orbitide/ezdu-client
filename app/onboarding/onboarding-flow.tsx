"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  ChevronRight,
  GraduationCap,
  Briefcase,
  Layers,
  Star,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useAuthStore } from "@/lib/store/auth-store"
import { useOnboardingStore } from "@/lib/store/onboarding-store"
import { defaultAvatarConfig } from "@/lib/avatar/avatar-data"
import {
  segments,
  studentClasses,
  jobClasses,
  type ClassOption,
} from "@/lib/data/onboarding-options"

function GoogleIcon() {
  return (
    <svg className="size-4" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  )
}

type Step = "segment" | "class" | "group" | "final" | "name" | "email" | "password"

const segmentIcons: Record<string, typeof GraduationCap> = {
  student: GraduationCap,
  job: Briefcase,
}

export function OnboardingFlow() {
  const router = useRouter()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const login = useAuthStore((s) => s.login)
  const setExamGroup = useOnboardingStore((s) => s.setExamGroup)
  const setClassName = useOnboardingStore((s) => s.setClassName)
  const setSubjects = useOnboardingStore((s) => s.setSubjects)
  const complete = useOnboardingStore((s) => s.complete)

  const [step, setStep] = useState<Step>("segment")
  const [segmentId, setSegmentId] = useState<string | null>(null)
  const [classId, setClassId] = useState<string | null>(null)
  const [groupId, setGroupId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const classOptions = segmentId === "job" ? jobClasses : studentClasses
  const selectedClass: ClassOption | undefined = classOptions.find((c) => c.id === classId)
  const hasGroups = (selectedClass?.groups.length ?? 0) > 0

  const steps: Step[] = useMemo(() => {
    const base: Step[] = hasGroups ? ["segment", "class", "group", "final"] : ["segment", "class", "final"]
    return isAuthenticated ? base : [...base, "name", "email", "password"]
  }, [hasGroups, isAuthenticated])

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
    } else {
      router.back()
    }
  }

  function saveOnboardingSelections() {
    const segmentLabel = segments.find((s) => s.id === segmentId)?.label ?? "শিক্ষার্থী"
    const examGroup = selectedClass ? `${segmentLabel} - ${selectedClass.label}` : segmentLabel
    setExamGroup(examGroup)
    setClassName(selectedClass?.label ?? "")
    const group = selectedClass?.groups.find((g) => g.id === groupId)
    setSubjects(group ? [group.label] : [])
  }

  function handleFinish() {
    saveOnboardingSelections()
    complete()
    router.replace("/dashboard")
  }

  function handleRegister(password: string) {
    saveOnboardingSelections()
    const segmentLabel = segments.find((s) => s.id === segmentId)?.label ?? "শিক্ষার্থী"
    const examGroup = selectedClass ? `${segmentLabel} - ${selectedClass.label}` : segmentLabel
    login({
      id: "demo-user",
      name: name.trim(),
      username: email.split("@")[0],
      email,
      examGroup,
      className: selectedClass?.label ?? "",
      avatar: defaultAvatarConfig,
    })
    complete()
    router.replace("/dashboard")
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col py-6">
      <div className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={goBack}
          aria-label="পেছনে"
          className="text-2xl leading-none text-muted-foreground transition-colors hover:text-foreground"
        >
          ×
        </button>
        <Progress value={progress} className="flex-1" />
      </div>

      {step === "segment" && (
        <StepSegment
          value={segmentId}
          onSelect={(id) => {
            setSegmentId(id)
            setClassId(null)
            setGroupId(null)
            goNext()
          }}
        />
      )}

      {step === "class" && (
        <StepClass
          options={classOptions}
          value={classId}
          onSelect={(id) => {
            setClassId(id)
            setGroupId(null)
            goNext()
          }}
        />
      )}

      {step === "group" && selectedClass && (
        <StepGroup
          options={selectedClass.groups}
          value={groupId}
          onSelect={(id) => {
            setGroupId(id)
            goNext()
          }}
        />
      )}

      {step === "final" && (
        <StepFinal
          segmentLabel={segments.find((s) => s.id === segmentId)?.label ?? ""}
          classLabel={selectedClass?.label ?? ""}
          groupLabel={selectedClass?.groups.find((g) => g.id === groupId)?.label}
          continueLabel={isAuthenticated ? "সম্পন্ন করো" : "চালিয়ে যাও"}
          onBack={goBack}
          onFinish={isAuthenticated ? handleFinish : goNext}
        />
      )}

      {step === "name" && (
        <StepNameInput
          value={name}
          onBack={goBack}
          onNext={(value) => {
            setName(value)
            goNext()
          }}
        />
      )}

      {step === "email" && (
        <StepEmailInput
          value={email}
          onBack={goBack}
          onNext={(value) => {
            setEmail(value)
            goNext()
          }}
        />
      )}

      {step === "password" && (
        <StepPasswordCreation onBack={goBack} onSubmit={handleRegister} />
      )}
    </div>
  )
}

function OptionRow({
  icon: Icon,
  label,
  description,
  selected,
  onClick,
}: {
  icon?: typeof GraduationCap
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
        "flex w-full items-center gap-3 rounded-xl border p-4 text-left transition-colors hover:border-primary/50 hover:bg-muted/40",
        selected ? "border-primary bg-primary/5" : "border-border"
      )}
    >
      {Icon && (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
      )}
      <div className="flex-1">
        <div className="font-semibold">{label}</div>
        {description && <div className="text-sm text-muted-foreground">{description}</div>}
      </div>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground/50" />
    </button>
  )
}

function StepSegment({
  value,
  onSelect,
}: {
  value: string | null
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold">তুমি কী জন্য প্রস্তুতি নিচ্ছো?</h1>
        <p className="mt-1 text-sm text-muted-foreground">তোমার জন্য সঠিক কনটেন্ট সাজাতে সাহায্য করবে।</p>
      </div>
      <div className="flex flex-col gap-2">
        {segments.map((segment) => (
          <OptionRow
            key={segment.id}
            icon={segmentIcons[segment.id]}
            label={segment.label}
            description={segment.description}
            selected={value === segment.id}
            onClick={() => onSelect(segment.id)}
          />
        ))}
      </div>
    </div>
  )
}

function StepClass({
  options,
  value,
  onSelect,
}: {
  options: ClassOption[]
  value: string | null
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold">তোমার লেভেল বেছে নাও</h1>
        <p className="mt-1 text-sm text-muted-foreground">কোন পরীক্ষা বা ক্লাসের জন্য প্র্যাকটিস করতে চাও?</p>
      </div>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <OptionRow
            key={option.id}
            label={option.label}
            selected={value === option.id}
            onClick={() => onSelect(option.id)}
          />
        ))}
      </div>
    </div>
  )
}

function StepGroup({
  options,
  value,
  onSelect,
}: {
  options: { id: string; label: string }[]
  value: string | null
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold">তোমার গ্রুপ বেছে নাও</h1>
        <p className="mt-1 text-sm text-muted-foreground">এটি তোমার বিষয়সমূহ নির্ধারণ করবে।</p>
      </div>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <OptionRow
            key={option.id}
            label={option.label}
            selected={value === option.id}
            onClick={() => onSelect(option.id)}
          />
        ))}
      </div>
    </div>
  )
}

function StepFinal({
  segmentLabel,
  classLabel,
  groupLabel,
  continueLabel,
  onBack,
  onFinish,
}: {
  segmentLabel: string
  classLabel: string
  groupLabel?: string
  continueLabel: string
  onBack: () => void
  onFinish: () => void
}) {
  const rows = [
    { icon: Layers, label: "ফোকাস", value: segmentLabel },
    { icon: GraduationCap, label: "লেভেল", value: classLabel },
    ...(groupLabel ? [{ icon: Star, label: "বিশেষায়ন", value: groupLabel }] : []),
  ]

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center pt-6 text-center">
        <div className="relative flex size-28 items-center justify-center rounded-full bg-primary/10">
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-primary/30" />
          <CheckCircle2 className="size-14 text-primary" />
        </div>

        <h1 className="mt-8 text-xl font-bold">সব সেট!</h1>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          তোমার প্রোফাইলের ভিত্তিতে আমরা প্র্যাকটিস কনটেন্ট সাজিয়ে দিচ্ছি।
        </p>

        <div className="mt-8 w-full divide-y rounded-xl border bg-muted/30">
          {rows.map((row, i) => (
            <div key={i} className="flex items-center gap-3 p-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <row.icon className="size-4" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-xs font-medium text-muted-foreground">{row.label}</div>
                <div className="text-sm font-semibold">{row.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-8">
        <Button size="lg" onClick={onFinish}>
          {continueLabel}
        </Button>
        <Button variant="ghost" onClick={onBack}>
          পেছনে
        </Button>
      </div>
    </div>
  )
}

function StepNameInput({
  value,
  onBack,
  onNext,
}: {
  value: string
  onBack: () => void
  onNext: (value: string) => void
}) {
  const [name, setName] = useState(value)
  const [error, setError] = useState<string | null>(null)

  function handleContinue() {
    if (!name.trim()) {
      setError("তোমার নাম লিখো।")
      return
    }
    setError(null)
    onNext(name.trim())
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1">
        <h1 className="text-xl font-bold">তোমার নাম কী?</h1>
        <p className="mt-1 text-sm text-muted-foreground">এটি তোমার প্রোফাইলে দেখানো হবে।</p>

        <div className="mt-8 space-y-2">
          <Label htmlFor="onboarding-name">পূর্ণ নাম</Label>
          <Input
            id="onboarding-name"
            placeholder="তোমার নাম"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-8">
        <Button size="lg" onClick={handleContinue}>
          চালিয়ে যাও
        </Button>
        <Button variant="ghost" onClick={onBack}>
          পেছনে
        </Button>
      </div>
    </div>
  )
}

function StepEmailInput({
  value,
  onBack,
  onNext,
}: {
  value: string
  onBack: () => void
  onNext: (value: string) => void
}) {
  const [email, setEmail] = useState(value)
  const [error, setError] = useState<string | null>(null)

  function handleContinue() {
    if (!/^[\w.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError("সঠিক ইমেইল ঠিকানা লিখো।")
      return
    }
    setError(null)
    onNext(email.trim())
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1">
        <h1 className="text-xl font-bold">তোমার ইমেইল দাও</h1>
        <p className="mt-1 text-sm text-muted-foreground">লগইন এবং গুরুত্বপূর্ণ আপডেটের জন্য ব্যবহার হবে।</p>

        <div className="mt-8 space-y-4">
          <Button type="button" variant="outline" className="w-full">
            <GoogleIcon />
            Google দিয়ে চালিয়ে যান
          </Button>

          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">অথবা</span>
            <Separator className="flex-1" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="onboarding-email">ইমেইল</Label>
            <Input
              id="onboarding-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-8">
        <Button size="lg" onClick={handleContinue}>
          চালিয়ে যাও
        </Button>
        <Button variant="ghost" onClick={onBack}>
          পেছনে
        </Button>
      </div>
    </div>
  )
}

function StepPasswordCreation({
  onBack,
  onSubmit,
}: {
  onBack: () => void
  onSubmit: (password: string) => void
}) {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit() {
    if (password.length < 6 || password.length > 20) {
      setError("পাসওয়ার্ড ৬ থেকে ২০ অক্ষরের মধ্যে হতে হবে।")
      return
    }
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setError("পাসওয়ার্ডে অন্তত একটি সংখ্যা ও একটি অক্ষর থাকতে হবে।")
      return
    }
    if (password !== confirmPassword) {
      setError("পাসওয়ার্ড মিলছে না।")
      return
    }
    if (!agreed) {
      setError("শর্তাবলীতে সম্মত হতে হবে।")
      return
    }
    setError(null)
    onSubmit(password)
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1">
        <h1 className="text-xl font-bold">একটি পাসওয়ার্ড তৈরি করো</h1>
        <p className="mt-1 text-sm text-muted-foreground">কমপক্ষে ৬ অক্ষর, সংখ্যা ও অক্ষরের সংমিশ্রণে।</p>

        <div className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="onboarding-password">পাসওয়ার্ড</Label>
            <PasswordInput
              id="onboarding-password"
              placeholder="কমপক্ষে ৬ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="onboarding-confirm-password">পাসওয়ার্ড নিশ্চিত করো</Label>
            <PasswordInput
              id="onboarding-confirm-password"
              placeholder="পুনরায় পাসওয়ার্ড লিখো"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              className="mt-1 size-4 rounded border-border"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <span>আমি EZDU-এর শর্তাবলী ও প্রাইভেসি পলিসিতে সম্মত আছি।</span>
          </label>

          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-8">
        <Button size="lg" onClick={handleSubmit}>
          অ্যাকাউন্ট তৈরি করো
        </Button>
        <Button variant="ghost" onClick={onBack}>
          পেছনে
        </Button>
      </div>
    </div>
  )
}
