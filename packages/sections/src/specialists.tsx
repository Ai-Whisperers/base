'use client'

import React from 'react'
import { SectionComponentProps } from './types'

export function IntakeWizardSection({ pageContent, data }: SectionComponentProps) {
  const d = data || pageContent || {}
  const steps = d.steps || []
  const [currentStep, setCurrentStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<string, string>>({})
  const [showResult, setShowResult] = React.useState(false)
  if (!steps.length) return null
  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [steps[currentStep].key]: value }
    setAnswers(newAnswers)
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
    else setShowResult(true)
  }
  const handleRestart = () => { setCurrentStep(0); setAnswers({}); setShowResult(false) }
  if (showResult) {
    const recommended = d.recommendedTier || 'business'
    return (
      <section className="py-24 bg-surface-alt">
        <div className="max-w-[600px] mx-auto text-center px-4">
          <h2 className="text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-4">{d.resultTitle || 'Tu recomendación'}</h2>
          <p className="text-lg font-bold text-primary">{recommended}</p>
          <p className="text-text-muted text-sm mt-4 mb-6">{d.resultDescription || 'Basado en tus respuestas'}</p>
          {(d.ctaText || d.recommendedCta) && <a href={d.ctaHref || `/${d.locale || 'nl'}/contacto`} className="inline-block px-8 py-3 bg-accent text-primary rounded-full font-bold text-base no-underline">{d.ctaText || d.recommendedCta}</a>}
          <p><button onClick={handleRestart} className="mt-6 bg-none border-none text-accent cursor-pointer font-bold underline text-sm">{d.restartLabel || 'Reiniciar'}</button></p>
        </div>
      </section>
    )
  }
  return (
    <section className="py-24 bg-surface-alt">
      <div className="max-w-[600px] mx-auto text-center px-4">
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_: any, i: number) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i <= currentStep ? 'bg-accent' : 'bg-border'}`} />
          ))}
        </div>
        <p className="text-sm text-text-muted mb-6">{d.subtitle}</p>
        <h3 className="text-xl font-bold text-primary mb-6">{steps[currentStep].question}</h3>
        <div className="flex flex-col gap-3">
          {(steps[currentStep].options || []).map((opt: string, i: number) => (
            <button key={i} onClick={() => handleSelect(opt)}
              className="w-full p-4 bg-white rounded-lg border border-border cursor-pointer font-semibold text-primary text-sm hover:border-accent transition-colors">
              {opt}
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-text-muted italic">{d.disclaimer || ''}</p>
      </div>
    </section>
  )
}
