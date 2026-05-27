import { describe, it, expect } from "vitest"
import { formatPYG, formatPrice, parseLocalNumber, parsePYG, formatPYGCompact } from "../src/index"

describe("formatPYG", () => {
  it("formats whole number", () => {
    expect(formatPYG(1234567)).toBe("Gs. 1.234.567")
  })

  it("rounds decimals", () => {
    expect(formatPYG(1234.7)).toBe("Gs. 1.235")
  })

  it("formats zero", () => {
    expect(formatPYG(0)).toBe("Gs. 0")
  })
})

describe("formatPrice", () => {
  it("formats PYG by default", () => {
    expect(formatPrice(5000)).toBe("Gs. 5.000")
  })

  it("formats USD", () => {
    expect(formatPrice(10.5, "USD")).toBe("USD 10.50")
  })
})

describe("parseLocalNumber", () => {
  it("parses dot-separated number", () => {
    expect(parseLocalNumber("1.234")).toBe(1234)
  })

  it("parses comma as decimal", () => {
    expect(parseLocalNumber("1,5")).toBe(1.5)
  })
})

describe("parsePYG", () => {
  it("parses formatted PYG string", () => {
    expect(parsePYG("Gs. 1.234.567")).toBe(1234567)
  })

  it("parses small value", () => {
    expect(parsePYG("Gs. 500")).toBe(500)
  })

  it("parses zero", () => {
    expect(parsePYG("Gs. 0")).toBe(0)
  })
})

describe("formatPYGCompact", () => {
  it("formats millions with comma decimal", () => {
    expect(formatPYGCompact(1234567)).toBe("Gs. 1,2M")
  })

  it("formats exact million", () => {
    expect(formatPYGCompact(2000000)).toBe("Gs. 2,0M")
  })

  it("formats thousands", () => {
    expect(formatPYGCompact(450000)).toBe("Gs. 450K")
  })

  it("formats small numbers as full PYG", () => {
    expect(formatPYGCompact(500)).toBe("Gs. 500")
  })

  it("formats 999 without K", () => {
    expect(formatPYGCompact(999)).toBe("Gs. 999")
  })

  it("formats 1000 with K", () => {
    expect(formatPYGCompact(1000)).toBe("Gs. 1K")
  })
})
