import type { B2BTier, B2BPrice, B2BOrderItem, B2BOrderTotal } from './types.js'

export const TIER_DISCOUNTS: Record<B2BTier, number> = {
  bronze: 0,
  silver: 0.05,
  gold: 0.10,
  platinum: 0.15,
}

export function calculateB2BPrice(
  basePrice: number,
  tier: B2BTier,
  quantity: number,
  tierPrices: B2BPrice[],
): number {
  const override = tierPrices.find(p => p.tier === tier && (!p.minQuantity || quantity >= p.minQuantity))
  if (override) return override.unitPrice

  const discount = TIER_DISCOUNTS[tier]
  return basePrice * (1 - discount)
}

export function calculateB2BOrderTotal(
  items: B2BOrderItem[],
  tierPrices: B2BPrice[],
): B2BOrderTotal {
  let subtotal = 0
  let discount = 0
  let iva10 = 0
  let iva5 = 0

  for (const item of items) {
    const effectivePrice = calculateB2BPrice(item.unitPrice, item.tier, item.quantity, tierPrices)
    const lineTotal = effectivePrice * item.quantity
    subtotal += item.unitPrice * item.quantity
    discount += (item.unitPrice - effectivePrice) * item.quantity

    if (item.ivaType === '10') iva10 += lineTotal * 0.10
    else if (item.ivaType === '5') iva5 += lineTotal * 0.05
  }

  const total = subtotal - discount + iva10 + iva5

  return { subtotal, discount, iva10, iva5, total }
}
