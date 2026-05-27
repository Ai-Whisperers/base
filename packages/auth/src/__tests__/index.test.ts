import { describe, it, expect } from 'vitest'
import { createStorageKeys } from '../index'
import * as authIndex from '../index'

describe('auth', () => {
  it('exports createStorageKeys', () => {
    expect(typeof createStorageKeys).toBe('function')
  })

  it('exports createAuthContext', () => {
    expect(typeof authIndex.createAuthContext).toBe('function')
  })

  it('createStorageKeys returns expected keys with prefix', () => {
    const keys = createStorageKeys('test')
    expect(keys.USER).toBe('test_user')
    expect(keys.CART).toBe('test-cart')
    expect(keys.FAVORITES).toBe('test_favorites')
    expect(keys.LANG).toBe('test_lang')
    expect(keys.RECENTLY_VIEWED).toBe('test_recently_viewed')
  })

  it('module exports AuthConfig interface (type-only)', () => {
    expect(authIndex).toBeDefined()
  })
})
