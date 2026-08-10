const EVOLUTION_URL = process.env.EVOLUTION_API_URL || 'https://evolution.sunstein.cloud'
const EVOLUTION_API_KEY = process.env.MESSAGING_API_KEY || ''
const EVOLUTION_INSTANCE = process.env.EVOLUTION_INSTANCE || 'hermes-messaging'
const ADMIN_NUMBER = process.env.ADMIN_MESSAGING || '595981234567'

export function cleanPhone(phone: string): string {
  return phone.replace(/[^0-9]/g, '')
}

export function waUrl(phone: string, message?: string): string {
  const clean = cleanPhone(phone)
  if (message) return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`
  return `https://wa.me/${clean}`
}

function cleanNumber(number: string): string {
  return number.replace(/[^0-9]/g, '')
}

export async function sendMessaging(to: string, message: string): Promise<boolean> {
  const number = cleanNumber(to)
  try {
    const res = await fetch(
      `${EVOLUTION_URL}/message/sendText/${EVOLUTION_INSTANCE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': EVOLUTION_API_KEY,
        },
        body: JSON.stringify({
          number,
          text: message,
          delay: 1000,
        }),
      }
    )
    if (!res.ok) {
      const text = await res.text()
      console.error('[Messaging] Send failed:', text.substring(0, 300))
      return false
    }
    return true
  } catch (err) {
    console.error('[Messaging] Error:', err)
    return false
  }
}

export async function sendMedia(to: string, caption: string, mediaUrl: string, mediaType: string = 'image'): Promise<boolean> {
  const number = cleanNumber(to)
  try {
    const res = await fetch(
      `${EVOLUTION_URL}/message/sendMedia/${EVOLUTION_INSTANCE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': EVOLUTION_API_KEY,
        },
        body: JSON.stringify({
          number,
          mediatype: mediaType,
          media: mediaUrl,
          caption,
          delay: 1000,
        }),
      }
    )
    if (!res.ok) {
      const text = await res.text()
      console.error('[Messaging] Send media failed:', text.substring(0, 300))
      return false
    }
    return true
  } catch (err) {
    console.error('[Messaging] Media error:', err)
    return false
  }
}

export async function notifyNewOrder(order: any) {
  const msg = `🆕 *Nuevo pedido* #${order.id?.slice(0, 8)}\nTotal: ${order.total}\nPago: ${order.payment_method || 'messaging'}\n\nVer en el panel:\nhttps://el-viajero.paragu-ai.com/admin/pedidos`
  await sendMessaging(ADMIN_NUMBER, msg)
}

export async function notifyStatusChange(orderId: string, customerPhone: string, newStatus: string) {
  const statusLabels: Record<string, string> = {
    confirmado: '✅ Tu pedido fue confirmado',
    enviado: '🚚 Tu pedido fue enviado',
    entregado: '📦 Tu pedido fue entregado',
    cancelado: '❌ Tu pedido fue cancelado',
  }
  const msg = `👋 *El Viajero*\n\n${statusLabels[newStatus] || '📋 Estado actualizado: ' + newStatus}\nPedido: #${orderId?.slice(0, 8)}\n\nAnte cualquier duda, respondé este mensaje.`
  if (customerPhone && customerPhone.length > 8) {
    await sendMessaging(customerPhone, msg)
  }
}
