export interface PaymentRequest {
  order: { id: string; [key: string]: unknown }
  total: number
  items?: unknown[]
  customer?: { email?: string; name?: string; [key: string]: unknown }
  description?: string
  [key: string]: unknown
}

export interface PaymentResult {
  ok: boolean
  sandbox?: boolean
  redirectUrl?: string
  url?: string
  processId?: string
  error?: unknown
}

export interface PaymentGateway {
  name: string
  processPayment: (req: PaymentRequest) => Promise<PaymentResult>
  confirmPayment?: (processId: string) => Promise<PaymentResult>
}

export interface BancardConfig {
  publicKey: string
  privateKey: string
  sandbox: boolean
}

export interface PagoparConfig {
  publicKey: string
  privateKey: string
  sandbox: boolean
}
