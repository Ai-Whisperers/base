import { describe, it, expect } from 'vitest'
import {
  LOCALES, DEFAULT_LOCALE, LOCALE_COOKIE, LOCALE_CONFIG,
  resolveLocale, isValidLocale,
  useTranslations,
  COOKIE_BANNER, GATEWAY_POPUP, EXIT_POPUP, FEEDBACK_SECTION,
  getLocaleStrings, t,
} from '../index'

describe('i18n', () => {
  it('exports locale constants', () => {
    expect(Array.isArray(LOCALES)).toBe(true)
    expect(LOCALES).toContain('es')
    expect(LOCALES).toContain('en')
    expect(DEFAULT_LOCALE).toBe('es')
    expect(typeof LOCALE_COOKIE).toBe('string')
  })

  it('LOCALE_CONFIG has entries for all locales', () => {
    for (const loc of LOCALES) {
      expect(LOCALE_CONFIG[loc]).toBeDefined()
      expect(LOCALE_CONFIG[loc].name).toBeTruthy()
    }
  })

  it('resolveLocale extracts locale from pathname', () => {
    expect(resolveLocale('/en/about')).toBe('en')
    expect(resolveLocale('/es/')).toBe('es')
  })

  it('resolveLocale falls back to cookie', () => {
    expect(resolveLocale('/other', 'nl')).toBe('nl')
  })

  it('resolveLocale falls back to default', () => {
    expect(resolveLocale('/other')).toBe('es')
  })

  it('isValidLocale works', () => {
    expect(isValidLocale('es')).toBe(true)
    expect(isValidLocale('xx')).toBe(false)
  })

  it('useTranslations returns t function and locale', () => {
    const { t, locale } = useTranslations('es')
    expect(typeof t).toBe('function')
    expect(locale).toBe('es')
  })

  it('useTranslations t returns key for missing path', () => {
    const { t } = useTranslations('es')
    expect(t('nonexistent.deep.key')).toBe('nonexistent.deep.key')
  })

  it('exports locale string sets', () => {
    expect(typeof COOKIE_BANNER).toBe('object')
    expect(typeof GATEWAY_POPUP).toBe('object')
    expect(typeof EXIT_POPUP).toBe('object')
    expect(typeof FEEDBACK_SECTION).toBe('object')
  })

  it('getLocaleStrings returns es as fallback', () => {
    const result = getLocaleStrings(COOKIE_BANNER, 'xx')
    expect(result).toEqual(COOKIE_BANNER['es'])
  })

  it('t helper retrieves a key', () => {
    expect(t(COOKIE_BANNER, 'es', 'accept')).toBe('Aceptar')
    expect(t(COOKIE_BANNER, 'en', 'accept')).toBe('Accept')
  })
})
