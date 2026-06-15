import { PageHeader } from "@/components/shared/page-header"
import { SettingsNav } from "@/components/settings/settings-nav"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <PageHeader title="সেটিংস" description="তোমার অ্যাকাউন্ট এবং পছন্দসমূহ পরিচালনা করো।" />
      <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
        <SettingsNav />
        <div>{children}</div>
      </div>
    </div>
  )
}
