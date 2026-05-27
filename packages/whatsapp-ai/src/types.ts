export interface EvolutionConfig {
  baseUrl: string
  apiKey: string
  instance: string
}

export interface WhatsAppMessage {
  number: string
  text: string
  delay?: number
  media?: {
    url: string
    type: 'image' | 'video' | 'document'
    caption?: string
  }
}

export interface SendMessageResult {
  success: boolean
  key?: {
    id: string
    remoteJid: string
    fromMe: boolean
  }
  error?: string
}

export interface EvolutionInstance {
  instanceName: string
  status: 'open' | 'close' | 'connecting'
  qrcode?: string
}

export interface MessageTemplate {
  name: string
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION'
  components: TemplateComponent[]
}

export interface TemplateComponent {
  type: 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS'
  parameters?: TemplateParameter[]
}

export interface TemplateParameter {
  type: 'text' | 'image' | 'document'
  text?: string
  image?: { link: string }
  document?: { link: string; filename: string }
}
