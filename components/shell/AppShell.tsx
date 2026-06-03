"use client"

import { useAppModeStore } from "@/lib/stores/appModeStore"
import { StudentNav } from "./StudentNav"
import { ParentNav } from "./ParentNav"

export function AppShell({ children }: { children: React.ReactNode }) {
  const mode = useAppModeStore(s => s.mode)
  return (
    <div className="min-h-screen flex flex-col">
      {mode === "student" ? <StudentNav /> : <ParentNav />}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6">
        {children}
      </main>
    </div>
  )
}
