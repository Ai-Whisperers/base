import type { LoyaltyConfig } from './types.js'

export function generateReferralCode(customerId: string): string {
  const prefix = 'REF'
  const suffix = customerId.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase()
  return `${prefix}-${suffix}`
}

export function calculateReferralBonus(referralAmount: number, config: LoyaltyConfig): number {
  return Math.floor(referralAmount * (config.referralPoints / 100))
}

export function getBirthdayBonus(config: LoyaltyConfig): number {
  return config.birthdayPoints
}
