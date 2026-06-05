import { StudentNav } from "@/components/shell/StudentNav"
import { AppFooter } from "@/components/shell/AppFooter"
import { AuthGuard } from "@/components/AuthGuard"
import { PurchaseHydrator } from "@/components/PurchaseHydrator"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <PurchaseHydrator />
      <div className="min-h-screen flex flex-col">
        <StudentNav />
        <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-8 py-6">
          {children}
        </main>
        <AppFooter />
      </div>
    </AuthGuard>
  )
}
