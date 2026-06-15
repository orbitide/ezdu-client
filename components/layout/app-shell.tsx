import { AppSidebar } from "./app-sidebar"
import { AppHeader } from "./app-header"
import { BottomNav } from "./bottom-nav"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:shrink-0 border-r bg-sidebar">
        <AppSidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <BottomNav />
      </div>
    </div>
  )
}
