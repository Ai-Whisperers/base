import { describe, it, expect } from 'vitest'
import { requireEnv, optionalEnv, boolEnv, getAppUrl, env } from '../index'

describe('env', () => {
  it('exports requireEnv, optionalEnv, boolEnv, getAppUrl, env', () => {
    expect(typeof requireEnv).toBe('function')
    expect(typeof optionalEnv).toBe('function')
    expect(typeof boolEnv).toBe('function')
    expect(typeof getAppUrl).toBe('function')
    expect(typeof env).toBe('object')
  })

  it('requireEnv throws on missing var', () => {
    expect(() => requireEnv('NONEXISTENT_TEST_VAR_12345')).toThrow('Missing required env var')
  })

  it('requireEnv returns value when set', () => {
    process.env._SMOKE_TEST_VAR = 'hello'
    expect(requireEnv('_SMOKE_TEST_VAR')).toBe('hello')
    delete process.env._SMOKE_TEST_VAR
  })

  it('optionalEnv returns fallback when not set', () => {
    expect(optionalEnv('NONEXISTENT_TEST_VAR_12345', 'fallback')).toBe('fallback')
  })

  it('optionalEnv returns value when set', () => {
    process.env._SMOKE_TEST_VAR = 'val'
    expect(optionalEnv('_SMOKE_TEST_VAR', 'fallback')).toBe('val')
    delete process.env._SMOKE_TEST_VAR
  })

  it('boolEnv returns true for "true" and "1"', () => {
    process.env._BOOL_TEST = 'true'
    expect(boolEnv('_BOOL_TEST')).toBe(true)
    process.env._BOOL_TEST = '1'
    expect(boolEnv('_BOOL_TEST')).toBe(true)
    process.env._BOOL_TEST = 'false'
    expect(boolEnv('_BOOL_TEST')).toBe(false)
    delete process.env._BOOL_TEST
  })

  it('getAppUrl returns a string containing localhost by default', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL
    delete process.env.VERCEL_URL
    const url = getAppUrl()
    expect(url).toContain('localhost')
  })

  it('env object has expected keys', () => {
    const keys = Object.keys(env)
    expect(keys).toContain('supabaseUrl')
    expect(keys).toContain('siteUrl')
    expect(keys).toContain('isDev')
    expect(keys).toContain('isProd')
  })
})
