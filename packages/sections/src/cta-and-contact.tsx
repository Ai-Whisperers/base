'use client'

import React from 'react'
import { SectionComponentProps } from './types'
import { resolveImage } from './resolve-content'

export function CtaBanner({ pageContent }: SectionComponentProps) {
  const c = pageContent.finalCta || pageContent.cta || {}
  if (!c.title) return null
  return (
    <section className="py-24 text-center text-white"
      style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)' }}
    >
      <div className="max-w-[600px] mx-auto px-4">
        <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-playfair font-bold mb-3">{c.title}</h2>
        {c.subtitle && <p className="text-base opacity-85 mb-6">{c.subtitle}</p>}
        {c.buttonText && <a href={c.buttonHref || c.ctaHref} className="inline-block px-8 py-3 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 transition-opacity no-underline">{c.buttonText || c.ctaText}</a>}
      </div>
    </section>
  )
}

export function BookingEmbedSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  if (!d.title) return null
  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[800px] mx-auto text-center px-4">
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-3">{d.title}</h2>
        {d.subtitle && <p className="text-text-muted mb-8">{d.subtitle}</p>}
        {d.features?.length && <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 mb-8">
          {d.features.map((f: string, i: number) => <div key={i} className="p-4 bg-white rounded-lg shadow-sm"><p className="text-primary font-semibold text-sm">{f}</p></div>)}
        </div>}
        <a href={d.ctaHref || 'https://wa.me/595982515138?text=Quiero%20agendar%20una%20consulta'}
          className="inline-block px-10 py-4 rounded-full font-bold text-base no-underline hover:opacity-90"
          style={{ background: '#25D366', color: 'white' }}>{d.ctaText || 'Agendar consulta gratuita'}</a>
        {d.calendarNote && <p className="mt-3 text-xs text-text-muted italic">{d.calendarNote}</p>}
      </div>
    </section>
  )
}

export function ContactDetailsSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  if (!d.whatsapp && !d.email) return null
  return (
    <section className="py-24">
      <div className="max-w-[600px] mx-auto text-center px-4">
        {d.title && <h2 className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-bold text-primary mb-6">{d.title}</h2>}
        <div className="flex flex-col gap-4">
          {d.whatsapp && <a href={`https://wa.me/${d.whatsapp.replace(/[^0-9]/g,'')}`} target="_blank" className="flex items-center justify-center gap-3 p-4 rounded-lg no-underline font-semibold text-white" style={{ background: '#25D366' }}>
            <span className="w-7 h-7 flex items-center justify-center bg-white/20 rounded-full text-xs">WA</span> {d.whatsapp}
          </a>}
          {d.email && <a href={`mailto:${d.email}`} className="flex items-center justify-center gap-3 p-4 rounded-lg bg-primary text-white no-underline font-semibold">
            <span className="w-7 h-7 flex items-center justify-center bg-white/15 rounded-full text-xs">@</span> {d.email}
          </a>}
          {d.address && <p className="text-text-muted text-sm flex items-center justify-center gap-2"><span className="text-accent font-bold">⌂</span> {d.address}{d.neighborhood ? ', ' + d.neighborhood : ''}</p>}
          {d.phone && !d.whatsapp && <p className="text-text-muted text-sm"><span className="text-accent">✆</span> {d.phone}</p>}
          {d.hours && <p className="text-text-muted text-xs"><span className="text-accent">◷</span> {typeof d.hours === 'object' ? Object.values(d.hours).join(' · ') : d.hours}</p>}
        </div>
      </div>
    </section>
  )
}

export function NewsletterSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  if (!d.title) return null
  return (
    <section className="py-12 px-4 bg-primary text-white">
      <div className="max-w-[600px] mx-auto text-center">
        <h3 className="text-lg font-bold mb-2">{d.title}</h3>
        {d.description && <p className="text-sm text-white/80 mb-6">{d.description}</p>}
        <div className="flex gap-2 flex-wrap justify-center">
          <input type="email" placeholder={d.placeholder || "tu@email.com"}
            className="px-4 py-3 rounded-full border-none flex-1 min-w-[200px] text-sm" />
          <button className="px-6 py-3 bg-accent text-primary rounded-full border-none font-bold cursor-pointer text-sm hover:opacity-90">
            {d.buttonText || "Suscribirme"}
          </button>
        </div>
      </div>
    </section>
  )
}
