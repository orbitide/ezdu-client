export type PaymentMethod = "bkash" | "nagad" | "rocket" | "visa" | "mastercard"

export type Enrollment = {
  id: string
  classId: string
  classSlug: string
  classTitle: string
  enrolledAt: string
  type: "purchase" | "subscription" | "free"
  orderId: string | null
}

export type Order = {
  id: string
  invoiceNumber: string
  classId: string | null
  planId: string | null
  classTitle: string
  originalPrice: number
  discountAmount: number
  couponCode: string | null
  totalAmount: number
  paymentMethod: PaymentMethod
  status: "completed" | "failed"
  createdAt: string
}

export type ActiveSubscription = {
  id: string
  planId: string
  planName: string
  classLevel: string
  status: "active" | "expired" | "cancelled"
  startDate: string
  endDate: string
  amount: number
  orderId: string
}

export type Coupon = {
  code: string
  discountType: "percentage" | "fixed"
  value: number
  validForAll: boolean
  validClassIds: string[]
  expiresAt: string
  maxUses: number
}
