import { VERTICALS, DEFAULT_SECTIONS_BY_VERTICAL, getSectionTemplates } from "@ai-whisperers/business-registry"

export interface GeneratorConfig {
  businessType: string
  vertical: string
  name: string
  domain: string
  tagline?: string
  description?: string
  features?: Record<string, boolean>
}

export interface GeneratedFile {
  path: string
  content: string
}

export interface BusinessData {
  name: string
  tagline?: string
  description?: string
  whatsapp?: string
  email?: string
  phone?: string
  address?: string
  services?: { name: string; description: string }[]
  team?: { name: string; role: string }[]
  testimonials?: { name: string; text: string }[]
  gallery?: string[]
  pricing?: { name: string; price: string }[]
  faq?: { q: string; a: string }[]
  social?: Record<string, string>
}

export interface PageInfo {
  path: string
  title: string
  description: string
  type: string
}

const SECTION_TO_PATH: Record<string, string> = {
  hero: "/",
  services: "/servicios",
  about: "/nosotros",
  testimonials: "/testimonios",
  contact: "/contacto",
  gallery: "/galeria",
  pricing: "/precios",
  faq: "/preguntas-frecuentes",
  blog: "/blog",
  products: "/productos",
  team: "/equipo",
  locations: "/sucursales",
  portfolio: "/portafolio",
  menu: "/carta",
  reviews: "/opiniones",
  booking: "/reservas",
  properties: "/propiedades",
  categories: "/categorias",
  courses: "/cursos",
  "case-studies": "/casos-de-exito",
  coverage: "/cobertura",
  events: "/eventos",
  activities: "/actividades",
  articles: "/articulos",
  subscribe: "/suscripcion",
  join: "/unirse",
  location: "/ubicacion",
}

const SECTION_TITLES: Record<string, { title: string; description: string }> = {
  hero: { title: "Inicio", description: "Página principal" },
  services: { title: "Servicios", description: "Nuestros servicios" },
  about: { title: "Nosotros", description: "Conócenos" },
  testimonials: { title: "Testimonios", description: "Lo que dicen nuestros clientes" },
  contact: { title: "Contacto", description: "Ponte en contacto" },
  gallery: { title: "Galería", description: "Nuestra galería de imágenes" },
  pricing: { title: "Precios", description: "Nuestros precios" },
  faq: { title: "Preguntas Frecuentes", description: "Resolvemos tus dudas" },
  blog: { title: "Blog", description: "Últimas noticias y artículos" },
  products: { title: "Productos", description: "Nuestros productos" },
  team: { title: "Equipo", description: "Conoce a nuestro equipo" },
  locations: { title: "Sucursales", description: "Nuestras sucursales" },
  portfolio: { title: "Portafolio", description: "Nuestros trabajos" },
  menu: { title: "Carta", description: "Nuestra carta" },
  reviews: { title: "Opiniones", description: "Opiniones de clientes" },
  booking: { title: "Reservas", description: "Reserva tu turno" },
  properties: { title: "Propiedades", description: "Nuestras propiedades" },
  categories: { title: "Categorías", description: "Categorías" },
  courses: { title: "Cursos", description: "Nuestros cursos" },
  "case-studies": { title: "Casos de Éxito", description: "Casos de éxito" },
  coverage: { title: "Cobertura", description: "Nuestra cobertura" },
  events: { title: "Eventos", description: "Próximos eventos" },
  activities: { title: "Actividades", description: "Nuestras actividades" },
  articles: { title: "Artículos", description: "Artículos y noticias" },
  subscribe: { title: "Suscripción", description: "Suscríbete" },
  join: { title: "Unirse", description: "Únete a nosotros" },
  location: { title: "Ubicación", description: "Encuéntranos" },
}

