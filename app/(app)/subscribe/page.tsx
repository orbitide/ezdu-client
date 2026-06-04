"use client"

import { useState } from "react"
import Link from "next/link"
import { plans } from "@/lib/mock/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle2, CreditCard, Smartphone, Shield, Loader2,
  XCircle, Tag, RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { PaymentMethod } from "@/lib/types/purchase"
import {
  applyCoupon, calculateDiscount,
  createSubscriptionOrder, activateSubscription,
  simulatePayment,
} from "@/lib/services/purchaseService"
import { usePurchaseStore } from "@/lib/stores/purchaseStore"

type DialogStep = "checkout" | "processing" | "success" | "failed"

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; color: string }[] = [
  { value: "bkash", label: "bKash", color: "text-pink-600" },
  { value: "nagad", label: "Nagad", color: "text-orange-500" },
  { value: "rocket", label: "Rocket", color: "text-purple-600" },
  { value: "visa", label: "Visa / Debit", color: "text-blue-600" },
  { value: "mastercard", label: "Mastercard", color: "text-red-600" },
]

export default function SubscribePage() {
  const [selected, setSelected] = useState<typeof plans[0] | null>(null)
  const [dialogStep, setDialogStep] = useState<DialogStep>("checkout")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bkash")
  const [couponCode, setCouponCode] = useState("")
  const [couponError, setCouponError] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<ReturnType<typeof applyCoupon>>(null)
  const [invoiceNumber, setInvoiceNumber] = useState("")

  const { addSubscriptions, addOrder } = usePurchaseStore()

  function openCheckout(plan: typeof plans[0]) {
    setSelected(plan)
    setDialogStep("checkout")
    setCouponCode("")
    setCouponError("")
    setAppliedCoupon(null)
    setDialogOpen(true)
  }

  function handleApplyCoupon() {
    if (!selected) return
    const coupon = applyCoupon(couponCode, selected.id)
    if (!coupon) {
      setCouponError("কুপন কোডটি বৈধ নয়")
      setAppliedCoupon(null)
    } else {
      setCouponError("")
      setAppliedCoupon(coupon)
    }
  }

  async function handlePay() {
    if (!selected) return
    setDialogStep("processing")
    const result = await simulatePayment()

    const discount = calculateDiscount(selected.price, appliedCoupon)
    const order = createSubscriptionOrder({
      planId: selected.id,
      planName: selected.name,
      originalPrice: selected.price,
      couponCode: appliedCoupon?.code ?? null,
      discountAmount: discount,
      paymentMethod,
      status: result === "success" ? "completed" : "failed",
      period: selected.period,
    })

    addOrder(order)

    if (result === "success") {
      const newSubs = activateSubscription(order, { planName: selected.name, period: selected.period })
      addSubscriptions(newSubs)
      setInvoiceNumber(order.invoiceNumber)
      setDialogStep("success")
    } else {
      setDialogStep("failed")
    }
  }

  const discount = selected ? calculateDiscount(selected.price, appliedCoupon) : 0
  const total = selected ? selected.price - discount : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">সাবস্ক্রাইব করুন</h1>
        <p className="text-muted-foreground text-sm mt-1">পছন্দের কোর্স সাবস্ক্রাইব করুন</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {plans.map(plan => (
          <Card
            key={plan.id}
            className={cn(
              "relative cursor-pointer transition-all hover:shadow-lg",
              selected?.id === plan.id && "border-primary ring-2 ring-primary/20",
              plan.popular && "border-primary/50"
            )}
            onClick={() => setSelected(plan)}
          >
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
              <Button
                className="w-full"
                variant={selected?.id === plan.id ? "default" : "outline"}
                onClick={e => { e.stopPropagation(); openCheckout(plan) }}
              >
                {selected?.id === plan.id ? "নির্বাচিত — চালিয়ে যান" : "এই প্ল্যান নিন"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Link href="/subscribe/my-plans">
        <Button variant="link" className="text-muted-foreground">আমার সক্রিয় প্ল্যান দেখুন →</Button>
      </Link>

      <Dialog open={dialogOpen} onOpenChange={v => { if (!v && dialogStep !== "processing") setDialogOpen(false) }}>
        {selected && (
          <DialogContent className="max-w-md">

            {/* Checkout step */}
            {dialogStep === "checkout" && (
              <>
                <DialogHeader>
                  <DialogTitle>চেকআউট</DialogTitle>
                  <DialogDescription>পেমেন্ট পদ্ধতি নির্বাচন করুন</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">প্ল্যান</span>
                        <span className="font-medium">{selected.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">মেয়াদ</span>
                        <span>{selected.period === "monthly" ? "১ মাস" : "১ বছর"}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>ছাড়</span>
                          <span>-৳{discount.toLocaleString()}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>মোট</span>
                        <span>৳{total.toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Coupon */}
                  <div className="space-y-2">
                    <Label className="text-xs flex items-center gap-1"><Tag className="h-3 w-3" /> কুপন কোড</Label>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between rounded-md border border-green-500 bg-green-50 dark:bg-green-950/20 px-3 py-1.5">
                        <p className="text-xs font-semibold text-green-700 dark:text-green-400">{appliedCoupon.code} — {appliedCoupon.discountType === "percentage" ? `${appliedCoupon.value}% ছাড়` : `৳${appliedCoupon.value} ছাড়`}</p>
                        <button onClick={() => { setAppliedCoupon(null); setCouponCode("") }} className="text-muted-foreground hover:text-foreground"><XCircle className="h-3.5 w-3.5" /></button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input placeholder="WELCOME10" value={couponCode} onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponError("") }} className="h-8 text-xs uppercase" />
                        <Button variant="outline" size="sm" onClick={handleApplyCoupon} disabled={!couponCode.trim()}>প্রয়োগ</Button>
                      </div>
                    )}
                    {couponError && <p className="text-xs text-destructive">{couponError}</p>}
                  </div>

                  {/* Payment methods */}
                  <div className="space-y-2">
                    {PAYMENT_OPTIONS.map(({ value, label, color }) => (
                      <button
                        key={value}
                        onClick={() => setPaymentMethod(value)}
                        className={cn(
                          "w-full flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition-colors text-left",
                          paymentMethod === value && "border-primary bg-primary/5"
                        )}
                      >
                        <div className={cn("h-6 w-6 flex items-center justify-center shrink-0", color)}>
                          {["bkash","nagad","rocket"].includes(value) ? <Smartphone className="h-4 w-4" /> : <CreditCard className="h-4 w-4" />}
                        </div>
                        <span className={cn("flex-1 text-sm font-medium", color)}>{label}</span>
                        <div className={cn("h-4 w-4 rounded-full border-2", paymentMethod === value ? "border-primary bg-primary" : "border-muted-foreground")} />
                      </button>
                    ))}
                  </div>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription className="text-xs">আপনার পেমেন্ট তথ্য সম্পূর্ণ সুরক্ষিত।</AlertDescription>
                  </Alert>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>বাতিল</Button>
                    <Button className="flex-1" onClick={handlePay}>৳{total.toLocaleString()} পেমেন্ট করুন</Button>
                  </div>
                </div>
              </>
            )}

            {/* Processing */}
            {dialogStep === "processing" && (
              <div className="py-8 text-center space-y-3">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                <p className="font-semibold">পেমেন্ট প্রক্রিয়া হচ্ছে...</p>
                <p className="text-xs text-muted-foreground">অনুগ্রহ করে অপেক্ষা করুন।</p>
              </div>
            )}

            {/* Success */}
            {dialogStep === "success" && (
              <div className="py-4 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">সাবস্ক্রিপশন সফল!</h2>
                  <p className="text-sm text-muted-foreground mt-1">এখন সম্পূর্ণ কোর্স অ্যাক্সেস করুন।</p>
                </div>
                <Card>
                  <CardContent className="p-4 space-y-2 text-sm text-left">
                    <div className="flex justify-between"><span className="text-muted-foreground">প্ল্যান</span><span className="font-medium">{selected?.name}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">ইনভয়েস</span><span className="font-mono text-xs">{invoiceNumber}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">পরিমাণ</span><span className="font-medium">৳{total.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">পেমেন্ট</span><span className="font-medium">{PAYMENT_OPTIONS.find(p => p.value === paymentMethod)?.label}</span></div>
                  </CardContent>
                </Card>
                <div className="flex gap-3 justify-center">
                  <Link href="/subscribe/my-plans" onClick={() => setDialogOpen(false)}><Button variant="outline">My Plans</Button></Link>
                  <Link href="/learn" onClick={() => setDialogOpen(false)}><Button>হোম</Button></Link>
                </div>
              </div>
            )}

            {/* Failed */}
            {dialogStep === "failed" && (
              <div className="py-4 text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <XCircle className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">পেমেন্ট ব্যর্থ</h2>
                  <p className="text-sm text-muted-foreground mt-1">দুঃখিত, পুনরায় চেষ্টা করুন।</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => { setPaymentMethod("bkash"); setDialogStep("checkout") }}>অন্য পদ্ধতি</Button>
                  <Button onClick={() => setDialogStep("checkout")}>
                    <RefreshCw className="h-4 w-4 mr-1.5" />
                    আবার চেষ্টা
                  </Button>
                </div>
              </div>
            )}

          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
