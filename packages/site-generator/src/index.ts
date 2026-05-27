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