export function generateSiteStructure(config: GeneratorConfig): GeneratedFile[] {
  const files: GeneratedFile[] = []

  files.push({
    path: 'package.json',
    content: JSON.stringify({
      name: config.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      version: '0.1.0',
      private: true,
      scripts: { dev: 'next dev', build: 'next build', start: 'next start' },
      dependencies: {
        next: '^15.0.0',
        react: '^19.0.0',
        'react-dom': '^19.0.0',
        '@ai-whisperers/ui': '^0.4.1',
        '@ai-whisperers/seo': '^0.2.1',
        '@ai-whisperers/whatsapp': '^0.3.0',
        '@ai-whisperers/env': '^0.2.0',
        '@ai-whisperers/analytics': '^0.2.0',
        '@ai-whisperers/hooks': '^0.2.0',
        '@ai-whisperers/currency': '^0.2.0',
        '@ai-whisperers/compliance': '^0.2.0',
        'lucide-react': '^0.400.0',
      },
      devDependencies: { typescript: '^5.8.0' },
    }, null, 2),
  })

  files.push({
    path: 'content/es.json',
    content: JSON.stringify({
      site: {
        name: config.name,
        tagline: config.tagline || '',
        description: config.description || '',
        whatsapp: '',
        email: '',
      },
      navigation: { links: [
        { label: 'Inicio', href: '/' },
        { label: 'Nosotros', href: '/nosotros' },
        { label: 'Servicios', href: '/servicios' },
        { label: 'Contacto', href: '/contacto' },
      ]},
      footer: {
        copyright: `© ${new Date().getFullYear()} ${config.name}. Todos los derechos reservados.`,
        links: [
          { label: 'Privacidad', href: '/privacidad' },
          { label: 'Términos', href: '/terminos' },
        ],
      },
      home: {
        hero: {
          headline: `Bienvenido a ${config.name}`,
          subheadline: config.tagline || 'Tu mejor opción en Paraguay',
          cta: { text: 'Conócenos', href: '/nosotros' },
        },
      },
    }, null, 2),
  })

  files.push({
    path: 'app/globals.css',
    content: `@import "tailwindcss";

@theme {
  --color-primary: #2563eb;
  --color-primary-foreground: #ffffff;
  --color-accent: #f59e0b;
  --color-bg: #ffffff;
  --color-text: #111827;
  --color-text-muted: #6b7280;
}

body {
  font-family: "Inter", system-ui, sans-serif;
}
`,
  })

  return files
}

export function generateSectionContent(type: string, data: Record<string, any>): string {
  const sections: Record<string, string> = {
    hero: `<section class="py-20 text-center"><h1 class="text-4xl font-bold">${data.headline || ''}</h1><p class="mt-4 text-lg text-gray-600">${data.subheadline || ''}</p></section>`,
    services: `<section class="py-16 bg-gray-50"><div class="max-w-6xl mx-auto px-4"><h2 class="text-3xl font-bold text-center mb-10">Servicios</h2><div class="grid md:grid-cols-3 gap-6">${(data.services || []).map((s: any) => `<div class="p-6 bg-white rounded-xl shadow-sm"><h3 class="font-semibold">${s.name}</h3><p class="mt-2 text-sm text-gray-600">${s.description}</p></div>`).join('')}</div></div></section>`,
    contact: `<section class="py-16"><div class="max-w-6xl mx-auto px-4 text-center"><h2 class="text-3xl font-bold mb-6">Contacto</h2><p class="text-gray-600">WhatsApp: ${data.whatsapp || ''}</p></div></section>`,
  }
  return sections[type] || ''
}

export function getVerticalPages(verticalId: string, subVerticalId?: string): PageInfo[] {
  const sections = getSectionTemplates(verticalId, subVerticalId)
  const pages: PageInfo[] = []

  for (const section of sections) {
    const path = SECTION_TO_PATH[section]
    const meta = SECTION_TITLES[section]
    if (path !== undefined && meta) {
      pages.push({ path, title: meta.title, description: meta.description, type: section })
    }
  }

  return pages
}

