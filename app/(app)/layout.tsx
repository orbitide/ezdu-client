import { StudentNav } from "@/components/shell/StudentNav"
import { AuthGuard } from "@/components/AuthGuard"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <StudentNav />
        <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}
