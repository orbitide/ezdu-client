import { AuthGate } from "@/components/layout/auth-gate"
import { AppShell } from "@/components/layout/app-shell"

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <AppShell>{children}</AppShell>
    </AuthGate>
  )
}
