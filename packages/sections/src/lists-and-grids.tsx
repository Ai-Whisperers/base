'use client'

import React from 'react'
import { SectionComponentProps } from './types'
import { resolveImage } from './resolve-content'

export function TeamSection({ pageContent, data, images }: SectionComponentProps) {
  const d = data || pageContent || {}
  const members = d.members || d.items || []
  if (!members.length) return null
  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[900px] mx-auto text-center px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8">{d.title}</h2>}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8">
          {members.map((m: any, i: number) => {
            const img = resolveImage(images, m.memberImage || m.image || m.imageUrl)
            return (
              <div key={i} className="p-6 bg-white rounded-2xl shadow-card">
                {img && <img src={img} alt={m.name} className="w-20 h-20 object-cover rounded-full mx-auto mb-4 block" />}
                <h4 className="font-bold text-primary mb-1">{m.name || m.role}</h4>
                {m.role && m.name && <p className="text-accent text-xs font-semibold mb-2">{m.role}</p>}
                {m.description && <p className="text-text-muted text-sm leading-relaxed">{m.description}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function GlossarySection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  if (!items.length) return null
  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[800px] mx-auto px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8 text-center">{d.title}</h2>}
        <div className="flex flex-col gap-3">
          {items.map((item: any, i: number) => (
            <div key={i} className="p-4 bg-white rounded-lg border border-border">
              <h4 className="font-bold text-primary mb-1 text-base">{item.term || item.q || item.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed">{item.definition || item.a || item.description || item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ComparisonSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  const columns = d.columns
  if (!items.length && !columns) return null
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto text-center px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-6">{d.title}</h2>}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-primary text-white">
                {columns?.map((col: string, i: number) => <th key={i} className="p-3 text-left font-bold">{col}</th>)}
                {!columns && items[0] && Object.keys(items[0]).map((k, i) => <th key={i} className="p-3 text-left font-bold">{k}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((row: any, i: number) => (
                <tr key={i} className={`border-b border-border ${i % 2 ? 'bg-surface-alt' : 'bg-white'}`}>
                  {columns ? columns.map((col: string, j: number) => <td key={j} className="p-3 text-text">{row[col] || row[j] || ''}</td>)
                    : Object.values(row).map((v: any, j: number) => <td key={j} className="p-3 text-text">{v}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export function GuidesSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  if (!d.title && !items.length) return null
  return (
    <section className="py-24">
      <div className="max-w-[800px] mx-auto text-center px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-2">{d.title}</h2>}
        {d.subtitle && <p className="text-text-muted mb-8">{d.subtitle}</p>}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {items.map((item: any, i: number) => (
            <div key={i} className="p-6 bg-surface-alt rounded-lg border border-border">
              <h4 className="font-bold text-primary mb-2">{item.title}</h4>
              {item.description && <p className="text-text-muted text-sm leading-relaxed mb-4">{item.description}</p>}
              {item.fileUrl ? <a href={item.fileUrl} className="inline-block px-5 py-2 bg-primary text-white rounded-full text-xs font-bold no-underline">↓ {item.ctaText || "Descargar"}</a>
                : <span className="text-xs text-text-muted italic">Próximamente</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PressReleasesListSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || d.pressReleases || []
  if (!items.length) return null
  return (
    <section className="py-24">
      <div className="max-w-[800px] mx-auto px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-2 text-center">{d.title}</h2>}
        {d.subtitle && <p className="text-text-muted text-center mb-8">{d.subtitle}</p>}
        {items.map((item: any, i: number) => (
          <article key={i} className="p-6 mb-4 bg-white rounded-lg border border-border" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            {item.date && <span className="text-xs text-accent font-semibold block mb-1">{item.date}</span>}
            <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
            {item.summary && <p className="text-text-muted text-sm leading-relaxed mb-3">{item.summary}</p>}
            {item.link && <a href={item.link} className="text-accent font-bold text-xs no-underline border-b-2 border-accent">{item.ctaText || 'Leer más →'}</a>}
          </article>
        ))}
      </div>
    </section>
  )
}

export function BlogSection({ pageContent, data, images, locale: _locale }: SectionComponentProps) {
  const d = data || pageContent || {}
  const posts = d.posts || []
  const locale = _locale || 'nl'
  if (!posts.length) return null
  return (
    <section className="py-24">
      <div className="max-w-[900px] mx-auto px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8 text-center">{d.title}</h2>}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
          {posts.map((post: any, i: number) => {
            const postImg = post.image ? resolveImage(images, `@img:blog.${post.image}`) : (post.coverImage || '')
            return (
              <article key={i} className="border border-border rounded-2xl overflow-hidden bg-white">
                {postImg && <img src={postImg} alt={post.title} className="w-full h-[180px] object-cover" />}
                <div className="p-5">
                  {post.date && <span className="text-xs text-accent font-semibold">{post.date}</span>}
                  <h3 className="text-base font-bold text-primary my-2">{post.title}</h3>
                  {post.excerpt && <p className="text-text-muted text-sm leading-relaxed mb-3">{post.excerpt}</p>}
                  {post.slug && <a href={`/${locale}/blog/${post.slug}`} className="text-accent font-bold text-xs no-underline border-b-2 border-accent">Leer más →</a>}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
