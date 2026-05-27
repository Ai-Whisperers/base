import { describe, it, expect } from 'vitest'
import { trackEvent, trackViewItem, trackAddToCart, trackPurchase } from '../index'

describe('analytics', () => {
  it('exports trackEvent as a function', () => {
    expect(typeof trackEvent).toBe('function')
  })

  it('exports trackViewItem as a function', () => {
    expect(typeof trackViewItem).toBe('function')
  })

  it('exports trackAddToCart as a function', () => {
    expect(typeof trackAddToCart).toBe('function')
  })

  it('exports trackPurchase as a function', () => {
    expect(typeof trackPurchase).toBe('function')
  })

  it('trackEvent does not throw when gtag is absent', () => {
    expect(() => trackEvent({ action: 'test' })).not.toThrow()
  })

  it('trackViewItem does not throw', () => {
    expect(() => trackViewItem({ id: '1', name: 'Test' })).not.toThrow()
  })

  it('trackAddToCart does not throw', () => {
    expect(() => trackAddToCart({ id: '1', name: 'Test', price: 5000 })).not.toThrow()
  })

  it('trackPurchase does not throw', () => {
    expect(() => trackPurchase({ id: 'ORD-1', total: 10000, items: [] })).not.toThrow()
  })
})
