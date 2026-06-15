import { PageHeader } from "@/components/shared/page-header"
import { SettingsNav } from "@/components/settings/settings-nav"
import { TwoColumnShell } from "@/components/layout/two-column-shell"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <TwoColumnShell right={<SettingsNav />}>
      <PageHeader title="সেটিংস" description="তোমার অ্যাকাউন্ট এবং পছন্দসমূহ পরিচালনা করো।" />
      {children}
    </TwoColumnShell>
  )
}
