import { createHash } from "crypto"
import { registerGateway } from "./factory"
import type { PaymentRequest, PaymentResult, PagoparConfig } from "./types"

const PAGOPAR_API_BASE = "https://api.pagopar.com/api"

function generateToken(publicKey: string, privateKey: string): string {
  return createHash("md5").update(publicKey + privateKey).digest("hex")
}

function getConfig(): PagoparConfig {
  return {
    publicKey: process.env.PAGOPAR_PUBLIC_KEY || "",
    privateKey: process.env.PAGOPAR_PRIVATE_KEY || "",
    sandbox: process.env.PAGOPAR_SANDBOX === "true",
  }
}

export async function pagoparCreateOrder(config: PagoparConfig, request: PaymentRequest): Promise<PaymentResult> {
  const token = generateToken(config.publicKey, config.privateKey)

  const params = new URLSearchParams()
  params.append("token", token)
  params.append("public_key", config.publicKey)
  params.append("pedido_numero", String(request.order.id))
  params.append("monto_total", String(request.total))
  params.append("moneda", "PYG")
  params.append("descripcion", request.description || `Order ${request.order.id}`)
  params.append("comprador_nombre", request.customer?.name || "")
  params.append("comprador_email", request.customer?.email || "")

  if (request.items && Array.isArray(request.items) && request.items.length > 0) {
    params.append("items", JSON.stringify(request.items))
  }

  let response: Response
  try {
    response = await fetch(`${PAGOPAR_API_BASE}/pedido/crear/`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    })
  } catch (err) {
    return { ok: false, sandbox: config.sandbox, error: err }
  }

  const data = await response.json()

  if (data.status === "success" || data.resultado === "exitoso") {
    return {
      ok: true,
      sandbox: config.sandbox,
      processId: data.pedido_numero || data.process_id,
      redirectUrl: data.url_pago,
    }
  }

  return { ok: false, sandbox: config.sandbox, error: data }
}

registerGateway({
  name: "pagopar",
  processPayment: async (req) => pagoparCreateOrder(getConfig(), req),
})
