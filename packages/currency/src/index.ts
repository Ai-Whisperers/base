export function formatPYG(amount: number): string {
  return `Gs. ${Math.round(amount).toLocaleString('es-PY')}`
}

export function formatPrice(price: number, currency: 'PYG' | 'USD' = 'PYG'): string {
  if (currency === 'USD') return `USD ${price.toFixed(2)}`
  return formatPYG(price)
}

export function parseLocalNumber(str: string): number {
  return Number(str.replace(/[^0-9,.-]/g, '').replace(/\./g, '').replace(',', '.'))
}

export function parsePYG(formatted: string): number {
  return Number(formatted.replace(/[^0-9]/g, ''))
}

export function formatPYGCompact(amount: number): string {
  const abs = Math.abs(Math.round(amount))
  if (abs >= 1_000_000) {
    const val = (amount / 1_000_000).toFixed(1).replace('.', ',')
    return `Gs. ${val}M`
  }
  if (abs >= 1_000) {
    return `Gs. ${Math.round(amount / 1_000)}K`
  }
  return formatPYG(amount)
}
