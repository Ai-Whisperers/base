'use client'

import React from 'react'
import { SectionComponentProps } from './types'
import { resolveImage } from './resolve-content'

export function HeroSection({ pageContent, images }: SectionComponentProps) {
  const c = pageContent.hero || pageContent || {}
  const bgImage = resolveImage(images, c.backgroundImage)
  return (
    <section className={`px-4 text-center relative flex items-center justify-center ${bgImage ? 'bg-cover bg-center' : ''}`}
      style={bgImage ? {
        padding: '4rem 1rem',
        minHeight: 'clamp(350px,50vh,550px)',
        background: `linear-gradient(135deg, rgba(27,42,74,0.85), rgba(27,42,74,0.65)), url(${bgImage})`,
        backgroundSize: 'cover', backgroundPosition: 'center'
      } : {
        padding: '4rem 1rem',
        minHeight: 'clamp(350px,50vh,550px)',
        background: 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)',
      }}
    >
      <div className="max-w-4xl mx-auto relative z-10 text-white">
        <h1 className="text-[clamp(1.8rem_4vw_2.8rem)] font-playfair font-bold leading-tight mb-3">{c.headline}</h1>
        <div className="w-[60px] h-[3px] bg-accent mx-auto mb-5" />
        <p className="text-lg opacity-90 leading-relaxed max-w-[600px] mx-auto mb-8">{c.subheadline}</p>
        <div className="flex gap-4 justify-center flex-wrap">
          {c.ctaPrimaryText && <a href={c.ctaPrimaryHref} className="px-8 py-3 bg-accent text-primary rounded-full font-bold text-base shadow-lg hover:opacity-90 transition-opacity no-underline">{c.ctaPrimaryText}</a>}
          {c.ctaSecondaryText && <a href={c.ctaSecondaryHref} className="px-8 py-3 border-2 border-white/70 text-white rounded-full font-semibold text-base hover:opacity-100 opacity-80 no-underline">{c.ctaSecondaryText}</a>}
        </div>
        {c.trustBadges && <div className="flex gap-4 justify-center mt-8 flex-wrap">
          {c.trustBadges.map((b: string, i: number) => (
            <span key={i} className="px-4 py-1.5 bg-black/30 rounded-full text-sm">{b}</span>
          ))}
        </div>}
      </div>
    </section>
  )
}

export function PageHeroSection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  const headline = d.headline || d.title
  if (!headline) return null
  const bgImage = d.backgroundImage ? resolveImage(images, d.backgroundImage) : ''
  return (
    <section className={`py-20 text-center text-white bg-cover bg-center`}
      style={{ background: bgImage ? `linear-gradient(135deg, rgba(27,42,74,0.85), rgba(27,42,74,0.65)), url(${bgImage})` : 'linear-gradient(135deg, #1B2A4A 0%, #2C3E6B 100%)' }}
    >
      <div className="max-w-[700px] mx-auto px-4">
        <h1 className="text-[clamp(1.8rem_3.5vw_2.5rem)] font-bold leading-tight mb-3">{headline}</h1>
        {(d.subheadline || d.subtitle) && <p className="text-base text-white/85 leading-relaxed">{d.subheadline || d.subtitle}</p>}
      </div>
    </section>
  )
}
