import type { PaymentRequest, PaymentResult, PaymentGateway } from "./types"

export type { PaymentRequest, PaymentResult, PaymentGateway }

const registry = new Map<string, PaymentGateway>()

export function registerGateway(adapter: PaymentGateway) {
  registry.set(adapter.name, adapter)
}

export function getGateway(name: string): PaymentGateway | undefined {
  return registry.get(name)
}

export function getRegisteredGateways(): string[] {
  return Array.from(registry.keys())
}

export function processPayment(name: string, req: PaymentRequest): Promise<PaymentResult> {
  const gateway = registry.get(name)
  if (!gateway) {
    return Promise.resolve({ ok: false, error: `Unknown gateway: ${name}` })
  }
  return gateway.processPayment(req)
}
