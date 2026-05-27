import { describe, expect, it, vi } from 'vitest'
import { EvolutionClient } from '../client.js'
import {
  abandonedCart,
  lowStockAlert,
  orderConfirmation,
  orderShipped,
  welcomeMessage,
} from '../templates.js'

const config = {
  baseUrl: 'https://evolution.test',
  apiKey: 'test-key',
  instance: 'test-instance',
}

function withMockFetch<T>(mock: ReturnType<typeof vi.fn>, fn: () => Promise<T>): Promise<T> {
  const original = globalThis.fetch
  globalThis.fetch = mock
  return fn().finally(() => { globalThis.fetch = original })
}

describe('EvolutionClient', () => {
  it('sendText builds correct fetch request', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ key: { id: 'msg1', remoteJid: '595999@c.us', fromMe: true } }),
    })

    await withMockFetch(mockFetch, async () => {
      const client = new EvolutionClient(config)
      const result = await client.sendText('595984009751', 'Hello')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://evolution.test/message/sendText/test-instance',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: 'test-key' },
          body: JSON.stringify({ number: '595984009751', text: 'Hello', delay: 1200 }),
        },
      )
      expect(result.success).toBe(true)
      expect(result.key?.id).toBe('msg1')
    })
  })

  it('sendText handles failure', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => 'Unauthorized',
    })

    await withMockFetch(mockFetch, async () => {
      const client = new EvolutionClient(config)
      const result = await client.sendText('595984009751', 'Hello')

      expect(result.success).toBe(false)
      expect(result.error).toContain('Unauthorized')
    })
  })

  it('buildWhatsAppUrl returns correct wa.me link without text', () => {
    const client = new EvolutionClient(config)
    const url = client.buildWhatsAppUrl('595984009751')
    expect(url).toBe('https://wa.me/595984009751')
  })

  it('buildWhatsAppUrl returns correct wa.me link with text', () => {
    const client = new EvolutionClient(config)
    const url = client.buildWhatsAppUrl('595984009751', 'Hola')
    expect(url).toBe('https://wa.me/595984009751?text=Hola')
  })

  it('buildWhatsAppUrl cleans non-digit characters', () => {
    const client = new EvolutionClient(config)
    const url = client.buildWhatsAppUrl('+595 984 009751')
    expect(url).toBe('https://wa.me/595984009751')
  })

  it('sendMedia builds correct fetch request', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ key: { id: 'media1', remoteJid: '595999@c.us', fromMe: true } }),
    })

    await withMockFetch(mockFetch, async () => {
      const client = new EvolutionClient(config)
      const result = await client.sendMedia(
        '595984009751',
        'https://example.com/img.jpg',
        'Check this out',
        'image',
      )

      expect(mockFetch).toHaveBeenCalledWith(
        'https://evolution.test/message/sendMedia/test-instance',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', apikey: 'test-key' },
          body: JSON.stringify({
            number: '595984009751',
            mediatype: 'image',
            media: 'https://example.com/img.jpg',
            caption: 'Check this out',
            delay: 1200,
          }),
        },
      )
      expect(result.success).toBe(true)
    })
  })
})

describe('Templates', () => {
  const items = [
    { name: 'Carpas', price: 250000, quantity: 2 },
    { name: 'Bolsa dormir', price: 120000, quantity: 1, variant: 'Premium' },
  ]

  it('orderConfirmation produces expected format', () => {
    const msg = orderConfirmation('abc123def456', items, 620000)
    expect(msg).toContain('✅ *PEDIDO CONFIRMADO*')
    expect(msg).toContain('#abc123de')
    expect(msg).toContain('Carpas')
    expect(msg).toContain('Bolsa dormir (Premium)')
    expect(msg).toContain('Gs. 620.000')
  })

  it('abandonedCart produces expected format', () => {
    const msg = abandonedCart(items, 620000, 'https://shop.example.com/cart')
    expect(msg).toContain('🛒 *¡Te quedaron productos en tu carrito!*')
    expect(msg).toContain('Carpas')
    expect(msg).toContain('Gs. 620.000')
    expect(msg).toContain('https://shop.example.com/cart')
  })

  it('orderShipped produces expected format', () => {
    const msg = orderShipped('abc123def456')
    expect(msg).toContain('📦 *TU PEDIDO FUE ENVIADO*')
    expect(msg).toContain('#abc123de')
  })

  it('orderShipped includes tracking when provided', () => {
    const msg = orderShipped('abc123def456', 'TRACK-001')
    expect(msg).toContain('TRACK-001')
  })

  it('welcomeMessage produces expected format', () => {
    const msg = welcomeMessage('Juan')
    expect(msg).toContain('👋 ¡Hola Juan!')
    expect(msg).toContain('Productos y precios')
  })

  it('lowStockAlert produces expected format', () => {
    const msg = lowStockAlert('Carpas XXL', 3)
    expect(msg).toContain('⚠️ *ALERTA DE STOCK BAJO*')
    expect(msg).toContain('Carpas XXL')
    expect(msg).toContain('3 unidades')
  })
})
