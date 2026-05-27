import { describe, it, expect } from "vitest"
import { pickOne } from "../scoped"

describe("pickOne", () => {
  it("returns first item from array", () => {
    expect(pickOne({ data: [{ id: 1 }, { id: 2 }], error: null })).toEqual({ id: 1 })
  })

  it("returns null for empty array", () => {
    expect(pickOne({ data: [], error: null })).toBeNull()
  })

  it("returns null for null data", () => {
    expect(pickOne({ data: null, error: null })).toBeNull()
  })

  it("throws on error", () => {
    expect(() => pickOne({ data: null, error: new Error("fail") })).toThrow("fail")
  })
})
