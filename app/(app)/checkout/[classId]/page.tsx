"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { classes } from "@/lib/mock/data"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle2, XCircle, Loader2, Tag, Shield,
  ChevronLeft, Play, Smartphone, CreditCard, RefreshCw,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { PaymentMethod } from "@/lib/types/purchase"
import {
  applyCoupon, calculateDiscount,
  createCourseOrder, enrollFromOrder,
  simulatePayment, isEnrolled as checkEnrolled,
} from "@/lib/services/purchaseService"
import { usePurchaseStore } from "@/lib/stores/purchaseStore"

type Step = "review" | "payment" | "confirm" | "processing" | "success" | "failed"

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; color: string; info: string; icon: "mobile" | "card" }[] = [
  { value: "bkash", label: "bKash", color: "text-pink-600", info: "01712-345678", icon: "mobile" },
  { value: "nagad", label: "Nagad", color: "text-orange-500", info: "01812-567890", icon: "mobile" },
  { value: "rocket", label: "Rocket", color: "text-purple-600", info: "01912-678901", icon: "mobile" },
  { value: "visa", label: "Visa / Debit", color: "text-blue-600", info: "**** **** **** 4242", icon: "card" },
  { value: "mastercard", label: "Mastercard", color: "text-red-600", info: "**** **** **** 5555", icon: "card" },
]

