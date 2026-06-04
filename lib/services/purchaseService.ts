import type { Enrollment, Order, ActiveSubscription, PaymentMethod, Coupon } from "@/lib/types/purchase"
import {
  getEnrollments, saveEnrollments,
  getSubscriptions, saveSubscriptions,
  getPurchaseHistory, savePurchaseHistory,
  getSavedCourses, saveSavedCourses,
  getInvoiceCounter, saveInvoiceCounter,
} from "@/lib/storage"
import { COUPONS, PAYMENT_SUCCESS_RATE, PLAN_LEVEL_MAP } from "@/lib/mock/purchaseData"

// ─── Queries ─────────────────────────────────────────────────────────────────

export function isEnrolled(classId: string): boolean {
  return getEnrollments().some(e => e.classId === classId)
}

export function hasActiveSubscriptionFor(level: string): boolean {
  const now = new Date().toISOString()
  return getSubscriptions().some(
    s => s.status === "active" && s.endDate > now && s.classLevel === level
  )
}

export function getEnrolledClassIds(): string[] {
  const enrollments = getEnrollments()
  return enrollments.map(e => e.classId)
}

// ─── Invoice counter ──────────────────────────────────────────────────────────

export function generateInvoiceNumber(): string {
  const counter = (getInvoiceCounter() ?? 0) + 1
  saveInvoiceCounter(counter)
  const year = new Date().getFullYear()
  return `INV-${year}-${String(counter).padStart(6, "0")}`
}

// ─── Coupon ───────────────────────────────────────────────────────────────────

export function applyCoupon(code: string, classId: string): Coupon | null {
  const normalized = code.trim().toUpperCase()
  const coupon = COUPONS.find(c => c.code === normalized)
  if (!coupon) return null
  if (new Date(coupon.expiresAt) < new Date()) return null
  if (!coupon.validForAll && !coupon.validClassIds.includes(classId)) return null
  return coupon
}

export function calculateDiscount(price: number, coupon: Coupon | null): number {
  if (!coupon) return 0
  if (coupon.discountType === "percentage") return Math.round(price * coupon.value / 100)
  return Math.min(coupon.value, price)
}

// ─── Payment simulation ───────────────────────────────────────────────────────

export function simulatePayment(): Promise<"success" | "failed"> {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve(Math.random() < PAYMENT_SUCCESS_RATE ? "success" : "failed")
    }, 1500)
  )
}

// ─── Course purchase ──────────────────────────────────────────────────────────

export function createCourseOrder(params: {
  classId: string
  classTitle: string
  originalPrice: number
  couponCode: string | null
  discountAmount: number
  paymentMethod: PaymentMethod
  status: "completed" | "failed"
}): Order {
  const order: Order = {
    id: `ord-${Date.now()}`,
    invoiceNumber: generateInvoiceNumber(),
    classId: params.classId,
    planId: null,
    classTitle: params.classTitle,
    originalPrice: params.originalPrice,
    discountAmount: params.discountAmount,
    couponCode: params.couponCode,
    totalAmount: params.originalPrice - params.discountAmount,
    paymentMethod: params.paymentMethod,
    status: params.status,
    createdAt: new Date().toISOString(),
  }
  const history = getPurchaseHistory()
  savePurchaseHistory([...history, order])
  return order
}

export function enrollFromOrder(order: Order, classSlug: string): Enrollment {
  const enrollment: Enrollment = {
    id: `enr-${Date.now()}`,
    classId: order.classId!,
    classSlug,
    classTitle: order.classTitle,
    enrolledAt: new Date().toISOString(),
    type: "purchase",
    orderId: order.id,
  }
  const enrollments = getEnrollments()
  saveEnrollments([...enrollments, enrollment])
  return enrollment
}

// ─── Free enrollment ──────────────────────────────────────────────────────────

export function enrollFree(classId: string, classSlug: string, classTitle: string): Enrollment {
  if (isEnrolled(classId)) return getEnrollments().find(e => e.classId === classId)!
  const enrollment: Enrollment = {
    id: `enr-${Date.now()}`,
    classId,
    classSlug,
    classTitle,
    enrolledAt: new Date().toISOString(),
    type: "free",
    orderId: null,
  }
  const enrollments = getEnrollments()
  saveEnrollments([...enrollments, enrollment])
  return enrollment
}

// ─── Subscription ─────────────────────────────────────────────────────────────

export function createSubscriptionOrder(params: {
  planId: string
  planName: string
  originalPrice: number
  couponCode: string | null
  discountAmount: number
  paymentMethod: PaymentMethod
  status: "completed" | "failed"
  period: "monthly" | "yearly"
}): Order {
  const order: Order = {
    id: `ord-${Date.now()}`,
    invoiceNumber: generateInvoiceNumber(),
    classId: null,
    planId: params.planId,
    classTitle: params.planName,
    originalPrice: params.originalPrice,
    discountAmount: params.discountAmount,
    couponCode: params.couponCode,
    totalAmount: params.originalPrice - params.discountAmount,
    paymentMethod: params.paymentMethod,
    status: params.status,
    createdAt: new Date().toISOString(),
  }
  const history = getPurchaseHistory()
  savePurchaseHistory([...history, order])
  return order
}

export function activateSubscription(order: Order, params: {
  planName: string
  period: "monthly" | "yearly"
}): ActiveSubscription[] {
  const levels = PLAN_LEVEL_MAP[order.planId ?? ""] ?? []
  const startDate = new Date().toISOString()
  const endDate = new Date(
    Date.now() + (params.period === "yearly" ? 365 : 30) * 24 * 60 * 60 * 1000
  ).toISOString()

  const existing = getSubscriptions()
  const newSubs: ActiveSubscription[] = levels.map(level => ({
    id: `sub-${Date.now()}-${level}`,
    planId: order.planId!,
    planName: params.planName,
    classLevel: level,
    status: "active",
    startDate,
    endDate,
    amount: order.totalAmount,
    orderId: order.id,
  }))

  saveSubscriptions([...existing, ...newSubs])
  return newSubs
}

// ─── Saved courses ────────────────────────────────────────────────────────────

export function toggleSaved(classId: string): void {
  const saved = getSavedCourses()
  if (saved.includes(classId)) {
    saveSavedCourses(saved.filter(id => id !== classId))
  } else {
    saveSavedCourses([...saved, classId])
  }
}
