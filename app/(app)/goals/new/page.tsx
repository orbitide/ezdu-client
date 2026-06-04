"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { saveStudyGoal } from "@/lib/storage"
import { cn } from "@/lib/utils"

const minuteOptions = [15, 30, 45, 60]

export default function NewGoalPage() {
  const router = useRouter()
  const [minutes, setMinutes] = useState<number | null>(null)
  const [note, setNote] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!minutes) return
    const goalText = note.trim()
      ? note.trim()
      : `প্রতিদিন ${minutes} মিনিট পড়ব এবং ধারাবাহিকভাবে এগিয়ে যাব।`
    saveStudyGoal({ hasGoal: true, goalText, dailyMinutes: minutes, createdAt: new Date().toISOString() })
    router.push("/learn")
  }

  return (
    <div className="max-w-md mx-auto space-y-8 pt-4">
      <div>
        <h1 className="text-2xl font-bold">শেখার লক্ষ্য নির্ধারণ করো</h1>
        <p className="text-muted-foreground text-sm mt-1">প্রতিদিন কতটুকু সময় দিতে চাও?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label>প্রতিদিনের লক্ষ্য</Label>
          <div className="flex gap-2 flex-wrap">
            {minuteOptions.map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMinutes(m)}
                className={cn(
                  "rounded-lg border px-4 py-2 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                  minutes === m
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/60 hover:bg-accent"
                )}
              >
                {m} মিনিট
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="note">নিজের কথায় লিখুন (ঐচ্ছিক)</Label>
          <Input
            id="note"
            placeholder="যেমন: প্রতিদিন পদার্থবিজ্ঞান ৩০ মিনিট পড়ব..."
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={!minutes}>
          লক্ষ্য নির্ধারণ করো
        </Button>
      </form>
    </div>
  )
}
