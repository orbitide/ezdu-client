import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./app-header"
import { BottomNav } from "./bottom-nav"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex w-0 md:w-16 lg:w-64 flex-col shrink-0 overflow-hidden border-r bg-sidebar transition-[width] duration-300 ease-in-out">
        <AppSidebar className="w-16 lg:w-64" />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
