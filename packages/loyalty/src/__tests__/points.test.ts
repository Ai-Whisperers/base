import { describe, it, expect } from '@jest/globals'
import { calculatePurchasePoints, calculateTier, applyTierMultiplier, getBenefits } from '../points.js'
import type { LoyaltyConfig } from '../types.js'

const testConfig: LoyaltyConfig = {
  pointsPerCurrency: 100,
  currency: 'Gs',
  signupPoints: 500,
  referralPoints: 200,
  reviewPoints: 100,
  birthdayPoints: 1000,
  tiers: [
    { name: 'Bronce', minPoints: 0, multiplier: 1, benefits: ['Free shipping'] },
    { name: 'Plata', minPoints: 1000, multiplier: 1.2, benefits: ['Free shipping', 'Early access'] },
    { name: 'Oro', minPoints: 5000, multiplier: 1.5, benefits: ['Free shipping', 'Early access', 'Exclusive deals'] },
    { name: 'Platino', minPoints: 20000, multiplier: 2, benefits: ['Free shipping', 'Early access', 'Exclusive deals', 'Dedicated support'] },
  ],
}

describe('Loyalty Points', () => {
  describe('calculatePurchasePoints', () => {
    it('Gs. 100.000 → 1000 points (100 per point)', () => {
      expect(calculatePurchasePoints(100000, testConfig)).toBe(1000)
    })

    it('Gs. 350.000 → 3500 points', () => {
      expect(calculatePurchasePoints(350000, testConfig)).toBe(3500)
    })

    it('Gs. 0 → 0 points', () => {
      expect(calculatePurchasePoints(0, testConfig)).toBe(0)
    })

    it('Gs. 50 → 0 points (floors to 0)', () => {
      expect(calculatePurchasePoints(50, testConfig)).toBe(0)
    })

    it('Gs. 100 → 1 point', () => {
      expect(calculatePurchasePoints(100, testConfig)).toBe(1)
    })

    it('Gs. 1.000.000 → 10000 points', () => {
      expect(calculatePurchasePoints(1000000, testConfig)).toBe(10000)
    })
  })

  describe('calculateTier', () => {
    it('0 points → Bronce', () => {
      const result = calculateTier(0, testConfig)
      expect(result.tier.name).toBe('Bronce')
      expect(result.nextTier?.name).toBe('Plata')
      expect(result.pointsToNext).toBe(1000)
    })

    it('999 points → Bronce', () => {
      const result = calculateTier(999, testConfig)
      expect(result.tier.name).toBe('Bronce')
      expect(result.pointsToNext).toBe(1)
    })

    it('1000 points → Plata', () => {
      const result = calculateTier(1000, testConfig)
      expect(result.tier.name).toBe('Plata')
      expect(result.nextTier?.name).toBe('Oro')
    })

    it('5000 points → Oro', () => {
      const result = calculateTier(5000, testConfig)
      expect(result.tier.name).toBe('Oro')
      expect(result.nextTier?.name).toBe('Platino')
    })

    it('20000 points → Platino (no next tier)', () => {
      const result = calculateTier(20000, testConfig)
      expect(result.tier.name).toBe('Platino')
      expect(result.nextTier).toBeNull()
      expect(result.pointsToNext).toBe(0)
    })

    it('100000 points → Platino', () => {
      const result = calculateTier(100000, testConfig)
      expect(result.tier.name).toBe('Platino')
      expect(result.nextTier).toBeNull()
    })
  })

  describe('applyTierMultiplier', () => {
    it('Bronze multiplier is 1x (no change)', () => {
      expect(applyTierMultiplier(100, testConfig.tiers[0], testConfig)).toBe(100)
    })

    it('Plata multiplier is 1.2x', () => {
      expect(applyTierMultiplier(100, testConfig.tiers[1], testConfig)).toBe(120)
    })

    it('Oro multiplier is 1.5x', () => {
      expect(applyTierMultiplier(100, testConfig.tiers[2], testConfig)).toBe(150)
    })

    it('Platino multiplier is 2x', () => {
      expect(applyTierMultiplier(100, testConfig.tiers[3], testConfig)).toBe(200)
    })

    it('floors fractional results', () => {
      expect(applyTierMultiplier(3, testConfig.tiers[2], testConfig)).toBe(4) // 3 * 1.5 = 4.5 → 4
    })
  })

  describe('getBenefits', () => {
    it('returns benefits array for a tier', () => {
      const benefits = getBenefits(testConfig.tiers[0], testConfig)
      expect(benefits).toEqual(['Free shipping'])
    })

    it('higher tiers have more benefits', () => {
      expect(getBenefits(testConfig.tiers[3], testConfig).length)
        .toBeGreaterThan(getBenefits(testConfig.tiers[0], testConfig).length)
    })
  })
})
