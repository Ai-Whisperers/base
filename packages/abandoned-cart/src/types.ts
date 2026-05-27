export interface CartItem {
  productId: string
  name: string
  quantity: number
  price: number
  image?: string
}

export interface AbandonedCart {
  id: string
  customerId?: string
  customerPhone?: string
  customerEmail?: string
  items: CartItem[]
  total: number
  createdAt: string
  updatedAt: string
  remindersSent: number
  lastReminderAt?: string
  recovered: boolean
  recoveredAt?: string
  recoveryMethod?: 'whatsapp' | 'email'
}

export interface RecoveryConfig {
  maxReminders: number
  reminderIntervalHours: number
  whatsappEnabled: boolean
  emailEnabled: boolean
  discountPercent?: number
  discountValidHours?: number
}
