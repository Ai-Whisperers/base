'use client'

import React from 'react'
import { SectionComponentProps } from './types'
import { resolveImage } from './resolve-content'

export function CtaBanner({ pageContent }: SectionComponentProps) {
  const c = pageContent.finalCta || pageContent.cta || {}
  if (!c.title) return null
  return (
    <section className="py-20 text-center text-white"
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
    <section className="py-20 bg-surface-alt">
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
    <section className="py-20">
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

export function WhatsappFloatSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const phone = d.whatsapp || pageContent?.site?.whatsapp || ''
  if (!phone) return null
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a href={`https://wa.me/${phone.replace(/[^0-9]/g, '')}`} target="_blank"
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg hover:opacity-90 transition-opacity"
        style={{ background: '#25D366', color: 'white' }}
        aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
    </div>
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
