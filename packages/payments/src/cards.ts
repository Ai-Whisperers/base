export function isValidCardNumber(num: string): boolean {
  const digits = num.replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return false
  let sum = 0
  let alternate = false
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10)
    if (alternate) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
    alternate = !alternate
  }
  return sum % 10 === 0
}

export function getCardBrand(num: string): 'visa' | 'mastercard' | 'amex' | 'unknown' {
  const digits = num.replace(/\D/g, '')
  if (/^4/.test(digits)) return 'visa'
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'mastercard'
  if (/^3[47]/.test(digits)) return 'amex'
  return 'unknown'
}

export function maskCardNumber(num: string): string {
  const digits = num.replace(/\D/g, '')
  const last4 = digits.slice(-4)
  const maskedLen = digits.length - 4
  const groups = Math.ceil(maskedLen / 4)
  const parts: string[] = []
  for (let i = 0; i < groups; i++) {
    parts.push('****')
  }
  parts.push(last4)
  return parts.join(' ')
}
