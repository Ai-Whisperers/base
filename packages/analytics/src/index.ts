'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window { dataLayer: any[]; gtag: (...args: any[]) => void }
}

type GTagEvent = {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

export function AnalyticsProvider({ gaId }: { gaId?: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!gaId || typeof window === 'undefined') return
    window.dataLayer = window.dataLayer || []
    window.gtag = function() { window.dataLayer.push(arguments) }
    window.gtag('js', new Date())
    window.gtag('config', gaId, { page_path: pathname + (searchParams?.toString() ? '?' + searchParams.toString() : '') })
  }, [gaId, pathname, searchParams])

  return null
}

export function trackEvent({ action, category, label, value, ...rest }: GTagEvent) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', action, { event_category: category, event_label: label, value, ...rest })
}

export function trackViewItem(item: { id: string; name: string; category?: string; price?: number }) {
  trackEvent({ action: 'view_item', category: 'engagement', items: [item] })
}

export function trackAddToCart(item: { id: string; name: string; price: number; quantity?: number }) {
  trackEvent({ action: 'add_to_cart', category: 'ecommerce', currency: 'PYG', items: [item], value: (item.price || 0) * (item.quantity || 1) })
}

export function trackPurchase(order: { id: string; total: number; items: any[]; currency?: string }) {
  trackEvent({ action: 'purchase', category: 'ecommerce', transaction_id: order.id, value: order.total, currency: order.currency || 'PYG', items: order.items })
}
