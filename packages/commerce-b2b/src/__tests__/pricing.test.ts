import { describe, it, expect } from '@jest/globals'
import { TIER_DISCOUNTS, calculateB2BPrice, calculateB2BOrderTotal } from '../pricing.js'
import type { B2BPrice, B2BOrderItem } from '../types.js'

describe('B2B Pricing', () => {
  describe('TIER_DISCOUNTS', () => {
    it('bronze has 0% discount', () => {
      expect(TIER_DISCOUNTS.bronze).toBe(0)
    })

    it('silver has 5% discount', () => {
      expect(TIER_DISCOUNTS.silver).toBe(0.05)
    })

    it('gold has 10% discount', () => {
      expect(TIER_DISCOUNTS.gold).toBe(0.10)
    })

    it('platinum has 15% discount', () => {
      expect(TIER_DISCOUNTS.platinum).toBe(0.15)
    })

    it('discounts increase with tier', () => {
      expect(TIER_DISCOUNTS.bronze).toBeLessThan(TIER_DISCOUNTS.silver)
      expect(TIER_DISCOUNTS.silver).toBeLessThan(TIER_DISCOUNTS.gold)
      expect(TIER_DISCOUNTS.gold).toBeLessThan(TIER_DISCOUNTS.platinum)
    })
  })

  describe('calculateB2BPrice', () => {
    const basePrice = 100000
    const emptyOverrides: B2BPrice[] = []

    it('returns base price for bronze', () => {
      expect(calculateB2BPrice(basePrice, 'bronze', 1, emptyOverrides)).toBe(100000)
    })

    it('applies 5% discount for silver', () => {
      expect(calculateB2BPrice(basePrice, 'silver', 1, emptyOverrides)).toBe(95000)
    })

    it('applies 10% discount for gold', () => {
      expect(calculateB2BPrice(basePrice, 'gold', 1, emptyOverrides)).toBe(90000)
    })

    it('applies 15% discount for platinum', () => {
      expect(calculateB2BPrice(basePrice, 'platinum', 1, emptyOverrides)).toBe(85000)
    })

    it('uses price override when provided', () => {
      const overrides: B2BPrice[] = [
        { productId: 'p1', tier: 'gold', unitPrice: 80000 },
      ]
      expect(calculateB2BPrice(basePrice, 'gold', 1, overrides)).toBe(80000)
    })

    it('uses override with minQuantity when quantity sufficient', () => {
      const overrides: B2BPrice[] = [
        { productId: 'p1', tier: 'platinum', unitPrice: 70000, minQuantity: 10 },
      ]
      expect(calculateB2BPrice(basePrice, 'platinum', 10, overrides)).toBe(70000)
    })

    it('ignores override when quantity below minQuantity', () => {
      const overrides: B2BPrice[] = [
        { productId: 'p1', tier: 'platinum', unitPrice: 70000, minQuantity: 10 },
      ]
      expect(calculateB2BPrice(basePrice, 'platinum', 5, overrides)).toBe(85000)
    })

    it('handles zero base price', () => {
      expect(calculateB2BPrice(0, 'gold', 1, emptyOverrides)).toBe(0)
    })
  })

  describe('calculateB2BOrderTotal', () => {
    const tierPrices: B2BPrice[] = []

    it('calculates subtotal, discount, and total for single item', () => {
      const items: B2BOrderItem[] = [
        { productId: 'p1', quantity: 2, unitPrice: 100000, tier: 'gold', ivaType: '10' },
      ]
      const result = calculateB2BOrderTotal(items, tierPrices)
      expect(result.subtotal).toBe(200000)
      expect(result.discount).toBe(20000) // 10% of 200000
      expect(result.iva10).toBe(18000)    // 10% of discounted price (180000)
      expect(result.iva5).toBe(0)
      expect(result.total).toBe(198000)   // 180000 + 18000
    })

    it('calculates IVA 5% correctly', () => {
      const items: B2BOrderItem[] = [
        { productId: 'p1', quantity: 1, unitPrice: 100000, tier: 'bronze', ivaType: '5' },
      ]
      const result = calculateB2BOrderTotal(items, tierPrices)
      expect(result.iva5).toBe(5000)
      expect(result.total).toBe(105000)
    })

    it('handles mixed IVA types', () => {
      const items: B2BOrderItem[] = [
        { productId: 'p1', quantity: 1, unitPrice: 100000, tier: 'bronze', ivaType: '10' },
        { productId: 'p2', quantity: 2, unitPrice: 50000, tier: 'bronze', ivaType: '5' },
      ]
      const result = calculateB2BOrderTotal(items, tierPrices)
      expect(result.subtotal).toBe(200000)
      expect(result.iva10).toBe(10000)
      expect(result.iva5).toBe(5000)
      expect(result.total).toBe(215000)
    })

    it('applies tier discount across multiple items', () => {
      const items: B2BOrderItem[] = [
        { productId: 'p1', quantity: 3, unitPrice: 100000, tier: 'silver', ivaType: '10' },
        { productId: 'p2', quantity: 1, unitPrice: 200000, tier: 'silver', ivaType: '10' },
      ]
      const result = calculateB2BOrderTotal(items, tierPrices)
      expect(result.discount).toBe(25000) // 5% of 500000
      expect(result.total).toBe(522500)   // 475000 + 47500
    })

    it('handles empty items array', () => {
      const result = calculateB2BOrderTotal([], tierPrices)
      expect(result.subtotal).toBe(0)
      expect(result.discount).toBe(0)
      expect(result.iva10).toBe(0)
      expect(result.iva5).toBe(0)
      expect(result.total).toBe(0)
    })
  })
})
