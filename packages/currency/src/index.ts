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
