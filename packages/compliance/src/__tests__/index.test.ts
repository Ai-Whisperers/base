import { describe, it, expect } from 'vitest'
import { privacyPolicy, cookiesPolicy, termsOfService, getComplianceDocs } from '../index'

const baseVars = { businessName: 'TestBiz', domain: 'test.com', email: 'test@test.com' }

describe('compliance', () => {
  it('exports privacyPolicy, cookiesPolicy, termsOfService, getComplianceDocs', () => {
    expect(typeof privacyPolicy).toBe('function')
    expect(typeof cookiesPolicy).toBe('function')
    expect(typeof termsOfService).toBe('function')
    expect(typeof getComplianceDocs).toBe('function')
  })

  it('privacyPolicy returns ComplianceDoc with type=privacy', () => {
    const doc = privacyPolicy(baseVars)
    expect(doc.type).toBe('privacy')
    expect(doc.jurisdiction).toBe('PY')
    expect(doc.title).toContain('TestBiz')
    expect(doc.content).toContain('test@test.com')
  })

  it('cookiesPolicy returns ComplianceDoc with type=cookies', () => {
    const doc = cookiesPolicy({ businessName: 'TestBiz', domain: 'test.com' })
    expect(doc.type).toBe('cookies')
    expect(doc.title).toContain('Cookies')
  })

  it('termsOfService returns ComplianceDoc with type=terms', () => {
    const doc = termsOfService(baseVars)
    expect(doc.type).toBe('terms')
    expect(doc.content).toContain('TestBiz')
  })

  it('getComplianceDocs delegates to the right generator', () => {
    expect(getComplianceDocs('privacy', baseVars).type).toBe('privacy')
    expect(getComplianceDocs('cookies', { businessName: 'B', domain: 'd.com' }).type).toBe('cookies')
    expect(getComplianceDocs('terms', baseVars).type).toBe('terms')
  })

  it('getComplianceDocs throws for unsupported type', () => {
    expect(() => getComplianceDocs('aml' as any, baseVars)).toThrow('not implemented')
  })
})
