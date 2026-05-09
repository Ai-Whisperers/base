'use client'

import React, { useState } from 'react'

const DEFAULT_PROGRAMS = [
  { id: 'base', title: 'Residencia Permanente', subtitle: 'Base', duration: '10-12 semanas', popular: false },
  { id: 'business', title: 'Residencia + Empresa + Banco', subtitle: 'Business', duration: '12-16 semanas', popular: true },
  { id: 'investor', title: 'Residencia para Inversores', subtitle: 'Inversor', duration: '12-16 semanas', popular: false },
  { id: 'land', title: 'Compra de Tierras', subtitle: 'Terrenos', duration: '4-6 semanas', popular: false },
]

const DEFAULT_STEP_LABELS = ['Programa', 'Datos', 'Confirmar']

export function BookingFormSection({ data, locale }: any) {
  const d = data || {}
  const lang = locale || 'es'

  const rawPrograms: any[] = d.programs || DEFAULT_PROGRAMS
  const programs = rawPrograms.map((p: any) => ({
    id: p.id,
    title: typeof p.title === 'object' ? (p.title[lang] || p.title.es || p.title) : (p.title || ''),
    subtitle: typeof p.subtitle === 'object' ? (p.subtitle[lang] || p.subtitle.es || p.subtitle) : (p.subtitle || ''),
    duration: typeof p.duration === 'object' ? (p.duration[lang] || p.duration.es || p.duration) : (p.duration || ''),
    popular: p.popular || false,
  }))

  const stepLabels = d.stepLabels
    ? [d.stepLabels[0] || '1', d.stepLabels[1] || '2', d.stepLabels[2] || '3']
    : DEFAULT_STEP_LABELS

  const [step, setStep] = useState(0)
  const [selectedProgram, setSelectedProgram] = useState(programs.find((p: any) => p.popular)?.id || programs[0]?.id || '')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  const t = (key: string) => d[key] || ''

  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[700px] mx-auto px-4">
        {d.title && <h2 className="text-2xl font-bold text-primary mb-2 text-center">{d.title}</h2>}
        {d.description && <p className="text-text-muted text-center mb-8">{d.description}</p>}

        {/* Step indicator */}
        <div className="flex justify-center mb-8 gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className={`w-3 h-3 rounded-full ${step === i ? 'bg-accent' : step > i ? 'bg-primary' : 'bg-border'}`} />
          ))}
        </div>

        {/* Step 0: Program selection */}
        {step === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programs.map((p: any) => (
              <button key={p.id} onClick={() => { setSelectedProgram(p.id); setStep(1) }}
                className={`p-5 rounded-xl border-2 text-left cursor-pointer transition-all ${selectedProgram === p.id ? 'border-accent bg-white' : 'border-border bg-white hover:border-accent/50'}`}>
                {p.popular && <span className="text-xs font-bold text-accent uppercase mb-1 block">Más popular</span>}
                <h3 className="font-bold text-primary">{p.title}</h3>
                <p className="text-sm text-text-muted">{p.subtitle} · {p.duration}</p>
              </button>
            ))}
          </div>
        )}

        {/* Step 1: Form */}
        {step === 1 && (
          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <div className="space-y-4">
              <input type="text" placeholder={t('namePlaceholder') || 'Nombre completo'} value={form.name} onChange={update('name')}
                className="w-full p-4 border border-border rounded-lg text-sm outline-none" />
              <input type="email" placeholder={t('emailPlaceholder') || 'Email'} value={form.email} onChange={update('email')}
                className="w-full p-4 border border-border rounded-lg text-sm outline-none" />
              <input type="tel" placeholder={t('phonePlaceholder') || 'WhatsApp / Teléfono'} value={form.phone} onChange={update('phone')}
                className="w-full p-4 border border-border rounded-lg text-sm outline-none" />
              <textarea placeholder={t('messagePlaceholder') || 'Comentarios adicionales (opcional)'} value={form.message} onChange={update('message')} rows={3}
                className="w-full p-4 border border-border rounded-lg text-sm outline-none resize-none" />
              <button onClick={() => setStep(2)} disabled={!form.name || !form.email || !form.phone}
                className="w-full py-3 bg-accent text-primary rounded-full font-bold text-sm cursor-pointer hover:opacity-90 disabled:opacity-50">
                {t('nextButton') || 'Continuar'}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Confirm */}
        {step === 2 && (
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-primary mb-2">{t('confirmTitle') || 'Casi listo'}</h3>
            <p className="text-text-muted text-sm mb-6">
              {t('confirmDescription') || 'Te vamos a contactar por WhatsApp para coordinar los detalles de tu consulta.'}
            </p>
            <div className="space-y-3 mb-6 text-left text-sm bg-surface-alt p-4 rounded-lg">
              <p><strong>Programa:</strong> {programs.find((p: any) => p.id === selectedProgram)?.title}</p>
              <p><strong>Nombre:</strong> {form.name}</p>
              <p><strong>Email:</strong> {form.email}</p>
              <p><strong>Teléfono:</strong> {form.phone}</p>
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setStep(1)} className="px-6 py-3 border border-border rounded-full text-sm cursor-pointer hover:bg-surface-alt">
                {t('backButton') || 'Editar'}
              </button>
              <a href={`https://wa.me/595982515138?text=${encodeURIComponent(`Hola! Quiero info sobre ${programs.find((p: any) => p.id === selectedProgram)?.title || ''}. Soy ${form.name}, email: ${form.email}, tel: ${form.phone}.${form.message ? ' ' + form.message : ''}`)}`}
                target="_blank"
                className="px-6 py-3 bg-accent text-primary rounded-full font-bold text-sm no-underline inline-block hover:opacity-90"
                style={{ background: '#25D366', color: 'white' }}>
                {t('confirmButton') || 'Enviar por WhatsApp'}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
