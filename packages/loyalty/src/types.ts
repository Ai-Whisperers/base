export interface LoyaltyTier {
  name: string
  minPoints: number
  multiplier: number
  benefits: string[]
}

export interface LoyaltyConfig {
  pointsPerCurrency: number
  currency: string
  signupPoints: number
  referralPoints: number
  reviewPoints: number
  birthdayPoints: number
  tiers: LoyaltyTier[]
}

export type PointTransactionType = 'earn' | 'redeem' | 'expire' | 'bonus'

export interface PointTransaction {
  id: string
  type: PointTransactionType
  amount: number
  description: string
  createdAt: string
  expiresAt?: string
}

export interface CustomerPoints {
  customerId: string
  total: number
  currentTier: LoyaltyTier
  nextTier: LoyaltyTier | null
  pointsToNextTier: number
  history: PointTransaction[]
}

export interface TierResult {
  tier: LoyaltyTier
  nextTier: LoyaltyTier | null
  pointsToNext: number
}
