import { describe, it, expect } from 'vitest'
import { logger } from '../index'

describe('logger', () => {
  it('exports logger object', () => {
    expect(typeof logger).toBe('object')
  })

  it('has debug, info, warn, error methods', () => {
    expect(typeof logger.debug).toBe('function')
    expect(typeof logger.info).toBe('function')
    expect(typeof logger.warn).toBe('function')
    expect(typeof logger.error).toBe('function')
  })

  it('debug does not throw', () => {
    expect(() => logger.debug('test message')).not.toThrow()
  })

  it('info does not throw', () => {
    expect(() => logger.info('test message')).not.toThrow()
  })

  it('warn does not throw', () => {
    expect(() => logger.warn('test message')).not.toThrow()
  })

  it('error does not throw', () => {
    expect(() => logger.error('test message')).not.toThrow()
  })

  it('accepts meta object without throwing', () => {
    expect(() => logger.info('msg', { foo: 'bar' })).not.toThrow()
  })
})
