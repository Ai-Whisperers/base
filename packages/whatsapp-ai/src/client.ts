import type { EvolutionConfig, EvolutionInstance, SendMessageResult } from './types.js'

export class EvolutionClient {
  private config: EvolutionConfig

  constructor(config: EvolutionConfig) {
    this.config = config
  }

  private get headers(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      apikey: this.config.apiKey,
    }
  }

  private cleanNumber(number: string): string {
    return number.replace(/[^0-9]/g, '')
  }

  async sendText(to: string, text: string, delay = 1200): Promise<SendMessageResult> {
    const number = this.cleanNumber(to)
    try {
      const res = await fetch(
        `${this.config.baseUrl}/message/sendText/${this.config.instance}`,
        {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({ number, text, delay }),
        }
      )
      if (!res.ok) {
        const body = await res.text()
        return { success: false, error: body.substring(0, 300) }
      }
      const data = await res.json()
      return { success: true, key: data?.key }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      return { success: false, error: message }
    }
  }

  async sendMedia(
    number: string,
    mediaUrl: string,
    caption: string,
    mediaType: 'image' | 'video' | 'document' = 'image',
    delay = 1200
  ): Promise<SendMessageResult> {
    const cleaned = this.cleanNumber(number)
    try {
      const res = await fetch(
        `${this.config.baseUrl}/message/sendMedia/${this.config.instance}`,
        {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify({
            number: cleaned,
            mediatype: mediaType,
            media: mediaUrl,
            caption,
            delay,
          }),
        }
      )
      if (!res.ok) {
        const body = await res.text()
        return { success: false, error: body.substring(0, 300) }
      }
      const data = await res.json()
      return { success: true, key: data?.key }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      return { success: false, error: message }
    }
  }

  async getInstanceStatus(): Promise<EvolutionInstance | null> {
    try {
      const res = await fetch(
        `${this.config.baseUrl}/instance/connectionState/${this.config.instance}`,
        { headers: this.headers }
      )
      if (!res.ok) return null
      return await res.json()
    } catch {
      return null
    }
  }

  async checkNumber(number: string): Promise<boolean> {
    const cleaned = this.cleanNumber(number)
    try {
      const res = await fetch(
        `${this.config.baseUrl}/chat/whatsappNumbers/${this.config.instance}`,
        {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify([cleaned]),
        }
      )
      if (!res.ok) return false
      const data = await res.json()
      return Array.isArray(data) ? data.some((n: any) => n.exists) : false
    } catch {
      return false
    }
  }

  buildWhatsAppUrl(number: string, text?: string): string {
    const cleaned = this.cleanNumber(number)
    const url = `https://wa.me/${cleaned}`
    if (text) {
      return `${url}?text=${encodeURIComponent(text)}`
    }
    return url
  }
}
