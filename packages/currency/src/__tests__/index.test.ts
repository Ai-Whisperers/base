import { describe, it, expect } from 'vitest'
import { formatPYG, formatPrice, parseLocalNumber } from '../index'

describe('currency', () => {
  it('exports formatPYG, formatPrice, parseLocalNumber', () => {
    expect(typeof formatPYG).toBe('function')
    expect(typeof formatPrice).toBe('function')
    expect(typeof parseLocalNumber).toBe('function')
  })

  it('formatPYG formats positive integer amounts', () => {
    const result = formatPYG(50000)
    expect(result).toContain('Gs.')
    expect(result).toContain('50.000')
  })

  it('formatPYG rounds decimals', () => {
    const result = formatPYG(1234.56)
    expect(result).toContain('Gs.')
    expect(result).toContain('1.235')
  })

  it('formatPrice defaults to PYG', () => {
    expect(formatPrice(10000)).toContain('Gs.')
  })

  it('formatPrice formats USD with two decimals', () => {
    const result = formatPrice(42.5, 'USD')
    expect(result).toBe('USD 42.50')
  })

  it('parseLocalNumber strips non-numeric chars', () => {
    expect(parseLocalNumber('Gs. 10.000')).toBe(10000)
    expect(parseLocalNumber('USD 25,50')).toBe(25.5)
  })
})
