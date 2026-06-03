"use client"

import { useAppModeStore } from "@/lib/stores/appModeStore"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { GraduationCap, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export function ModeSwitcher() {
  const { mode, setMode } = useAppModeStore()
  const router = useRouter()

  function switchTo(next: "student" | "parent") {
    setMode(next)
    router.push(next === "student" ? "/learn" : "/parent/dashboard")
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-muted p-1">
      <button
        onClick={() => switchTo("student")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
          mode === "student"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <GraduationCap className="h-3.5 w-3.5" />
        Student
      </button>
      <button
        onClick={() => switchTo("parent")}
        className={cn(
          "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors",
          mode === "parent"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Users className="h-3.5 w-3.5" />
        Parent
      </button>
    </div>
  )
}
