import type { LoyaltyConfig, LoyaltyTier, TierResult } from './types.js'

export function calculatePurchasePoints(amount: number, config: LoyaltyConfig): number {
  return Math.floor(amount / config.pointsPerCurrency)
}

export function calculateTier(points: number, config: LoyaltyConfig): TierResult {
  const sorted = [...config.tiers].sort((a, b) => b.minPoints - a.minPoints)
  const tier = sorted.find(t => points >= t.minPoints) ?? config.tiers[0]

  const nextTier = [...config.tiers]
    .sort((a, b) => a.minPoints - b.minPoints)
    .find(t => t.minPoints > points) ?? null

  const pointsToNext = nextTier ? nextTier.minPoints - points : 0

  return { tier, nextTier, pointsToNext }
}

export function applyTierMultiplier(points: number, tier: LoyaltyTier, _config: LoyaltyConfig): number {
  return Math.floor(points * tier.multiplier)
}

export function getBenefits(tier: LoyaltyTier, _config: LoyaltyConfig): string[] {
  return tier.benefits
}
