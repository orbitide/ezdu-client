import { CheckCircle2, Crown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { PremiumPlan } from "@/lib/types/shop"

interface PremiumPlanCardProps {
  plan: PremiumPlan
}

export function PremiumPlanCard({ plan }: PremiumPlanCardProps) {
  return (
    <Card className={plan.highlighted ? "border-primary/50 ring-1 ring-primary/30" : undefined}>
      <CardContent className="space-y-4 py-6">
        <div className="flex items-center gap-2">
          <Crown className={`size-5 ${plan.highlighted ? "text-primary" : "text-muted-foreground"}`} />
          <p className="text-lg font-semibold">{plan.title}</p>
        </div>
        <p className="text-2xl font-bold">
          {plan.price}৳<span className="text-sm font-normal text-muted-foreground"> / {plan.period}</span>
        </p>
        <ul className="space-y-1.5 text-sm">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <CheckCircle2 className="size-4 text-green-600" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
          প্ল্যান নাও
        </Button>
      </CardContent>
    </Card>
  )
}
