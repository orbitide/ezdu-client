import { PageHeader } from "@/components/shared/page-header"

export default function LearnDashboardPage() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      <PageHeader
        title="তোমার স্টাডি প্ল্যান"
        description="তোমার অগ্রগতি ও লক্ষ্য অনুযায়ী এখন কোথায় ফোকাস করবে।"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-4 h-32" />
        ))}
      </div>
    </div>
  )
}
