"use client"
import { useEffect } from "react"
// validatePromo provided by consumer
const validatePromo = async (code: string, subtotal: number) => ({ ok: false, discount: 0 })

export function PromoFromUrl({ onValidPromo }: { onValidPromo: (code: string) => void }) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("promo")
    if (!code) return
    validatePromo(code, 999999999).then(result => {
      if (result.ok) onValidPromo(code)
    })
  }, [onValidPromo])
  return null
}
