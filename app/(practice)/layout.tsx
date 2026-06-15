import { AuthGate } from "@/components/layout/auth-gate"
import { AppShell } from "@/components/layout/app-shell"

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <AppShell>
        <div className="p-4 lg:p-6">{children}</div>
      </AppShell>
    </AuthGate>
  )
}
