export interface CartItem {
  category?: string
  id: string
  productId: string
  name: string
  price: number
  priceGs?: number
  priceBefore?: number
  quantity: number
  image?: string
  variant?: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  images: string[]
  category: string
  inStock: boolean
  variants?: ProductVariant[]
}

export interface ProductVariant {
  id: string
  name: string
  price?: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  shippingAddress?: Address
}

export interface Address {
  street: string
  city: string
  state: string
  zip?: string
  country: string
  notes?: string
}

export interface CheckoutStep {
  id: string
  label: string
  completed: boolean
}

export type CurrencyCode = 'PYG' | 'USD'
