import { AuthGate } from "@/components/layout/auth-gate"

export default function FocusLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      <div className="flex min-h-screen flex-col bg-background">{children}</div>
    </AuthGate>
  )
}
