'use client'

import React from 'react'
import { SectionComponentProps } from './types'

export function FaqSection({ pageContent, data, locale }: SectionComponentProps) {
  const d = data || pageContent || {}
  const allItems = d.items || []
  if (!allItems.length) return null
  const [open, setOpen] = React.useState<number | null>(null)
  const [search, setSearch] = React.useState('')
  const items = search
    ? allItems.filter((item: any) => {
        const q = (item.q || item.pregunta || item.question || item.title || '').toLowerCase()
        const a = (item.a || item.respuesta || item.answer || item.description || item.body || '').toLowerCase()
        return q.includes(search.toLowerCase()) || a.includes(search.toLowerCase())
      })
    : allItems
  const lang = locale || 'es'
  const t: Record<string, Record<string, string>> = {
    placeholder: { es: 'Buscar preguntas...', en: 'Search questions...', nl: 'Vragen zoeken...', de: 'Fragen suchen...' },
    empty: { es: 'No se encontraron preguntas.', en: 'No questions found.', nl: 'Geen vragen gevonden.', de: 'Keine Fragen gefunden.' },
    clear: { es: 'Limpiar búsqueda', en: 'Clear search', nl: 'Zoekopdracht wissen', de: 'Suche löschen' },
    count: { es: '{n} de {total} preguntas', en: '{n} of {total} questions', nl: '{n} van {total} vragen', de: '{n} von {total} Fragen' },
  }
  const tr = (key: string) => d[key] || t[key]?.[lang] || t[key]?.es || ''
  const searchable = d.searchable !== false

  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[800px] mx-auto px-4">
        {d.eyebrow && <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2 text-center">{d.eyebrow}</p>}
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8 text-center">{d.title}</h2>}
        {searchable && (
          <div className="mb-6 relative">
            <input type="text" placeholder={tr('searchPlaceholder')} value={search} onChange={e => setSearch(e.target.value)}
              className="w-full py-3 pl-10 pr-4 border border-border rounded-full text-sm outline-none bg-white" />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
          </div>
        )}
        {searchable && search && <p className="text-xs text-text-muted mb-4 text-center">{tr('countText').replace('{n}', String(items.length)).replace('{total}', String(allItems.length))}</p>}
        {items.map((item: any, i: number) => {
          const isOpen = open === i
          const question = item.q || item.pregunta || item.question || item.title
          const answer = item.a || item.respuesta || item.answer || item.description || item.body
          if (!question || !answer) return null
          return (
            <div key={i} className={`mb-3 rounded-lg overflow-hidden bg-white transition-colors ${isOpen ? 'border border-accent' : 'border border-border'}`}>
              <button onClick={() => setOpen(isOpen ? null : i)}
                className={`w-full px-5 py-4 border-none cursor-pointer flex justify-between items-center font-bold text-primary text-sm text-left transition-colors ${isOpen ? 'bg-[#faf8f5]' : 'bg-none'}`}>
                <span>{question}</span>
                <span className={`text-accent text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {isOpen && <div className="px-5 pb-5 text-text text-sm leading-relaxed border-t border-border">{answer}</div>}
            </div>
          )
        })}
        {search && items.length === 0 && <p className="text-center text-text-muted text-sm">{tr('emptyText')} <button onClick={() => setSearch('')} className="bg-none border-none text-accent cursor-pointer font-bold underline">{tr('clearText')}</button></p>}
      </div>
    </section>
  )
}

export function FaqSearchSection(props: SectionComponentProps) {
  return <FaqSection {...props} data={{ ...(props.data || props.pageContent || {}), searchable: true }} />
}

export function PrivacyAccordion({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const items = d.items || []
  if (!items.length) return null
  const [open, setOpen] = React.useState<number | null>(null)
  return (
    <section className="py-24">
      <div className="max-w-[800px] mx-auto px-4">
        {d.title && <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-8">{d.title}</h2>}
        {items.map((item: any, i: number) => {
          const isOpen = open === i
          const title = item.q || item.title || item.pregunta
          const body = item.a || item.body || item.description
          if (!title || !body) return null
          return (
            <div key={i} className="mb-3 border border-border rounded-lg overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : i)}
                className={`w-full px-5 py-4 border-none cursor-pointer flex justify-between items-center font-bold text-sm text-left transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-surface-alt text-primary'}`}>
                <span>{title}</span>
                <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {isOpen && <div className="p-5 text-text text-sm leading-relaxed">{body}</div>}
            </div>
          )
        })}
      </div>
    </section>
  )
}
