import { describe, it, expect } from 'vitest'
import { rateLimit, rateLimitMiddleware } from '../index'

describe('rate-limit', () => {
  it('exports rateLimit and rateLimitMiddleware', () => {
    expect(typeof rateLimit).toBe('function')
    expect(typeof rateLimitMiddleware).toBe('function')
  })

  it('allows first request', () => {
    const result = rateLimit('smoke-test-key', { maxRequests: 2, windowMs: 60000 })
    expect(result.allowed).toBe(true)
    expect(result.remaining).toBe(1)
  })

  it('blocks after exceeding max', () => {
    const key = `smoke-block-${Date.now()}`
    rateLimit(key, { maxRequests: 1, windowMs: 60000 })
    const result = rateLimit(key, { maxRequests: 1, windowMs: 60000 })
    expect(result.allowed).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('rateLimitMiddleware returns a function', () => {
    const mw = rateLimitMiddleware()
    expect(typeof mw).toBe('function')
  })
})
