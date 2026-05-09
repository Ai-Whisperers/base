// ─── Content types (standalone — no external deps on sections package) ─────

export interface SiteConfig {
  domain: string
  name: string
  tagline?: string
  vertical?: string
  country?: string
  locales?: string[]
  defaultLocale?: string
  features?: Record<string, boolean>
  contact?: {
    phone?: string
    email?: string
    whatsapp?: string
    address?: string
    calendly?: string
  }
  integrations?: {
    ga4?: string
    calendly?: string
    whatsappBridgeUrl?: string
    supabaseUrl?: string
    supabaseAnonKey?: string
    stripeKey?: string
  }
  [key: string]: any
}

export interface PageSection {
  id: string
  variant?: string
  content?: string
  styling?: Record<string, string>
  enabledWhen?: string
}

export interface PageConfig {
  slug: string
  locale?: string
  title?: string
  description?: string
  keywords?: string[]
  schemaType?: string
  sections?: PageSection[]
  [key: string]: any
}

export interface ImageManifest {
  [key: string]: {
    src: string
    alt?: string
    width?: number
    height?: number
    priority?: boolean
    [key: string]: any
  }
}

export interface LoadedContent {
  content: Record<string, any>
  pageConfig: PageConfig
  images: ImageManifest
}
