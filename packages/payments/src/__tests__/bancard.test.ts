import { describe, it, expect, vi, beforeEach } from "vitest"
import { bancardSingleBuy, bancardSingleBuyConfirm } from "../bancard"
import { registerGateway, getGateway, processPayment } from "../factory"
import type { BancardConfig, PaymentRequest } from "../types"

const config: BancardConfig = {
  publicKey: "test-pub-key",
  privateKey: "test-priv-key",
  sandbox: true,
}

const request: PaymentRequest = {
  order: { id: "ORD-001" },
  total: 50000,
  items: [{ descripcion: "Item A", cantidad: 1, precio: 50000 }],
  customer: { name: "Juan Perez", email: "juan@example.com" },
  description: "Test order",
}

function mockFetch(response: unknown) {
  return vi.fn().mockResolvedValue({
    json: async () => response,
  })
}

describe("bancardSingleBuy", () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it("builds correct request on success", async () => {
    const fetch = mockFetch({ status: "success", process_id: "abc123" })
    vi.stubGlobal("fetch", fetch)

    const result = await bancardSingleBuy(config, request)

    expect(result.ok).toBe(true)
    expect(result.processId).toBe("abc123")
    expect(result.redirectUrl).toContain("process_id=abc123")
    expect(result.sandbox).toBe(true)

    const callArgs = fetch.mock.calls[0]
    expect(callArgs[0]).toBe("https://vpos.infonet.com.py:8888/vpos/api/0.3/single_buy")
    expect(callArgs[1].method).toBe("POST")
    expect(callArgs[1].headers["Content-Type"]).toBe("application/json")

    const sentBody = JSON.parse(callArgs[1].body)
    expect(sentBody.public_key).toBe("test-pub-key")
    expect(sentBody.operation.amount).toBe(50000)
    expect(sentBody.operation.currency).toBe("PYG")
    expect(sentBody.operation.number).toBe("OC-ORD-001")
    expect(sentBody.operation.shop_process_id).toBe("ORD-001")
  })

  it("handles API error response", async () => {
    const fetch = mockFetch({ status: "error", message: "Invalid token" })
    vi.stubGlobal("fetch", fetch)

    const result = await bancardSingleBuy(config, request)

    expect(result.ok).toBe(false)
    expect(result.error).toBeDefined()
  })

  it("handles network failure", async () => {
    const fetch = vi.fn().mockRejectedValue(new Error("Network error"))
    vi.stubGlobal("fetch", fetch)

    const result = await bancardSingleBuy(config, request)

    expect(result.ok).toBe(false)
    expect(result.error).toBeInstanceOf(Error)
  })
})

describe("bancardSingleBuyConfirm", () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it("confirms a payment successfully", async () => {
    const fetch = mockFetch({ status: "success", process_id: "abc123" })
    vi.stubGlobal("fetch", fetch)

    const result = await bancardSingleBuyConfirm(config, "abc123")

    expect(result.ok).toBe(true)
    expect(result.processId).toBe("abc123")

    const callArgs = fetch.mock.calls[0]
    expect(callArgs[0]).toBe("https://vpos.infonet.com.py:8888/vpos/api/0.3/single_buy/confirm")
    expect(callArgs[1].method).toBe("POST")
  })

  it("handles confirmation failure", async () => {
    const fetch = mockFetch({ status: "error", message: "Invalid process_id" })
    vi.stubGlobal("fetch", fetch)

    const result = await bancardSingleBuyConfirm(config, "abc123")

    expect(result.ok).toBe(false)
  })
})

describe("factory integration", () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it("bancard registered and dispatchable via factory", async () => {
    const fetch = mockFetch({ status: "success", process_id: "abc123" })
    vi.stubGlobal("fetch", fetch)

    const gateway = getGateway("bancard")
    expect(gateway).toBeDefined()
    expect(gateway!.name).toBe("bancard")

    const result = await processPayment("bancard", request)
    expect(result.ok).toBe(true)
    expect(result.processId).toBe("abc123")
  })

  it("confirmPayment available on bancard gateway", () => {
    const gateway = getGateway("bancard")
    expect(gateway!.confirmPayment).toBeDefined()
    expect(typeof gateway!.confirmPayment).toBe("function")
  })

  it("returns error for unknown gateway", async () => {
    const result = await processPayment("nonexistent", request)
    expect(result.ok).toBe(false)
    expect(result.error).toContain("Unknown gateway")
  })
})
