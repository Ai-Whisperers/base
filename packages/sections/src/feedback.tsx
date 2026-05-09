'use client'

import React, { useState } from 'react'
import { SectionComponentProps } from './types'

export function FeedbackSection({ data, locale }: SectionComponentProps) {
  const d = data || {}
  const lang = locale || 'es'

  const tr = (key: string): string => {
    const texts: any = {
      es: { eyebrow: 'TU OPINIÓN', title: 'Compartí tu experiencia', namePlaceholder: 'Tu nombre (opcional)', messagePlaceholder: 'Escribí tu comentario o pregunta...', button: 'Enviar', thanks: '¡Gracias por tu mensaje!', recent: 'Comentarios recientes' },
      en: { eyebrow: 'YOUR FEEDBACK', title: 'Share your experience', namePlaceholder: 'Your name (optional)', messagePlaceholder: 'Write your comment or question...', button: 'Submit', thanks: 'Thanks for your message!', recent: 'Recent comments' },
      nl: { eyebrow: 'UW FEEDBACK', title: 'Deel uw ervaring', namePlaceholder: 'Uw naam (optioneel)', messagePlaceholder: 'Schrijf uw opmerking of vraag...', button: 'Verzenden', thanks: 'Bedankt voor uw bericht!', recent: 'Recente reacties' },
      de: { eyebrow: 'IHR FEEDBACK', title: 'Teilen Sie Ihre Erfahrung', namePlaceholder: 'Ihr Name (optional)', messagePlaceholder: 'Schreiben Sie Ihren Kommentar oder Ihre Frage...', button: 'Senden', thanks: 'Danke für Ihre Nachricht!', recent: 'Aktuelle Kommentare' },
    }
    return (d[key] || (texts as any)[lang]?.[key] || (texts as any).es[key] || '') as string
  }

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, locale: lang, source: 'feedback-section' }),
      })
      setSent(true)
    } catch { setSent(true) }
  }

  if (sent) return (
    <section className="py-16 text-center">
      <div className="max-w-[500px] mx-auto px-4">
        <div className="text-4xl mb-4">✓</div>
        <p className="text-lg font-bold text-primary mb-2">{tr('thanks')}</p>
      </div>
    </section>
  )

  return (
    <section className="py-16 bg-surface-alt">
      <div className="max-w-[600px] mx-auto px-4">
        <p className="text-xs text-text-muted uppercase tracking-[2px] mb-2 text-center">{tr('eyebrow')}</p>
        <h2 className="text-2xl font-bold text-primary mb-8 text-center">{tr('title')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder={tr('namePlaceholder')} value={name} onChange={e => setName(e.target.value)}
            className="w-full p-4 border border-border rounded-lg text-sm outline-none bg-white" />
          <textarea placeholder={tr('messagePlaceholder')} value={message} onChange={e => setMessage(e.target.value)} rows={4} required
            className="w-full p-4 border border-border rounded-lg text-sm outline-none bg-white resize-none" />
          <button type="submit" className="w-full py-3 bg-accent text-primary rounded-full font-bold text-sm cursor-pointer hover:opacity-90 disabled:opacity-50" disabled={!message.trim()}>
            {tr('button')}
          </button>
        </form>
      </div>
    </section>
  )
}
