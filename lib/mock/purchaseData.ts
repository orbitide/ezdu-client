import type { Coupon } from "@/lib/types/purchase"

export const COUPONS: Coupon[] = [
  {
    code: "WELCOME10",
    discountType: "percentage",
    value: 10,
    validForAll: true,
    validClassIds: [],
    expiresAt: "2027-12-31T23:59:59Z",
    maxUses: 1000,
  },
  {
    code: "FIRST50",
    discountType: "fixed",
    value: 50,
    validForAll: true,
    validClassIds: [],
    expiresAt: "2027-12-31T23:59:59Z",
    maxUses: 1000,
  },
  {
    code: "SSC2026",
    discountType: "percentage",
    value: 20,
    validForAll: false,
    validClassIds: ["ssc-science-2025", "ssc-humanities-2025"],
    expiresAt: "2027-12-31T23:59:59Z",
    maxUses: 500,
  },
  {
    code: "EZDU25",
    discountType: "percentage",
    value: 25,
    validForAll: true,
    validClassIds: [],
    expiresAt: "2027-12-31T23:59:59Z",
    maxUses: 500,
  },
]

export const PAYMENT_SUCCESS_RATE = 0.9

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  bkash: "bKash",
  nagad: "Nagad",
  rocket: "Rocket",
  visa: "Visa",
  mastercard: "Mastercard",
}

export const PAYMENT_METHOD_DUMMY_INFO: Record<string, string> = {
  bkash: "01712-345678 (ব্যক্তিগত)",
  nagad: "01812-567890 (ব্যক্তিগত)",
  rocket: "01912-678901 (ব্যক্তিগত)",
  visa: "**** **** **** 4242",
  mastercard: "**** **** **** 5555",
}

// Plan-to-class level mapping for subscription entitlements
export const PLAN_LEVEL_MAP: Record<string, string[]> = {
  "pln-001": ["SSC"],
  "pln-002": ["HSC"],
  "pln-003": ["SSC"],
  "pln-004": ["Admission"],
}
