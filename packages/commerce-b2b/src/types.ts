export type B2BTier = 'bronze' | 'silver' | 'gold' | 'platinum'

export interface B2BCustomer {
  id: string
  businessName: string
  ruc: string
  email: string
  phone: string
  tier: B2BTier
  creditLimit: number
  paymentTerms: string
  status: 'active' | 'suspended' | 'pending'
}

export interface B2BPrice {
  productId: string
  tier: B2BTier
  unitPrice: number
  minQuantity?: number
}

export interface B2BOrderItem {
  productId: string
  quantity: number
  unitPrice: number
  tier: B2BTier
  ivaType: '10' | '5' | 'exenta'
}

export interface B2BOrderTotal {
  subtotal: number
  discount: number
  iva10: number
  iva5: number
  total: number
}
