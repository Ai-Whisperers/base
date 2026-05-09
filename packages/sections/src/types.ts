// ── Content Types ──
// Reusable throughout sections. Vendor-agnostic — no Nexa-specific assumptions.

export interface SectionComponentProps {
  pageContent: Record<string, any>
  data?: Record<string, any>
  images?: Record<string, any>
  locale?: string
}

// ── Section Registry ──
export type SectionComponent = React.ComponentType<SectionComponentProps>
export type SectionMap = Record<string, SectionComponent>

// ── Image Reference ──
export interface ImageRef {
  src: string
  fallbackSrc?: string
  alt?: string
  width?: number
  height?: number
}

// ── Generic Section Shapes (minimal contract) ──
export interface GenericSectionContent {
  eyebrow?: string
  headline?: string
  subheadline?: string
  title?: string
  subtitle?: string
  items?: any[]
  ctaText?: string
  ctaHref?: string
  buttonText?: string
  groups?: any[]
  full?: { items?: any[]; title?: string }
  trust?: { items?: any[] }
  pillars?: any[]
  members?: any[]
  paragraphs?: string[]
  [key: string]: any
}

export interface ContentBlock {
  title?: string
  subtitle?: string
  description?: string
  image?: string | ImageRef
  items?: any[]
  [key: string]: any
}

export interface PageConfig {
  slug?: string
  locale?: string
  title?: string
  description?: string
  keywords?: string[]
  schemaType?: string
  sections?: {
    id: string
    variant?: string
    content?: string
    styling?: Record<string, string>
    enabledWhen?: string
  }[]
  [key: string]: any
}
