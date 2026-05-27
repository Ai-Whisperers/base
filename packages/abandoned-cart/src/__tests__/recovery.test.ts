import { describe, it, expect } from '@jest/globals'
import { shouldSendReminder, getReminderMessage, calculateRecoveryRate, getRecoveryScore } from '../recovery.js'
import type { AbandonedCart, RecoveryConfig } from '../types.js'

const defaultConfig: RecoveryConfig = {
  maxReminders: 2,
  reminderIntervalHours: 1,
  whatsappEnabled: true,
  emailEnabled: false,
}

const baseCart: AbandonedCart = {
  id: 'cart-1',
  customerPhone: '595981111111',
  items: [{ productId: 'p1', name: 'Carpa 4 Personas', quantity: 1, price: 350000 }],
  total: 350000,
  createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  updatedAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  remindersSent: 0,
  recovered: false,
}

describe('Abandoned Cart Recovery', () => {
  describe('shouldSendReminder', () => {
    it('sends first reminder when never reminded and past interval', () => {
      expect(shouldSendReminder(baseCart, defaultConfig)).toBe(true)
    })

    it('does not send if cart is recovered', () => {
      const cart = { ...baseCart, recovered: true }
      expect(shouldSendReminder(cart, defaultConfig)).toBe(false)
    })

    it('does not send if max reminders reached', () => {
      const cart = { ...baseCart, remindersSent: 2 }
      expect(shouldSendReminder(cart, defaultConfig)).toBe(false)
    })

    it('does not send if not enough time has passed', () => {
      const cart = {
        ...baseCart,
        createdAt: new Date().toISOString(),
        lastReminderAt: new Date(Date.now() - 30 * 60000).toISOString(), // 30 min ago
        remindersSent: 1,
      }
      expect(shouldSendReminder(cart, defaultConfig)).toBe(false)
    })

    it('sends if enough time has passed since last reminder', () => {
      const cart = {
        ...baseCart,
        lastReminderAt: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
        remindersSent: 1,
      }
      expect(shouldSendReminder(cart, defaultConfig)).toBe(true)
    })
  })

  describe('getReminderMessage', () => {
    it('first reminder mentions carrito', () => {
      const msg = getReminderMessage(baseCart, defaultConfig, 0)
      expect(msg).toContain('carrito')
    })

    it('first reminder includes brand name', () => {
      const msg = getReminderMessage(baseCart, defaultConfig, 0)
      expect(msg).toContain('El Viajero')
    })

    it('last reminder includes discount when configured', () => {
      const config = { ...defaultConfig, discountPercent: 10, discountValidHours: 24 }
      const msg = getReminderMessage(baseCart, config, 1)
      expect(msg).toContain('10%')
      expect(msg).toContain('VIAJERO10')
      expect(msg).toContain('24 horas')
    })

    it('last reminder falls back to generic when no discount configured', () => {
      const msg = getReminderMessage(baseCart, defaultConfig, 1)
      expect(msg).toContain('sigue esperándote')
    })

    it('includes product name in follow-up message', () => {
      const msg = getReminderMessage(baseCart, defaultConfig, 1)
      expect(msg).toContain('Carpa 4 Personas')
    })
  })

  describe('calculateRecoveryRate', () => {
    it('returns 0 when total is 0', () => {
      expect(calculateRecoveryRate(0, 0)).toBe(0)
    })

    it('returns 0% when nothing recovered', () => {
      expect(calculateRecoveryRate(0, 100)).toBe(0)
    })

    it('returns 100% when all recovered', () => {
      expect(calculateRecoveryRate(100, 100)).toBe(100)
    })

    it('returns 50% for half', () => {
      expect(calculateRecoveryRate(25, 50)).toBe(50)
    })

    it('handles fractional percentages', () => {
      expect(calculateRecoveryRate(1, 3)).toBeCloseTo(33.33, 1)
    })
  })

  describe('getRecoveryScore', () => {
    it('returns a score between 0 and 100', () => {
      const score = getRecoveryScore(baseCart)
      expect(score).toBeGreaterThanOrEqual(0)
      expect(score).toBeLessThanOrEqual(100)
    })

    it('high value carts get higher score', () => {
      const highValue = { ...baseCart, total: 1000000 }
      const lowValue = { ...baseCart, total: 30000 }
      expect(getRecoveryScore(highValue)).toBeGreaterThan(getRecoveryScore(lowValue))
    })

    it('recent carts get higher score', () => {
      const recent = { ...baseCart, createdAt: new Date().toISOString() }
      const old = { ...baseCart, createdAt: new Date(Date.now() - 7 * 86400000).toISOString() }
      expect(getRecoveryScore(recent)).toBeGreaterThan(getRecoveryScore(old))
    })

    it('carts with phone get bonus', () => {
      const withPhone = { ...baseCart, customerPhone: '595981111111' }
      const without = { ...baseCart, customerPhone: undefined }
      expect(getRecoveryScore(withPhone)).toBeGreaterThan(getRecoveryScore(without))
    })

    it('carts with prior reminders get penalty', () => {
      const reminded = { ...baseCart, lastReminderAt: new Date().toISOString() }
      const fresh = { ...baseCart }
      expect(getRecoveryScore(reminded)).toBeLessThan(getRecoveryScore(fresh))
    })
  })
})
