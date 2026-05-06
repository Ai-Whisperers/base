export interface PaymentRequest {
  order: { id: string; [key: string]: unknown }
  total: number
  items?: unknown[]
  customer?: { email?: string; name?: string; [key: string]: unknown }
  [key: string]: unknown
}

export interface GatewayResult {
  ok: boolean
  sandbox?: boolean
  redirectUrl?: string
  url?: string
  error?: unknown
}

export interface GatewayAdapter {
  name: string
  processPayment: (req: PaymentRequest) => Promise<GatewayResult>
}

const registry = new Map<string, GatewayAdapter>()

export function registerGateway(adapter: GatewayAdapter) {
  registry.set(adapter.name, adapter)
}

export function getGateway(name: string): GatewayAdapter | undefined {
  return registry.get(name)
}

export function getRegisteredGateways(): string[] {
  return Array.from(registry.keys())
}

export function processPayment(name: string, req: PaymentRequest): Promise<GatewayResult> {
  const gateway = registry.get(name)
  if (!gateway) {
    return Promise.resolve({ ok: false, error: `Unknown gateway: ${name}` })
  }
  return gateway.processPayment(req)
}
