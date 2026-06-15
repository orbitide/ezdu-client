import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PageHeader } from "@/components/shared/page-header"
import { PremiumPlanCard } from "@/components/shop/premium-plan-card"
import { premiumPlans } from "@/lib/mock/shop"

export default function PremiumPage() {
  return (
    <div className="space-y-6 p-4 lg:p-6">
      <Link href="/shop" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" />
        শপে ফিরে যাও
      </Link>
      <PageHeader title="প্রিমিয়াম মেম্বারশিপ" description="সেরা অভিজ্ঞতার জন্য একটি প্ল্যান বেছে নাও।" />
      <div className="grid gap-4 sm:grid-cols-2">
        {premiumPlans.map((plan) => (
          <PremiumPlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  )
}
