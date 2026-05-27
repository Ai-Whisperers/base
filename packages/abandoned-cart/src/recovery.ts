import type { AbandonedCart, RecoveryConfig } from './types.js'

export function shouldSendReminder(cart: AbandonedCart, config: RecoveryConfig): boolean {
  if (cart.recovered) return false
  if (cart.remindersSent >= config.maxReminders) return false

  const now = Date.now()
  const lastReminder = cart.lastReminderAt ? new Date(cart.lastReminderAt).getTime() : new Date(cart.createdAt).getTime()
  const hoursSinceLast = (now - lastReminder) / (1000 * 60 * 60)

  return hoursSinceLast >= config.reminderIntervalHours
}

export function getReminderMessage(cart: AbandonedCart, config: RecoveryConfig, index: number): string {
  const siteUrl = 'https://tiendaelviajero.com.py'
  const itemName = cart.items[0]?.name ?? 'producto'

  if (index === 0) {
    return [
      `👋 *El Viajero* 🏕️`,
      ``,
      `¡Te quedaron productos en tu carrito! 😊`,
      ``,
      `📦 Completá tu pedido acá:`,
      `${siteUrl}/tienda`,
      ``,
      `Si tenés alguna duda, respondé este mensaje.`,
    ].join('\n')
  }

  const isLast = index >= config.maxReminders - 1
  if (isLast && config.discountPercent) {
    return [
      `🎁 *El Viajero* 🏕️`,
      ``,
      `¡No queremos que te pierdas tu pedido! Usá el código *VIAJERO${config.discountPercent}* y obtené ${config.discountPercent}% de descuento hoy.`,
      ``,
      `👉 ${siteUrl}/tienda`,
      ``,
      `Válido por ${config.discountValidHours ?? 24} horas ⏰`,
    ].join('\n')
  }

  return [
    `👋 *El Viajero* 🏕️`,
    ``,
    `¡${itemName} sigue esperándote! 😊`,
    ``,
    `📦 Completá tu pedido acá:`,
    `${siteUrl}/tienda`,
  ].join('\n')
}

export function calculateRecoveryRate(recovered: number, total: number): number {
  if (total === 0) return 0
  return (recovered / total) * 100
}

export function getRecoveryScore(cart: AbandonedCart): number {
  let score = 50

  if (cart.total >= 500000) score += 20
  else if (cart.total >= 200000) score += 10
  else if (cart.total < 50000) score -= 10

  const hoursSinceCreation = (Date.now() - new Date(cart.createdAt).getTime()) / (1000 * 60 * 60)
  if (hoursSinceCreation <= 2) score += 15
  else if (hoursSinceCreation <= 24) score += 5
  else if (hoursSinceCreation > 72) score -= 15

  if (cart.items.length >= 3) score += 10
  else if (cart.items.length === 1) score -= 5

  if (cart.lastReminderAt) score -= 10

  if (cart.customerPhone) score += 10

  return Math.max(0, Math.min(100, score))
}
