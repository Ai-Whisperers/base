import { describe, it, expect } from "vitest"
import { VERTICALS, lookupBusinessType } from "../index"

describe("business-registry", () => {
  it("has more than 20 verticals", () => {
    expect(VERTICALS.length).toBeGreaterThan(20)
  })

  it("finds known vertical by sub-vertical id", () => {
    const result = lookupBusinessType("restaurante")
    expect(result).toBeDefined()
  })

  it("returns undefined for unknown type", () => {
    expect(lookupBusinessType("zzz-nonexistent-zzz")).toBeUndefined()
  })
})
