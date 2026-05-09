'use client'

import React from 'react'
import { SectionComponentProps } from './types'
import { resolveImage } from './resolve-content'

export function StorySection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const paragraphs = d.paragraphs || []
  if (!d.title && !paragraphs.length) return null
  return (
    <section className="py-24">
      <div className="max-w-[700px] mx-auto px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-6 text-center">{d.title}</h2>}
        {paragraphs.map((p: string, i: number) => (
          <p key={i} className="text-text leading-relaxed text-sm mb-4">{p}</p>
        ))}
      </div>
    </section>
  )
}

export function GallerySection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  const photos = d.images || d.items || []
  if (!d.title && !photos.length) return null
  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-6xl mx-auto text-center px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-4">{d.title}</h2>}
        {d.subtitle && <p className="text-text-muted mb-8">{d.subtitle}</p>}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {photos.map((photo: any, i: number) => {
            const src = typeof photo === 'string' ? photo : resolveImage?.(images, photo.src || photo.imageUrl || '') || photo.src || photo.imageUrl || ''
            return (
              <div key={i} className="rounded-lg overflow-hidden shadow-md">
                {src && <img src={src} alt={photo.alt || photo.caption || ''} className="w-full h-[220px] object-cover block" />}
                {photo.caption && <p className="p-3 bg-white text-text-muted text-xs m-0">{photo.caption}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function TestimonialsSection({ pageContent, images }: SectionComponentProps) {
  const c = pageContent.testimonials || {}
  if (!c.items?.length) return null
  return (
    <section className="py-24">
      <div className="max-w-[900px] mx-auto text-center px-4">
        <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2">{c.eyebrow}</p>
        <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-2">{c.title}</h2>
        <p className="text-text-muted mb-8">{c.subtitle}</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {c.items.map((item: any, i: number) => {
            const img = resolveImage(images, item.image)
            return (
              <div key={i} className="p-8 border border-border rounded-2xl text-left">
                <div className="mb-3 text-accent">{'★'.repeat(item.rating || 5)}{'☆'.repeat(5 - (item.rating || 5))}</div>
                {img && <img src={img} alt={item.name} className="w-[60px] h-[60px] object-cover rounded-full mb-3 float-right" />}
                <p className="italic text-primary leading-relaxed text-sm mb-4">"{item.quote}"</p>
                <div className="font-bold text-primary text-sm">{item.name || item.author}</div>
                <div className="text-sm text-text-muted">{item.role}</div>
              </div>
            )
          })}
        </div>
        {c.ctaText && <a href={c.ctaHref} className="inline-block mt-8 text-accent font-bold no-underline border-b-2 border-accent">{c.ctaText} →</a>}
      </div>
    </section>
  )
}
