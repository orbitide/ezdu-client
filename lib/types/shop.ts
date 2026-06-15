export interface CoinBundle {
  id: string
  coins: number
  price: number
  bonus?: string
  popular?: boolean
}

export interface PremiumPlan {
  id: string
  title: string
  price: number
  period: string
  months: number
  features: string[]
  highlighted?: boolean
  badge?: string
}
