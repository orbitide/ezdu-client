"use client"

import { useAppModeStore } from "@/lib/stores/appModeStore"
import { useRouter } from "next/navigation"
import { GraduationCap, Users, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"

const modes = [
  { value: "student", label: "শিক্ষার্থী", icon: GraduationCap },
  { value: "parent",  label: "অভিভাবক",  icon: Users },
] as const

export function ModeSwitcher() {
  const { mode, setMode } = useAppModeStore()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = modes.find(m => m.value === mode)!

  function switchTo(next: "student" | "parent") {
    setMode(next)
    setOpen(false)
    router.push(next === "student" ? "/learn" : "/parent/dashboard")
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          "flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent",
        )}
      >
        <current.icon className="h-3.5 w-3.5" />
        {current.label}
        <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl border border-border bg-popover shadow-lg overflow-hidden z-50">
          {modes.filter(m => m.value !== mode).map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => switchTo(value)}
              className="flex w-full items-center gap-2 px-3 py-2.5 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Icon className="h-3.5 w-3.5" />
              {label} হিসেবে দেখুন
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
