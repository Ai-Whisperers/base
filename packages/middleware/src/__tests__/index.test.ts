import { describe, it, expect } from 'vitest'
import { chain, authMiddleware } from '../index'

describe('middleware', () => {
  it('exports chain as a function', () => {
    expect(typeof chain).toBe('function')
  })

  it('exports authMiddleware as a function', () => {
    expect(typeof authMiddleware).toBe('function')
  })

  it('authMiddleware returns a middleware function', () => {
    const mw = authMiddleware()
    expect(typeof mw).toBe('function')
  })

  it('chain returns a function', () => {
    const composed = chain(async (_req, next) => next())
    expect(typeof composed).toBe('function')
  })
})
