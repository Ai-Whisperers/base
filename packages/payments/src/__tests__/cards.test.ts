import { describe, it, expect } from "vitest"
import { isValidCardNumber, getCardBrand, maskCardNumber } from "../cards"

describe("isValidCardNumber", () => {
  it("validates a valid visa number", () => {
    expect(isValidCardNumber("4111111111111111")).toBe(true)
  })

  it("validates a valid mastercard number", () => {
    expect(isValidCardNumber("5500000000000004")).toBe(true)
  })

  it("validates a valid amex number", () => {
    expect(isValidCardNumber("378282246310005")).toBe(true)
  })

  it("rejects invalid number", () => {
    expect(isValidCardNumber("4111111111111112")).toBe(false)
  })

  it("rejects too short", () => {
    expect(isValidCardNumber("123456")).toBe(false)
  })

  it("handles spaces and dashes", () => {
    expect(isValidCardNumber("4111-1111-1111-1111")).toBe(true)
  })
})

describe("getCardBrand", () => {
  it("identifies visa", () => {
    expect(getCardBrand("4111111111111111")).toBe("visa")
  })

  it("identifies mastercard", () => {
    expect(getCardBrand("5500000000000004")).toBe("mastercard")
  })

  it("identifies amex", () => {
    expect(getCardBrand("378282246310005")).toBe("amex")
  })

  it("returns unknown for unrecognized", () => {
    expect(getCardBrand("6011000000000000")).toBe("unknown")
  })
})

describe("maskCardNumber", () => {
  it("masks 16-digit card", () => {
    expect(maskCardNumber("4111111111111234")).toBe("**** **** **** 1234")
  })

  it("masks 15-digit amex", () => {
    expect(maskCardNumber("378282246310005")).toBe("**** **** **** 0005")
  })

  it("handles spaced input", () => {
    expect(maskCardNumber("4111 1111 1111 1234")).toBe("**** **** **** 1234")
  })
})