export default function CheckoutPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = use(params)
  const router = useRouter()

  const cls = classes.find(c => c.id === classId || c.slug === classId)!
  if (!cls) notFound()

  // All hooks must be declared before any conditional returns
  const { addEnrollment, addOrder } = usePurchaseStore()
  const [step, setStep] = useState<Step>("review")
  const [couponCode, setCouponCode] = useState("")
  const [couponError, setCouponError] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<ReturnType<typeof applyCoupon>>(null)
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("bkash")
  const [completedOrder, setCompletedOrder] = useState<ReturnType<typeof createCourseOrder> | null>(null)

  const enrolled = checkEnrolled(cls.id)

  useEffect(() => {
    if (enrolled) router.replace(`/catalog/classes/${cls.slug}`)
  }, [enrolled, router, cls.slug])

  if (enrolled) return null

  const discount = calculateDiscount(cls.price, appliedCoupon)
  const total = cls.price - discount

  function handleApplyCoupon() {
    const coupon = applyCoupon(couponCode, cls.id)
    if (!coupon) {
      setCouponError("কুপন কোডটি বৈধ নয় বা এই কোর্সে প্রযোজ্য নয়")
      setAppliedCoupon(null)
    } else {
      setCouponError("")
      setAppliedCoupon(coupon)
    }
  }

  function removeCoupon() {
    setAppliedCoupon(null)
    setCouponCode("")
    setCouponError("")
  }

  async function handlePay() {
    setStep("processing")
    const result = await simulatePayment()

    const order = createCourseOrder({
      classId: cls.id,
      classTitle: cls.title,
      originalPrice: cls.price,
      couponCode: appliedCoupon?.code ?? null,
      discountAmount: discount,
      paymentMethod: selectedMethod,
      status: result === "success" ? "completed" : "failed",
    })

    addOrder(order)

    if (result === "success") {
      const enrollment = enrollFromOrder(order, cls.slug)
      addEnrollment(enrollment)
      setCompletedOrder(order)
      setStep("success")
    } else {
      setCompletedOrder(order)
      setStep("failed")
    }
  }

  // ── Success ──────────────────────────────────────────────────────────────────
  if (step === "success" && completedOrder) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-5">
        <div className="h-20 w-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">পেমেন্ট সফল!</h1>
          <p className="text-muted-foreground text-sm mt-1">আপনি সফলভাবে এই কোর্সে ভর্তি হয়েছেন।</p>
        </div>
        <Card>
          <CardContent className="p-4 space-y-2 text-sm text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">কোর্স</span>
              <span className="font-medium line-clamp-1 max-w-[180px] text-right">{cls.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ইনভয়েস</span>
              <span className="font-medium font-mono">{completedOrder.invoiceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">পরিমাণ</span>
              <span className="font-medium">৳{completedOrder.totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">পদ্ধতি</span>
              <span className="font-medium">{PAYMENT_OPTIONS.find(p => p.value === completedOrder.paymentMethod)?.label}</span>
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-3 justify-center">
          <Link href="/learn?tab=purchases">
            <Button variant="outline">রসিদ দেখুন</Button>
          </Link>
          <Link href={`/catalog/classes/${cls.slug}`}>
            <Button>
              <Play className="h-4 w-4 mr-1.5" />
              শেখা শুরু করুন
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // ── Failed ───────────────────────────────────────────────────────────────────
  if (step === "failed") {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-5">
        <div className="h-20 w-20 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
          <XCircle className="h-10 w-10" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">পেমেন্ট ব্যর্থ হয়েছে</h1>
          <p className="text-muted-foreground text-sm mt-1">দুঃখিত, পেমেন্ট প্রক্রিয়া করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।</p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => setStep("payment")}>
            অন্য পদ্ধতি বেছে নিন
          </Button>
          <Button onClick={() => setStep("confirm")}>
            <RefreshCw className="h-4 w-4 mr-1.5" />
            আবার চেষ্টা করুন
          </Button>
        </div>
      </div>
    )
  }

  // ── Processing ───────────────────────────────────────────────────────────────
  if (step === "processing") {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <Loader2 className="h-14 w-14 animate-spin text-primary mx-auto" />
        <h2 className="text-xl font-semibold">পেমেন্ট প্রক্রিয়া হচ্ছে...</h2>
        <p className="text-sm text-muted-foreground">অনুগ্রহ করে অপেক্ষা করুন। পেজটি বন্ধ করবেন না।</p>
      </div>
    )
  }

  // ── Main checkout steps ───────────────────────────────────────────────────────
  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold">চেকআউট</h1>
          <p className="text-sm text-muted-foreground">{cls.title}</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 text-xs">
        {(["review", "payment", "confirm"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            {i > 0 && <div className="h-px w-6 bg-border" />}
            <div className={cn(
              "h-6 w-6 rounded-full flex items-center justify-center font-semibold text-[11px]",
              step === s ? "bg-primary text-primary-foreground"
                : ["review", "payment", "confirm"].indexOf(step) > i
                  ? "bg-green-500 text-white"
                  : "bg-muted text-muted-foreground"
            )}>
              {["review", "payment", "confirm"].indexOf(step) > i ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span className={cn("hidden sm:block", step === s ? "text-foreground font-medium" : "text-muted-foreground")}>
              {s === "review" ? "অর্ডার" : s === "payment" ? "পেমেন্ট" : "নিশ্চিত"}
            </span>
          </div>
        ))}
      </div>

      {/* Step: Review */}
      {step === "review" && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 flex gap-4">
              <div className="h-16 w-24 rounded-lg bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${cls.thumbnail})` }} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold leading-snug line-clamp-2">{cls.title}</p>
                <div className="flex gap-1.5 mt-1">
                  <Badge variant="secondary" className="text-xs">{cls.level}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{cls.subjectCount} বিষয় · {cls.lessonCount ?? "—"} পাঠ</p>
              </div>
            </CardContent>
          </Card>

          {/* Coupon */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" />
              কুপন কোড
            </Label>
            {appliedCoupon ? (
              <div className="flex items-center justify-between rounded-lg border border-green-500 bg-green-50 dark:bg-green-950/20 px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-green-700 dark:text-green-400">{appliedCoupon.code}</p>
                  <p className="text-xs text-green-600 dark:text-green-500">
                    {appliedCoupon.discountType === "percentage"
                      ? `${appliedCoupon.value}% ছাড়`
                      : `৳${appliedCoupon.value} ছাড়`
                    } প্রযোজ্য
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={removeCoupon} className="text-muted-foreground h-7 px-2">
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="WELCOME10"
                  value={couponCode}
                  onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponError("") }}
                  onKeyDown={e => e.key === "Enter" && handleApplyCoupon()}
                  className="uppercase"
                />
                <Button variant="outline" onClick={handleApplyCoupon} disabled={!couponCode.trim()}>প্রয়োগ</Button>
              </div>
            )}
            {couponError && <p className="text-xs text-destructive">{couponError}</p>}
          </div>

          {/* Order summary */}
          <Card>
            <CardContent className="p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">মূল মূল্য</span>
                <span>৳{cls.price.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>ছাড় ({appliedCoupon?.code})</span>
                  <span>-৳{discount.toLocaleString()}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold text-base">
                <span>মোট</span>
                <span>৳{total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" size="lg" onClick={() => setStep("payment")}>
            পেমেন্ট পদ্ধতি বেছে নিন
          </Button>
        </div>
      )}

      {/* Step: Payment method */}
      {step === "payment" && (
        <div className="space-y-4">
          <p className="text-sm font-medium">পেমেন্ট পদ্ধতি নির্বাচন করুন</p>
          <div className="space-y-2">
            {PAYMENT_OPTIONS.map(({ value, label, color, info, icon }) => (
              <button
                key={value}
                onClick={() => setSelectedMethod(value)}
                className={cn(
                  "w-full flex items-center gap-3 border rounded-lg p-3.5 transition-colors text-left",
                  selectedMethod === value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/50"
                )}
              >
                <div className={cn("h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0", color)}>
                  {icon === "mobile"
                    ? <Smartphone className="h-4 w-4" />
                    : <CreditCard className="h-4 w-4" />
                  }
                </div>
                <div className="flex-1">
                  <p className={cn("text-sm font-semibold", color)}>{label}</p>
                  <p className="text-xs text-muted-foreground">{info}</p>
                </div>
                <div className={cn(
                  "h-4 w-4 rounded-full border-2",
                  selectedMethod === value ? "border-primary bg-primary" : "border-muted-foreground"
                )} />
              </button>
            ))}
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription className="text-xs">আপনার পেমেন্ট তথ্য সম্পূর্ণ সুরক্ষিত ও এনক্রিপ্টেড।</AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep("review")}>পিছনে</Button>
            <Button className="flex-1" onClick={() => setStep("confirm")}>পরবর্তী</Button>
          </div>
        </div>
      )}

      {/* Step: Confirm */}
      {step === "confirm" && (
        <div className="space-y-4">
          <p className="text-sm font-medium">অর্ডার নিশ্চিত করুন</p>
          <Card>
            <CardContent className="p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">কোর্স</span>
                <span className="font-medium text-right max-w-[200px] line-clamp-1">{cls.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">পেমেন্ট পদ্ধতি</span>
                <span className="font-medium">{PAYMENT_OPTIONS.find(p => p.value === selectedMethod)?.label}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>কুপন</span>
                  <span>{appliedCoupon.code}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-bold text-base">
                <span>মোট পরিমাণ</span>
                <span>৳{total.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep("payment")}>পিছনে</Button>
            <Button className="flex-1" size="lg" onClick={handlePay}>
              ৳{total.toLocaleString()} পেমেন্ট করুন
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
