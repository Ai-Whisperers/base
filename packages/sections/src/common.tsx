'use client'

import React from 'react'
import { SectionComponentProps } from './types'

function GenericSection({ data }: { data?: any }) {
  if (!data) return null
  const items = data.items || data.full?.items || data.groups || data.pillars || data.members || data.paragraphs || data.trust?.items
  return (
    <section className="py-16 px-4 even:bg-surface-alt">
      <div className="max-w-4xl mx-auto text-center">
        {data.eyebrow && <p className="text-xs uppercase tracking-widest text-text-muted mb-2">{data.eyebrow}</p>}
        {(data.headline || data.title) && <h2 className="text-2xl font-bold mb-2">{data.headline || data.title}</h2>}
        {(data.subheadline || data.subtitle) && <p className="text-text-muted leading-relaxed mb-6">{data.subheadline || data.subtitle}</p>}
        {items && Array.isArray(items) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {items.map((item: any, j: number) => (
              <div key={j} className="p-5 bg-surface-alt rounded-xl">
                {typeof item === 'string' ? <p className="text-text-muted">{item}</p> : (
                  <>
                    {(item.title || item.pregunta || item.question || item.term || item.name) && <h4 className="font-bold mb-2">{item.title || item.pregunta || item.question || item.term || item.name}</h4>}
                    {(item.description || item.respuesta || item.answer || item.definition || item.body || item.role) && <p className="text-sm text-text-muted leading-relaxed">{item.description || item.respuesta || item.answer || item.definition || item.body || item.role}</p>}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        {data.ctaText && <a href={data.ctaHref || '#'} className="inline-block mt-6 px-8 py-3 bg-primary text-white rounded-full font-bold text-sm hover:opacity-90">{data.ctaText}</a>}
      </div>
    </section>
  )
}

export function StatsSection({ pageContent }: SectionComponentProps) {
  const stats = pageContent.stats
  if (!stats?.items?.length) return null
  return (
    <section className="py-12 md:py-16 bg-surface-alt">
      <div className="max-w-[900px] mx-auto flex justify-center gap-12 flex-wrap">
        {stats.items.map((s: any, i: number) => (
          <div key={i} className="text-center">
            <div className="text-4xl font-extrabold text-primary">{s.value}</div>
            <div className="text-[0.95rem] text-text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function HighlightSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || d.pillars || []
  if (!items.length) return null
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-[800px] mx-auto text-center">
        {d.eyebrow && <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2">{d.eyebrow}</p>}
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-playfair font-bold text-primary mb-8">{d.title}</h2>}
        <div className="flex justify-center gap-[clamp(1.5rem,3vw,3rem)] flex-wrap">
          {items.map((s: any, i: number) => (
            <div key={i} className="text-center">
              {s.value && <div className="text-3xl font-extrabold text-primary">{s.value}</div>}
              {s.label && <div className="text-sm text-text-muted mt-1">{s.label}</div>}
              {!s.value && s.title && <h4 className="text-lg font-bold text-primary mb-1">{s.title}</h4>}
              {!s.value && s.description && <p className="text-text-muted text-sm leading-relaxed max-w-[300px]">{s.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default GenericSection
