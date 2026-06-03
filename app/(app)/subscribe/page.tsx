"use client"

import { useState } from "react"
import Link from "next/link"
import { plans } from "@/lib/mock/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, CreditCard, Smartphone, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SubscribePage() {
  const [selected, setSelected] = useState<typeof plans[0] | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bkash">("card")
  const [step, setStep] = useState<"select" | "checkout" | "success">("select")

  if (step === "success") {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-5">
        <div className="h-16 w-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold">সাবস্ক্রিপশন সফল!</h1>
        <p className="text-muted-foreground">পেমেন্ট সম্পন্ন। এখন সম্পূর্ণ কোর্স অ্যাক্সেস করুন।</p>
        <Card>
          <CardContent className="p-4 space-y-2 text-sm text-left">
            <div className="flex justify-between"><span className="text-muted-foreground">প্ল্যান</span><span className="font-medium">{selected?.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">পরিমাণ</span><span className="font-medium">৳{selected?.price.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">পেমেন্ট</span><span className="font-medium">{paymentMethod === "card" ? "কার্ড" : "bKash"}</span></div>
          </CardContent>
        </Card>
        <div className="flex gap-3 justify-center">
          <Link href="/subscribe/my-plans"><Button variant="outline">My Plans</Button></Link>
          <Link href="/dashboard"><Button>Dashboard</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Subscribe</h1>
        <p className="text-muted-foreground text-sm mt-1">পছন্দের কোর্স সাবস্ক্রাইব করুন</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {plans.map(plan => (
          <Card key={plan.id} className={cn("relative cursor-pointer transition-all hover:shadow-lg", selected?.id === plan.id && "border-primary ring-2 ring-primary/20", plan.popular && "border-primary/50")} onClick={() => setSelected(plan)}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary px-3">সবচেয়ে জনপ্রিয়</Badge>
              </div>
            )}
            <CardHeader className="pb-3 pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">{plan.class}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">৳{plan.price.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">/{plan.period === "monthly" ? "মাস" : "বছর"}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Separator />
              <ul className="space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={selected?.id === plan.id ? "default" : "outline"}
                onClick={e => { e.stopPropagation(); setSelected(plan); setStep("checkout") }}>
                {selected?.id === plan.id ? "নির্বাচিত — চালিয়ে যান" : "এই প্ল্যান নিন"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Link href="/subscribe/my-plans">
        <Button variant="link" className="text-muted-foreground">আমার সক্রিয় প্ল্যান দেখুন →</Button>
      </Link>

      <Dialog open={step === "checkout"} onOpenChange={() => setStep("select")}>
        {selected && (
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Checkout</DialogTitle>
              <DialogDescription>পেমেন্ট পদ্ধতি নির্বাচন করুন</DialogDescription>
            </DialogHeader>
            <div className="space-y-5">
              <Card>
                <CardContent className="p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">প্ল্যান</span><span className="font-medium">{selected.name}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">মেয়াদ</span><span>{selected.period === "monthly" ? "১ মাস" : "১ বছর"}</span></div>
                  <Separator />
                  <div className="flex justify-between font-semibold"><span>মোট</span><span>৳{selected.price.toLocaleString()}</span></div>
                </CardContent>
              </Card>

              <RadioGroup value={paymentMethod} onValueChange={(v: "card" | "bkash") => setPaymentMethod(v)} className="space-y-2">
                {[
                  { value: "card", label: "ডেবিট/ক্রেডিট কার্ড (SSLCommerz)", icon: CreditCard, color: "text-blue-600" },
                  { value: "bkash", label: "bKash", icon: Smartphone, color: "text-pink-600" },
                ].map(({ value, label, icon: Icon, color }) => (
                  <div key={value} className={cn("flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors", paymentMethod === value && "border-primary bg-primary/5")}>
                    <RadioGroupItem value={value} id={value} />
                    <Label htmlFor={value} className="flex items-center gap-2 cursor-pointer font-normal flex-1">
                      <Icon className={cn("h-4 w-4", color)} />{label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>আপনার পেমেন্ট তথ্য সম্পূর্ণ সুরক্ষিত।</AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setStep("select")}>ফিরে যান</Button>
                <Button className="flex-1" onClick={() => setStep("success")}>৳{selected.price.toLocaleString()} পেমেন্ট করুন</Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
