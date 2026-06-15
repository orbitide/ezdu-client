import { AuthGate } from "@/components/layout/auth-gate"

export default function ChallengeLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <div className="flex min-h-screen flex-col bg-background">{children}</div>
    </AuthGate>
  )
}