export function generatePageContent(pageType: string, data: BusinessData): string {
  const imports = `import { Metadata } from "next"
import { ${pageType === 'hero' ? 'HeroSection' : pageType === 'services' ? 'ServicesSection' : pageType === 'contact' ? 'ContactSection' : pageType === 'about' ? 'AboutSection' : pageType === 'testimonials' ? 'TestimonialsSection' : pageType === 'gallery' ? 'GallerySection' : pageType === 'pricing' ? 'PricingSection' : pageType === 'faq' ? 'FaqSection' : pageType === 'team' ? 'TeamSection' : 'Section'} } from "@ai-whisperers/ui"
import { JsonLd } from "@ai-whisperers/seo"
import content from "@/content/es.json"`

  const pages: Record<string, string> = {
    "/": `export default function HomePage() {
  return (
    <main>
      <HeroSection
        headline={content.home.hero.headline}
        subheadline={content.home.hero.subheadline}
        cta={content.home.hero.cta}
      />
      ${data.services?.length ? `<ServicesSection services={content.services || ${JSON.stringify(data.services)}} />` : ''}
      ${data.testimonials?.length ? `<TestimonialsSection testimonials={content.testimonials || ${JSON.stringify(data.testimonials)}} />` : ''}
      <ContactSection whatsapp={content.site.whatsapp} email={content.site.email} />
      <JsonLd type="LocalBusiness" name={content.site.name} />
    </main>
  )
}`,
    servicios: `export default function ServicesPage() {
  return (
    <main>
      <ServicesSection services={content.services || ${JSON.stringify(data.services || [])}} />
      <JsonLd type="LocalBusiness" name={content.site.name} />
    </main>
  )
}`,
    nosotros: `export default function AboutPage() {
  return (
    <main>
      <AboutSection
        name={content.site.name}
        description={content.site.description}
        team={content.team || ${JSON.stringify(data.team || [])}}
      />
      <JsonLd type="LocalBusiness" name={content.site.name} />
    </main>
  )
}`,
    testimonios: `export default function TestimonialsPage() {
  return (
    <main>
      <TestimonialsSection testimonials={content.testimonials || ${JSON.stringify(data.testimonials || [])}} />
      <JsonLd type="LocalBusiness" name={content.site.name} />
    </main>
  )
}`,
    contacto: `export default function ContactPage() {
  return (
    <main>
      <ContactSection
        whatsapp={content.site.whatsapp}
        email={content.site.email}
        phone="${data.phone || ''}"
        address="${data.address || ''}"
      />
      <JsonLd type="LocalBusiness" name={content.site.name} />
    </main>
  )
}`,
    galeria: `export default function GalleryPage() {
  return (
    <main>
      <GallerySection images={content.gallery || ${JSON.stringify(data.gallery || [])}} />
      <JsonLd type="LocalBusiness" name={content.site.name} />
    </main>
  )
}`,
    precios: `export default function PricingPage() {
  return (
    <main>
      <PricingSection plans={content.pricing || ${JSON.stringify(data.pricing || [])}} />
      <JsonLd type="LocalBusiness" name={content.site.name} />
    </main>
  )
}`,
    "preguntas-frecuentes": `export default function FaqPage() {
  return (
    <main>
      <FaqSection items={content.faq || ${JSON.stringify(data.faq || [])}} />
      <JsonLd type="FAQPage" />
    </main>
  )
}`,
    equipo: `export default function TeamPage() {
  return (
    <main>
      <TeamSection team={content.team || ${JSON.stringify(data.team || [])}} />
      <JsonLd type="LocalBusiness" name={content.site.name} />
    </main>
  )
}`,
  }

  const pageContent = pages[pageType]
  if (!pageContent) return ""

  const metadata: Record<string, any> = {
    "/": { title: "Inicio" },
    servicios: { title: "Servicios" },
    nosotros: { title: "Nosotros" },
    testimonios: { title: "Testimonios" },
    contacto: { title: "Contacto" },
    galeria: { title: "Galería" },
    precios: { title: "Precios" },
    "preguntas-frecuentes": { title: "Preguntas Frecuentes" },
    equipo: { title: "Equipo" },
  }

  const meta = metadata[pageType] || {}

  return `${imports}

export const metadata: Metadata = {
  title: ${JSON.stringify(meta.title)},
}

${pageContent}`
}

export function generateVerticalSite(config: GeneratorConfig): GeneratedFile[] {
  const files = generateSiteStructure(config)

  const subVerticalId = config.businessType !== config.vertical ? config.businessType : undefined
  const pages = getVerticalPages(config.vertical, subVerticalId)

  for (const page of pages) {
    const pagePath = page.path === "/" ? "app/page.tsx" : `app/(sections)${page.path}/page.tsx`
    const pageData: BusinessData = {
      name: config.name,
      tagline: config.tagline,
      description: config.description,
    }
    const content = generatePageContent(page.type === "hero" ? "/" : page.type, pageData)
    if (content) {
      files.push({ path: pagePath, content })
    }
  }

  files.push({
    path: "app/layout.tsx",
    content: `import type { Metadata } from "next"
import { Toaster } from "@ai-whisperers/ui"
import { Analytics } from "@ai-whisperers/analytics"
import "./globals.css"

export const metadata: Metadata = {
  title: "${config.name}",
  description: "${config.description || config.tagline || ''}",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
`,
  })

  return files
}
