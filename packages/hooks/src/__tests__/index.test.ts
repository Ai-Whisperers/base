import { describe, it, expect } from 'vitest'
import * as hooks from '../index'

describe('hooks', () => {
  it('exports useLocalStorage', () => {
    expect(typeof hooks.useLocalStorage).toBe('function')
  })

  it('exports useWishlist', () => {
    expect(typeof hooks.useWishlist).toBe('function')
  })

  it('exports useRecentlyViewed', () => {
    expect(typeof hooks.useRecentlyViewed).toBe('function')
  })

  it('exports ProductLike type (type-only, verify module shape)', () => {
    expect(hooks).toBeDefined()
    expect(Object.keys(hooks).length).toBeGreaterThanOrEqual(3)
  })
})
