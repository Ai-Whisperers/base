interface CartItem {
  name: string
  price: number
  quantity: number
  variant?: string
}

export function orderConfirmation(orderId: string, items: CartItem[], total: number): string {
  const lines: string[] = [
    '✅ *PEDIDO CONFIRMADO*',
    '',
    `Pedido: #${orderId.slice(0, 8)}`,
    '',
    '*📦 Productos:*',
  ]

  items.forEach((item, i) => {
    const variant = item.variant ? ` (${item.variant})` : ''
    lines.push(`${i + 1}. ${item.name}${variant} — ${item.quantity} × Gs. ${item.price.toLocaleString('es-PY')}`)
  })

  lines.push(
    '',
    '─'.repeat(25),
    `*💰 Total: Gs. ${total.toLocaleString('es-PY')}*`,
    '─'.repeat(25),
    '',
    'Gracias por tu compra. Te contactaremos para coordinar la entrega.',
  )

  return lines.join('\n')
}

export function abandonedCart(items: CartItem[], total: number, link: string): string {
  const lines: string[] = [
    '🛒 *¡Te quedaron productos en tu carrito!*',
    '',
    'Los siguientes artículos todavía están esperando:',
    '',
  ]

  items.forEach((item) => {
    const variant = item.variant ? ` (${item.variant})` : ''
    lines.push(`• ${item.name}${variant} — ${item.quantity} un.`)
  })

  lines.push(
    '',
    `💰 *Total: Gs. ${total.toLocaleString('es-PY')}*`,
    '',
    'Completá tu pedido acá:',
    link,
    '',
    '¿Necesitás ayuda? Respondé este mensaje.',
  )

  return lines.join('\n')
}

export function orderShipped(orderId: string, tracking?: string): string {
  const lines: string[] = [
    '📦 *TU PEDIDO FUE ENVIADO*',
    '',
    `Pedido: #${orderId.slice(0, 8)}`,
    '',
    'Tu pedido ya está en camino.',
  ]

  if (tracking) {
    lines.push('', `📍 *Código de seguimiento:* ${tracking}`)
  }

  lines.push(
    '',
    'Ante cualquier duda, respondé este mensaje.',
  )

  return lines.join('\n')
}

export function welcomeMessage(name: string): string {
  const lines: string[] = [
    `👋 ¡Hola ${name}!`,
    '',
    'Gracias por contactarnos. Estamos para ayudarte con lo que necesites.',
    '',
    'Podés consultar por:',
    '• Productos y precios',
    '• Disponibilidad de stock',
    '• Pedidos y entregas',
    '',
    'Decinos cómo podemos ayudarte 😊',
  ]

  return lines.join('\n')
}

export function lowStockAlert(productName: string, stock: number): string {
  const lines: string[] = [
    '⚠️ *ALERTA DE STOCK BAJO*',
    '',
    `Producto: ${productName}`,
    `Stock actual: ${stock} unidades`,
    '',
    'Considerá reponer antes de que se agote.',
  ]

  return lines.join('\n')
}
