'use client'

import React from 'react'
import { SectionComponentProps } from './types'

export function CaseStudySection({ data }: SectionComponentProps) {
  if (!data?.items?.length) return null
  const { title, subtitle, items, stats } = data
  const [selected, setSelected] = React.useState<number>(items.findIndex((i:any) => i.featured) || 0)
  const active = items[selected]
  return (
    <>
      <section className="py-20 bg-surface-alt">
        <div className="max-w-6xl mx-auto text-center px-4">
          <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2">{data.eyebrow}</p>
          {title && <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-playfair font-bold text-primary mb-2">{title}</h2>}
          {subtitle && <p className="text-text-muted mb-8">{subtitle}</p>}
          {stats && <div className="flex justify-center gap-12 flex-wrap mb-12">
            {stats.totalClients > 0 && <div className="text-center"><div className="text-3xl font-extrabold text-primary">{stats.totalClients}</div><div className="text-xs text-text-muted mt-1">Clientes atendidos</div></div>}
            {stats.satisfactionRate && <div className="text-center"><div className="text-3xl font-extrabold text-accent">{stats.satisfactionRate}%</div><div className="text-xs text-text-muted mt-1">Satisfacción</div></div>}
            {stats.averageRating && <div className="text-center"><div className="text-3xl font-extrabold text-primary">{'★'.repeat(Math.round(stats.averageRating))}</div><div className="text-xs text-text-muted mt-1">Calificación promedio</div></div>}
            {stats.countries?.length > 0 && <div className="text-center"><div className="text-3xl font-extrabold text-primary">{stats.countries.length}</div><div className="text-xs text-text-muted mt-1">Países de origen</div></div>}
          </div>}
        </div>
      </section>

      {active && <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex gap-4 mb-8 justify-center flex-wrap">
            {items.map((item: any, i: number) => (
              <button key={i} onClick={() => setSelected(i)}
                className={`px-4 py-2 rounded-full text-xs font-bold border cursor-pointer transition-all ${selected === i ? 'bg-accent text-primary border-accent' : 'bg-white text-text-muted border-border hover:border-accent'}`}>
                {item.name}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-md border border-border">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">{active.name?.split(' ').map((s:string)=>s[0]).join('').slice(0,2)}</div>
                  <div>
                    <h3 className="font-bold text-primary text-lg">{active.name}</h3>
                    <p className="text-sm text-text-muted">{active.location}</p>
                  </div>
                </div>
                <div className="text-accent text-sm mb-4">{'★'.repeat(active.rating || 5)}{'☆'.repeat(5 - (active.rating || 5))}</div>
                <blockquote className="text-lg italic text-primary leading-relaxed border-l-4 border-accent pl-4 mb-6">&ldquo;{active.quote}&rdquo;</blockquote>
                {active.beforeAfter && <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-surface-alt rounded-lg">
                    <p className="text-xs font-bold text-text-muted uppercase mb-1">Antes</p>
                    <p className="text-sm text-text-muted italic">&ldquo;{active.beforeAfter.before}&rdquo;</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <p className="text-xs font-bold text-accent uppercase mb-1">Después</p>
                    <p className="text-sm text-primary font-medium italic">&ldquo;{active.beforeAfter.after}&rdquo;</p>
                  </div>
                </div>}
                {active.extraDetails && <div className="flex flex-wrap gap-2">
                  {active.extraDetails.savingsAmount && <span className="px-3 py-1 bg-success/10 text-success rounded-full text-xs font-bold">Ahorro: ${active.extraDetails.savingsAmount.toLocaleString()}/{active.extraDetails.savingsCurrency || 'año'}</span>}
                  {active.extraDetails.keyMilestone && <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold">✓ {active.extraDetails.keyMilestone}</span>}
                  {active.program && <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">Programa: {active.program}</span>}
                </div>}
              </div>
            </div>
          </div>
        </div>
      </section>}

      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-lg text-text-muted mb-6">¿Trabajaste con Nexa? Tu historia puede ayudar a otros.</p>
          <a href="/testimonios/caso-de-exito-form.html" className="inline-block px-8 py-3 bg-accent text-primary rounded-full font-bold text-base no-underline hover:opacity-90">Comparte tu experiencia</a>
        </div>
      </section>
    </>
  )
}
