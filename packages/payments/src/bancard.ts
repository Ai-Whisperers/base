import { createHash } from "crypto"
import { registerGateway } from "./factory"
import type { PaymentRequest, PaymentResult, BancardConfig } from "./types"

const BANCARD_API_BASE = "https://vpos.infonet.com.py:8888/vpos/api/0.3"

function generateToken(privateKey: string, processId: string, publicKey: string): string {
  return createHash("md5").update(privateKey + processId + publicKey).digest("hex")
}

function getConfig(): BancardConfig {
  return {
    publicKey: process.env.BANCARD_PUBLIC_KEY || "",
    privateKey: process.env.BANCARD_PRIVATE_KEY || "",
    sandbox: process.env.BANCARD_SANDBOX === "true",
  }
}

export async function bancardSingleBuy(config: BancardConfig, request: PaymentRequest): Promise<PaymentResult> {
  const token = generateToken(config.privateKey, "0", config.publicKey)

  const body = {
    public_key: config.publicKey,
    operation: {
      token,
      new_card: false,
      number: `OC-${request.order.id}`,
      amount: request.total,
      currency: "PYG",
      description: request.description || `Order ${request.order.id}`,
      additional_data: "",
      items: request.items || [],
      preauthorization: false,
      send_bill: false,
      bill_additional_data: "",
      trx_type: "3",
      shop_process_id: request.order.id,
    },
  }

  let response: Response
  try {
    response = await fetch(`${BANCARD_API_BASE}/single_buy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch (err) {
    return { ok: false, sandbox: config.sandbox, error: err }
  }

  const data = await response.json()

  if (data.status === "success") {
    return {
      ok: true,
      sandbox: config.sandbox,
      processId: data.process_id,
      redirectUrl: data.process_id
        ? `${BANCARD_API_BASE}/single_buy?process_id=${data.process_id}`
        : undefined,
    }
  }

  return { ok: false, sandbox: config.sandbox, error: data }
}

export async function bancardSingleBuyConfirm(config: BancardConfig, processId: string): Promise<PaymentResult> {
  const token = generateToken(config.privateKey, processId, config.publicKey)

  const body = {
    public_key: config.publicKey,
    operation: {
      token,
      process_id: processId,
    },
  }

  let response: Response
  try {
    response = await fetch(`${BANCARD_API_BASE}/single_buy/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch (err) {
    return { ok: false, sandbox: config.sandbox, error: err }
  }

  const data = await response.json()

  if (data.status === "success") {
    return { ok: true, sandbox: config.sandbox, processId }
  }

  return { ok: false, sandbox: config.sandbox, error: data }
}

registerGateway({
  name: "bancard",
  processPayment: async (req) => bancardSingleBuy(getConfig(), req),
  confirmPayment: async (processId) => bancardSingleBuyConfirm(getConfig(), processId),
})
